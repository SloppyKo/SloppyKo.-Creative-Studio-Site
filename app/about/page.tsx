export default function AboutPage() {
  const team = [
    {
      role: "Founder",
      name: "Kieran",
      image: "kieran.png",
      bio: "Quixotic grinder. He's quirky, driven, and has enough energy to power a small suburb.",
      skills: ["Next.js", "PostgreSQL", "|", "Development", "Brand Strategy"],
      schools: ["UCSB", "Cal Poly, SLO"],
    },
    {
      role: "Director of Technology",
      name: "Eddie",
      image: "eddy.png",
      bio: "Legendary problem solver. He once climbed a hill so many times it equaled the height of Everest.",
      skills: ["Systems Engineering", "Docker", "Linux", "C++", "|"],
      schools: ["UCSB"],
    },
    {
      role: "Marketing PM",
      name: "Allison",
      image: "allison.png",
      bio: "Elite organizer (has 3 personal calendars with exclusive to-do lists). When not working, she's probably doodling or ordering another matcha.",
      skills: ["Adobe Illustrator", "Canva", "Marketing"],
      schools: ["Cal Poly, SLO"],
    },
    {
      role: "Graphic Design",
      name: "Abigail",
      image: "abigail.png",
      bio: "Brilliant graphic designer whose passionate about sustainability and creative storytelling.",
      skills: ["Adobe Illustrator", "Figma", "|", "Graphic Design"],
      schools: ["Cal Poly, SLO"],
    },
    {
      role: "Photography & Sound",
      name: "Jordan",
      image: "jordan.jpg",
      bio: "Passion maxxer. He'll never stop exploring experimental multi-media storytelling.",
      skills: ["Adobe Premiere Pro", "DaVinci Resolve", "Lightroom"],
      schools: ["Cal Poly, SLO"],
    },
    {
      role: "Marketing",
      name: "Karol",
      image: "karol.png",
      bio: "Destined for the red carpet. She approaches life with an artistic mindset.",
      skills: ["Canva", "Social Media Marketing", "Adobe Photoshop"],
      schools: ["Cal Poly, SLO"],
    },
  ];

  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-28">
        <p className="uppercase tracking-[0.3em] text-base md:text-lg text-[#f6d76a] mb-6">
          About SloppyKo.
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mb-10">
          Don't Let The Name Fool You.
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-[#f4f1ea]/70 max-w-2xl">
          SloppyKo is a San Luis Obispo creative studio offering branding, web design, and application development for small businesses across California.
        </p>

      </section>

      <section className="bg-[#f4f1ea] text-[#11131a] py-16 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-20">Our Beliefs</h2>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {[
              ["Experience", "Everyone needs purpose. SloppyKo. helps young creatives gain real-world experience and develop their portfolios."],
              ["Partnership", "Business is personal. We show up, get to know you, and stick around. No invisible transactions."],
              ["Affordability", "Operating a small business is expensive. They deserve access to high quality, affordable creative services."],
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
                <div className="w-full aspect-[4/5] bg-white/10 rounded-[1.5rem] mb-6 overflow-hidden">
                  <img
                    src={`/images/${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <p className="text-sm uppercase tracking-[0.2em] text-[#f6d76a] mb-2">
                  {member.role}
                </p>

                <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#f4f1ea]/40 mb-4">
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
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#f4f1ea]/50"
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


