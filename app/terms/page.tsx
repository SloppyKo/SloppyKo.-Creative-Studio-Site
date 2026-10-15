import type { Metadata } from "next";
import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms that govern your use of sloppyko.com.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <PolicyPage file="SloppyKo_terms_10.15.26.md" />;
}
