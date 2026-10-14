import type { MetadataRoute } from "next";

const BASE_URL = "https://www.sloppyko.com";

// Fixed per-page dates: bump a page's lastModified only when its content
// meaningfully changes. Using new Date() would claim every page changed on
// every deploy, which teaches Google and Bing to ignore our lastmod values.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: "2026-10-14",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: "2026-10-14",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: "2026-10-14",
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: "2026-10-14",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
