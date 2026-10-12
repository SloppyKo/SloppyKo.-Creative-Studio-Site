import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import ContactModal from "./components/ContactModal";
import BackToTop from "./components/BackToTop";
import { Analytics } from "@vercel/analytics/next";

const DESCRIPTION =
  "Custom websites, Google profile management, and branding for small businesses in Hanford, San Luis Obispo, and across the Central Valley and Central Coast.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sloppyko.com"),
  title: {
    default: "Web Design in Hanford & San Luis Obispo | SloppyKo",
    template: "%s | SloppyKo",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "SloppyKo",
    title: "Web Design in Hanford & San Luis Obispo | SloppyKo",
    description: DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design in Hanford & San Luis Obispo | SloppyKo",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#11131a] text-[#f4f1ea]">
        <SiteNav />
        {children}
        <SiteFooter />
        <ContactModal />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
