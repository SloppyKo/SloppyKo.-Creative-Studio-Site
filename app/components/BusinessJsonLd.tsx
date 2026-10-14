// Structured data so search engines understand SloppyKo as a local service business.
// Invisible to visitors. Rendered once, on the home page.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SloppyKo",
  alternateName: "SloppyKo Creative Studio",
  url: "https://www.sloppyko.com",
  logo: "https://www.sloppyko.com/icon.png",
  image: "https://www.sloppyko.com/icon.png",
  description:
    "Web design, local SEO, social media, and branding for small businesses in Hanford, San Luis Obispo, and across the Central Valley and Central Coast.",
  telephone: "+1-559-589-4790",
  email: "kieran@sloppyko.com",
  // Service-area business: city only, no street address.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hanford",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Hanford, CA" },
    { "@type": "City", name: "San Luis Obispo, CA" },
    { "@type": "Place", name: "Central Valley, CA" },
    { "@type": "Place", name: "Central Coast, CA" },
  ],
  knowsAbout: ["Web Design", "Local SEO", "Google Business Profile Management", "Search Engine Optimization", "Social Media Marketing", "Brand Design"],
  sameAs: [
    "https://www.instagram.com/sloppykocreativestudio/",
    "https://maps.app.goo.gl/AEwd7wtiqLXzVGCn9",
  ],
  founder: {
    "@type": "Person",
    name: "Kieran Apgar",
    sameAs: ["https://www.linkedin.com/in/kieran-apgar-518b59196/"],
  },
};

export default function BusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
