import UserOnboardingLayout from "@/components/Pages/SetProfile/Layout";
import AuthGate from "@/components/Auth/AuthGate";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <UserOnboardingLayout>{children}</UserOnboardingLayout>
    </AuthGate>
  );
}
