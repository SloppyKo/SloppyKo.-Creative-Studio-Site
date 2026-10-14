"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

// Expandable list of services (opens on hover, or tap on phones). Styled for a cream background.
export default function ServicesList() {
  const [servicesRef, servicesVisible] = useScrollReveal(0.1);
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);

  return (
    <div ref={servicesRef} className="space-y-8">
      {[
        {
          title: "Websites",
          text: "We start by understanding your customers and business model. Then we hand design and develop your site from scratch.",
          includes: [
            ["Domain & hosting", "set up, hosted, and managed by us"],
            ["Mobile-ready design", "built for phones and desktops"],
            ["SEO setup", "so your site shows up in local searches"],
            ["Maintenance", "we keep it running and fix what breaks"],
            ["Management", "we update and enhance your site as needed"],
          ],
          outro: "Squarespace and Wix hand you a template and leave the work to you. We do it all at a competitive price.",
          link: { label: "See our websites", href: "/portfolio#country-collision" },
        },
        {
          title: "Local SEO",
          text: "We set up and manage your Google Business Profile so you show up when customers search.",
          includes: [
            ["Profile setup", "services, contact info, and the fine print"],
            ["Photos and posts", "new content added on a regular schedule"],
            ["Reviews", "a plan to get more of them, and we write the replies for you"],
            ["Search terms", "the words your customers type into Google"],
            ["Analytics", "we track your profile interactions and make adjustments"],
          ],
          outro: "When you’re ready, we also set up and manage local Google ads.",
        },
        {
          title: "Social Media Marketing",
          text: "Your customers doom scroll Facebook and Instagram everyday. We set up your profiles so your business stays in front of them.",
          includes: [
            ["Page setup", "Facebook and Instagram for your business"],
            ["Content", "custom photos, videos, and graphics"],
            ["Posting plan", "what to post + when"],
            ["Local groups", "posts in the community groups your customers follow"],
            ["Analytics", "we track what gets attention and do more of it"],
          ],
          outro: "We’re in tune with every trend and put it to work for your business.",
        },
        {
          title: "Brand Design",
          text: "Your logo is the first thing a customer sees. We design your brand by hand so it looks right on your sign, your truck, and your website.",
          includes: [
            ["Logo", "hand drawn and built to work at any size"],
            ["Colors and fonts", "one set look for everything you put out"],
            ["Business cards", "designed and ready to print"],
            ["Marketing materials", "flyers, menus, and social graphics"],
            ["Brand files", "every format you need for print and web"],
          ],
          outro: "When you’re ready, we also design apparel and animation.",
          link: { label: "See our branding", href: "/portfolio#kahlo" },
        },
      ].map((item: { title: string; text: string; includes?: string[][]; outro?: string; link?: { label: string; href: string } }, i) => (
        <div
          key={item.title}
          className={`group border-b border-black/20 py-8 transition-all duration-300 reveal cursor-pointer${servicesVisible ? " visible" : ""}`}
          style={{ transitionDelay: servicesVisible ? `${i * 80}ms` : "0ms" }}
          onClick={() => setOpenServiceIndex(openServiceIndex === i ? null : i)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              {item.title}
            </h3>

            <span className={`text-3xl transition-transform duration-300 group-hover:rotate-45${openServiceIndex === i ? " rotate-45" : ""}`}>
              +
            </span>
          </div>

          <div className={`grid transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100${openServiceIndex === i ? " grid-rows-[1fr] opacity-100" : " grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              {/* Details on the left; portfolio button centered in the open space on the right */}
              <div className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-2xl text-lg leading-relaxed text-black/70">
                <p>{item.text}</p>

                {item.includes && (
                  <>
                    <p className="mt-6">Every package includes:</p>
                    <ul className="mt-3 list-disc pl-6 space-y-2 marker:text-[#D64545]">
                      {item.includes.map(([label, detail]) => (
                        <li key={label}>
                          <span className="font-semibold text-[#11131a]">{label}:</span> {detail}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {item.outro && <p className="mt-6 italic text-base">{item.outro}</p>}
              </div>

              {item.link && (
                <Link
                  href={item.link.href}
                  onClick={(e) => e.stopPropagation()}
                  className="group/link shrink-0 self-start md:self-center md:mr-12 inline-flex h-12 px-7 items-center justify-center gap-2 border border-black/25 rounded-full text-base text-[#11131a] hover:bg-black/5 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
                >
                  {item.link.label}
                  <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                </Link>
              )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
