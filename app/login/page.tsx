// app/login/page.tsx
import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | StudyMateAI",
  description: "Log in to your StudyMateAI account to continue practicing.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue your personalized study and interview practice."
    >
      <LoginForm />
    </AuthLayout>
  );
}