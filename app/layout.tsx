import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "SloppyKo. Creative Studio",
  description: "Branding, websites, and application development powered by human creativity",
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
      </body>
    </html>
  );
}
