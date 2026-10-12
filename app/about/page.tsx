import type { Metadata } from "next";
import Image from "next/image";

const DESCRIPTION =
  "SloppyKo is a creative studio in Hanford and San Luis Obispo where Cal Poly and UCSB students build websites, Google profiles, and brands for small businesses.";

export const metadata: Metadata = {
  title: "About Our Web Design Studio",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: "SloppyKo",
    title: "About Our Web Design Studio | SloppyKo",
    description: DESCRIPTION,
    url: "/about",
    locale: "en_US",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "SloppyKo Creative Studio logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Web Design Studio | SloppyKo",
    description: DESCRIPTION,
    images: [{ url: "/twitter-image.png", width: 1200, height: 630, alt: "SloppyKo Creative Studio logo" }],
  },
};

export default function AboutPage() {
  const team = [
    {
      role: "Founder",
      name: "Kieran",
      image: "kieran.webp",
      bio: "Quixotic grinder. He's quirky, driven, and has enough energy to power a small suburb.",
      skills: ["Next.js", "PostgreSQL", "|", "Development", "Brand Strategy"],
      schools: ["UCSB", "Cal Poly, SLO"],
    },
    {
      role: "Director of Technology",
      name: "Eddie",
      image: "eddy.webp",
      bio: "Legendary problem solver. He once climbed a hill so many times it equaled the height of Everest.",
      skills: ["Systems Engineering", "Docker", "Linux", "C++", "|"],
      schools: ["UCSB"],
    },
    {
      role: "Marketing PM",
      name: "Allison",
      image: "allison.webp",
      bio: "Elite organizer (has 3 personal calendars with exclusive to-do lists). When not working, she's probably doodling or ordering another matcha.",
      skills: ["Adobe Illustrator", "Canva", "Marketing"],
      schools: ["Cal Poly, SLO"],
    },
    {
      role: "Graphic Design",
      name: "Abigail",
      image: "abigail.webp",
      bio: "Brilliant graphic designer who's passionate about sustainability and creative storytelling.",
      skills: ["Adobe Illustrator", "Figma", "|", "Graphic Design"],
      schools: ["Cal Poly, SLO"],
    },
    {
      role: "Photography & Sound",
      name: "Jordan",
      image: "jordan.webp",
      bio: "Passion maxxer. He'll never stop exploring experimental multi-media storytelling.",
      skills: ["Adobe Premiere Pro", "DaVinci Resolve", "Lightroom"],
      schools: ["Cal Poly, SLO"],
    },
    {
      role: "Marketing",
      name: "Karol",
      image: "karol.webp",
      bio: "Destined for the red carpet. She approaches life with an artistic mindset.",
      skills: ["Canva", "Social Media Marketing", "Adobe Photoshop"],
      schools: ["Cal Poly, SLO"],
    },
  ];

  return (
    <main>
      <section className="relative overflow-hidden">
        {/* Slow aurora glow, same as the home page hero */}
        <div aria-hidden="true" className="aurora">
          <span className="aurora-glow aurora-1" />
          <span className="aurora-glow aurora-2" />
          <span className="aurora-glow aurora-3" />
          <span className="aurora-glow aurora-current" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-16 md:pb-28">
          <h1 className="font-[Comfortaa,sans-serif] mb-4 text-sm md:text-base font-semibold uppercase tracking-[0.25em] text-[#EACE76]">
            SloppyKo. | About our Web Design Studio
          </h1>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mb-12 md:mb-14">
            Let&apos;s Keep Creativity <span className="text-[#D64545]">Human</span>
          </h2>

          {/* Mission gets its own block so it stands out */}
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
              Our Mission
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-[#f4f1ea]/70">
              We&apos;re a small creative studio in Hanford and San Luis Obispo, serving the Central Valley and Central Coast. We give Cal Poly and UCSB students real projects to own from start to finish, and small businesses get quality work from real people at an affordable price.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f1ea] text-[#11131a] py-16 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-20">Our Beliefs</h2>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {[
              ["Experience", "Everyone needs purpose. Our students build real portfolios with real client work."],
              ["Partnership", "Business is personal. We shake hands, get to know you, and stick around."],
              ["Affordability", "Operating a small business is expensive. You deserve access to creative services you can afford."],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="text-3xl font-semibold mb-6">{title}</h3>
                <p className="text-lg leading-relaxed text-black/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#11131a] text-[#f4f1ea] py-16 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-20">The Team</h2>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-32">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col">
                <div className="relative w-full aspect-[4/5] bg-white/10 rounded-[1.5rem] mb-6 overflow-hidden">
                  <Image
                    src={`/images/${member.image}`}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>

                <p className="text-sm uppercase tracking-[0.2em] text-[#f6d76a] mb-2">
                  {member.role}
                </p>

                <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                <p className="text-[0.625rem] uppercase tracking-[0.2em] text-[#f4f1ea]/40 mb-4">
                  {member.schools.join("  ·  ")}
                </p>

                <p className="text-gray-300 leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, i) =>
                    skill === "|" ? (
                      <div key={`break-${i}`} className="w-full" />
                    ) : (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6875rem] font-semibold tracking-wide text-[#f4f1ea]/50"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}


