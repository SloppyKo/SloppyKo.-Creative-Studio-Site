import type { Metadata } from "next";
import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How sloppyko.com uses cookies and similar technologies.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return <PolicyPage file="SloppyKo_cookies_10.15.26.md" />;
}
