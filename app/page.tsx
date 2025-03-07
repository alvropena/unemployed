"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";
import ResumeForm from "@/components/resume-form";
import ResumePreview from "@/components/resume-preview";
import { defaultResumeData } from "@/lib/default-data";
import type { ResumeData } from "@/lib/types";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [hasPaid, setHasPaid] = useState(false);

  // Check if user has paid - this would be replaced with your actual payment verification
  useEffect(() => {
    if (!isSignedIn) return;

    // Mock implementation - replace with your actual API call to check payment status
    const checkPaymentStatus = async () => {
      // Replace this with your actual payment verification logic
      // For example: const response = await fetch('/api/check-payment')
      // setHasPaid(response.data.hasPaid)

      // For now, we'll just mock it
      setHasPaid(true); // Set to false to test the unpaid state
    };

    checkPaymentStatus();
  }, [isSignedIn]);

  // If not loaded yet, show loading
  if (!isLoaded) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }

  // If signed in, show the resume builder
  if (isSignedIn) {
    if (!hasPaid) {
      return (
        <div className="container mx-auto p-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Resume Generator</h1>
          <div className="bg-primary/5 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Subscription Required</h2>
            <p className="mb-6">
              You need to subscribe to access the resume generator.
            </p>
            <Link href="/checkout">
              <Button>Subscribe Now</Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <main className="container mx-auto p-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg shadow p-4 overflow-auto max-h-[calc(100vh-150px)]">
            <h2 className="text-xl font-semibold mb-4">Resume Information</h2>
            <ResumeForm data={resumeData} setData={setResumeData} />
          </div>
          <div className="bg-muted/10 rounded-lg shadow-md p-4 max-h-[calc(100vh-150px)]">            
            <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-md min-h-[800px]">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // If not signed in, show the landing page
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Resume AI Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Create professional resumes in minutes with our AI-powered resume
          generator. Tailored for job seekers who want to stand out from the
          crowd.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Basic resume creation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">$0</div>
            <ul className="space-y-2 mb-6">
              <li>• Basic templates</li>
              <li>• PDF downloads</li>
              <li>• 1 resume</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/sign-up" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-primary">
          <CardHeader className="bg-primary/10">
            <CardTitle>Pro</CardTitle>
            <CardDescription>For serious job seekers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">$9.99</div>
            <ul className="space-y-2 mb-6">
              <li>• Premium templates</li>
              <li>• PDF & DOCX downloads</li>
              <li>• Up to 5 resumes</li>
              <li>• AI suggestions</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              href="/sign-up?redirect=/checkout?plan=pro"
              className="w-full"
            >
              <Button className="w-full" variant="default">
                Sign Up & Upgrade
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For teams and businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">$29.99</div>
            <ul className="space-y-2 mb-6">
              <li>• All Pro features</li>
              <li>• Unlimited resumes</li>
              <li>• Custom branding</li>
              <li>• Team management</li>
              <li>• Priority support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              href="/sign-up?redirect=/checkout?plan=enterprise"
              className="w-full"
            >
              <Button className="w-full" variant="outline">
                Sign Up & Upgrade
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Why Choose Our Resume Builder?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
            <p className="text-muted-foreground">
              Create a professional resume in minutes with our intuitive
              interface.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"></path>
                <path d="M3 7v10a2 2 0 0 0 2 2h4"></path>
                <path d="M12 22v-6"></path>
                <path d="m15 19-3 3-3-3"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Multiple Formats</h3>
            <p className="text-muted-foreground">
              Download your resume in PDF or DOCX format for maximum
              compatibility.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
            <p className="text-muted-foreground">
              Get intelligent suggestions to improve your resume and stand out.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link href="/sign-up">
          <Button size="lg" className="px-8">
            Sign Up & Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
