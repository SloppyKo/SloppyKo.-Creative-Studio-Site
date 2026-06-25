import LiveSiteCard from "../components/LiveSiteCard";
import PortfolioNav from "../components/PortfolioNav";
import ExpandableImageCard from "../components/ExpandableImageCard";

const projects = [
  {
    id: "website-creation",
    client: "Website Creation",
    color: "#EACE76",
    summary: "End-to-end website creation: design, develop, and launch.",
    tags: ["UX/UI", "SEO", "Domain + Hosting"],
    techStack: ["Next.js", "Tailwind CSS"],
    liveItems: [
      { label: "Esthetician Studio", url: "https://www.radiantlybare.com" },
    ],
    items: [],
  },
  {
    id: "application-development",
    client: "Application Development",
    color: "#4f8cff",
    summary: "Building custom web based tools to solve inefficiences.",
    tags: ["Workflow Design", "Internal Tooling", "Data Management"],
    techStack: [],
    liveItems: [],
    items: [
      { label: "Workflow Approval Tool", image: "/images/powerappsfinal.png", aspectRatio: "auto", videoSrc: "/images/powerappstool.mp4", objectFit: "contain" as const, containPadding: "p-0", tags: ["Microsoft Power Apps"] },
      { label: "Operations Portal", image: "/images/featured/dashboard_new.png", aspectRatio: "1/1", href: "/#featured-application", tags: ["Next.js", "PostgreSQL", "Clerk"], objectFit: "contain" as const },
      { label: "Receipt Tool", image: "/images/receiptfinal1.png", aspectRatio: "1/1", videoSrc: "/images/receipt%20tool.mp4", tags: ["Next.js", "PostgreSQL", "Clerk"], objectFit: "contain" as const, containPadding: "p-0" },
    ],
    columns: 1,
    cardVariant: "blue" as const,
  },
  {
    id: "branding-design",
    client: "Brand Design",
    color: "#ff5c6c",
    summary: "Envisioning and creating brand assets for physcial and digital media.",
    tags: ["Visual Identity", "Marketing Assets", "Graphic Design"],
    techStack: [],
    liveItems: [],
    items: [
      { label: "Engineering Firm", image: "/images/dynasen card.jpg", aspectRatio: "1/1", tags: ["Adobe Illustrator"] },
      { label: "Premium Caterer", image: "/images/kahlo final.png", aspectRatio: "1/1", tags: ["Adobe Illustrator"] },
      { label: "Youtuber", image: "/images/anime final.png", aspectRatio: "1/1", tags: ["Adobe Illustrator"] },
      { label: "Cuisine Startup", image: "/images/hoodie_screenshot.webp", aspectRatio: "1/1", tags: ["Adobe Illustrator"] },
    ],
    columns: 2,
    cardVariant: "red" as const,
  },
];

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioNav />
      <section className="px-4 md:px-8 pt-16 md:pt-24 pb-24 md:pb-48">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <p className="mb-4 text-base md:text-lg font-semibold uppercase tracking-[0.25em] text-[#EACE76]">
              Portfolio
            </p>

            <h1 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">
              Our Favorites
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-[#f4f1ea]/70">
              Each lane shows memorable projects from our core pods: Website Creation, Application Development, and Brand Design.
            </p>
          </div>

          <div className="space-y-16 md:space-y-32">
            {projects.map((project) => (
              <article
                key={project.client}
                id={project.id}
                className="rounded-3xl border border-white/8 bg-[#1a1d26] p-8 md:p-12 shadow-2xl"
              >
                <div className="mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <span
                      className="block w-5 h-[3px] rounded-full mb-2"
                      style={{ backgroundColor: project.color }}
                    />
                    <h2 className="mb-3 text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">
                      {project.client}
                    </h2>

                    <p className="text-sm md:text-base font-medium leading-relaxed text-[#f4f1ea]/65">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-[#f4f1ea]/10 px-3 py-1 text-xs font-bold text-[#f4f1ea]/85"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live website embeds */}
                {project.liveItems.length > 0 && (
                  <div className="space-y-6">
                    {project.liveItems.map((item) => (
                      <LiveSiteCard key={item.url} label={item.label} url={item.url} />
                    ))}
                  </div>
                )}

                {/* Image-based cards */}
                {project.items.length > 0 && (
                  <div className={`grid ${project.columns === 1 ? "gap-20 md:grid-cols-1" : project.columns === 3 ? "gap-12 md:grid-cols-3" : "gap-12 md:grid-cols-2"}`}>
                    {project.items.map((item) => (
                      <div key={item.label} className="flex flex-col gap-3 h-full">
                        <ExpandableImageCard label={item.label} image={item.image} variant={"cardVariant" in project ? project.cardVariant : "red"} aspectRatio={"aspectRatio" in item ? item.aspectRatio : undefined} href={"href" in item ? item.href : undefined} stretch={project.columns === 2} videoSrc={"videoSrc" in item ? item.videoSrc : undefined} objectFit={"objectFit" in item ? item.objectFit : undefined} containPadding={"containPadding" in item ? item.containPadding : undefined} tags={"tags" in item ? item.tags : undefined} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold text-white/75 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
