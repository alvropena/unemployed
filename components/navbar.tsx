"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { usePDF } from "@/hooks/use-pdf";
import { useState } from "react";
import { toast } from "sonner";

export function Navbar() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const { downloadPDF, isDownloading } = usePDF();

  // Only enable scrolling on the home page
  const isHomePage = pathname === "/";

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
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

  const handleDownload = async () => {
    const resumeElement = document.getElementById('resume-preview');
    if (!resumeElement) {
      toast.error("Could not find resume element");
      return;
    }

    try {
      await downloadPDF(resumeElement);
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download PDF");
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Resume AI
        </Link>

        {!isSignedIn && (
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "features")}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "pricing")}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "testimonials")}
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "faq")}
            >
              FAQ
            </a>
          </nav>
        )}

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          {isSignedIn ? (
            <>
              <Button onClick={handleDownload} disabled={isDownloading}>
                <Download className={`mr-2 h-4 w-4 ${isDownloading ? 'animate-spin' : ''}`} />
                {isDownloading ? 'Downloading...' : 'Download PDF'}
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" >Log in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="default" size="sm">Sign up</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
