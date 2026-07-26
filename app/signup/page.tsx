// app/signup/page.tsx
import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up | StudyMateAI",
  description: "Create your StudyMateAI account and start practicing smarter.",
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start generating personalized questions and AI-powered feedback in minutes."
    >
      <SignupForm />
    </AuthLayout>
  );
}