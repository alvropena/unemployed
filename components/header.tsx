"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Download } from "lucide-react";
import { exportResumeToPDF } from "@/lib/pdf-export";
import { useState } from "react";

export function Header() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      exportResumeToPDF();
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Only enable scrolling on the home page
  const isHomePage = pathname === "/";

  const scrollToSection = (
    e: React.MouseEvent<HTMLElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    // Only scroll if we're on the home page
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Unemployed
        </Link>

        {!isSignedIn && (
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "features")}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "pricing")}
            >
              Pricing
            </Link>
            <Link
              href="/#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "testimonials")}
            >
              Testimonials
            </Link>
            <Link
              href="/#faq"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "faq")}
            >
              FAQ
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          <Button
            variant="default"
            className="flex items-center justify-center gap-2 w-full md:w-auto"
            onClick={handleExportPDF}
            disabled={isExporting}
            size="sm"
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Download PDF"}
          </Button>
          <ThemeSwitcher />
          {isSignedIn ? (
            <>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline">Log in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="default" size="sm">
                  Sign up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
