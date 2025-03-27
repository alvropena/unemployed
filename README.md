# Unemployed

A professional resume builder application with AI-powered suggestions, authentication, and subscription plans.

## Features

- **Landing Page**: Showcase features and pricing plans
- **Authentication**: Secure user authentication with Clerk
- **Resume Builder**: Create and edit professional resumes
- **PDF Export**: Download resumes as PDF
- **Subscription Plans**: Free, Pro, and Enterprise plans with Stripe integration
- **Dashboard**: Manage your resumes and subscription

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **Payments**: Stripe
- **PDF Generation**: html2pdf.js

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Clerk account for authentication
- Stripe account for payments

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alvropena/unemployed.git
   cd unemployed
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update the `.env.local` file with your Clerk and Stripe credentials.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `CLERK_SECRET_KEY`: Your Clerk secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `NEXT_PUBLIC_APP_URL`: Your application URL (default: http://localhost:3000)

## Project Structure

- `/app`: Next.js app router pages and API routes
- `/components`: Reusable React components
- `/lib`: Utility functions and types
- `/public`: Static assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.