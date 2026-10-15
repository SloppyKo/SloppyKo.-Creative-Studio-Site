import type { Metadata } from "next";
import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SloppyKo collects, uses, and protects personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PolicyPage file="SloppyKo_privacypolicy_10.15.26.md" />;
}
