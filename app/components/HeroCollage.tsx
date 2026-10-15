import Image from "next/image";

const DIR = "/images/homespecial";

// Every photo in public/images/homespecial, with its pixel size
const PHOTOS: [string, number, number][] = [
  ["action_new.webp", 1600, 1112],
  ["clientdb_new.webp", 1600, 1413],
  ["contract_new.webp", 1600, 1942],
  ["countrycollision.webp", 1200, 813],
  ["countrycollision_featured_new1.webp", 2400, 1543],
  ["dashboard_new.webp", 1600, 1518],
  ["dynasen-card.webp", 1200, 670],
  ["hoodie-back.webp", 1200, 893],
  ["hoodie-front.webp", 863, 860],
  ["kahlo-final.webp", 1200, 900],
  ["kahlo-laptop.webp", 1248, 878],
  ["kahlo.webp", 1200, 579],
  ["phone.webp", 1200, 1640],
  ["portal-tan.png", 3136, 2170],
  ["portal.webp", 1200, 1090],
  ["powerapps.webp", 1200, 917],
  ["radiantlybare-green.webp", 2265, 1448],
  ["radiantlybare_laptop_3.webp", 2400, 1618],
  ["receipt-tool.webp", 1200, 1055],
];

const COLS = 7;
const ROWS = 3;
// 21 cells for 19 photos: two cells stay empty (one in each of the top two rows)
const SKIP = new Set([3, 10]);

// Seeded random so the server and browser draw the same "random" collage
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// One photo per cell of an even, staggered 7×3 grid: shuffled, nudged a little, and tilted.
// Small nudges and small photos keep the spread even, with no crowded spots.
const rand = mulberry32(20261014);
const order = PHOTOS.map((p) => [rand(), p] as const).sort((a, b) => a[0] - b[0]).map(([, p]) => p);
const cells = Array.from({ length: COLS * ROWS }, (_, i) => i).filter((i) => !SKIP.has(i));
const TILES = order.map(([file, w, h], i) => {
  const col = cells[i] % COLS;
  const row = Math.floor(cells[i] / COLS);
  const stagger = row % 2 ? 0.25 : -0.25; // offset alternate rows, like bricks
  return {
    src: `${DIR}/${file}`,
    w,
    h,
    row,
    left: ((col + 0.5 + stagger) / COLS) * 100 + (rand() - 0.5) * 5, // % of hero width
    top: ((row + 0.5) / ROWS) * 100 + (rand() - 0.5) * 10, // % of hero height
    width: 10 + rand() * 3.5, // % of hero width
    rot: (rand() - 0.5) * 14, // degrees
  };
});

// Each row drifts sideways on a slow loop, alternating direction (see .collage-row in globals.css)
const ROW_SECONDS = [150, 120, 170];

// Hero background: all of our work as a faint, tilted collage whose rows slowly drift in
// alternating directions. The center is darkened so the headline stays easy to read.
// (HeroSpotlight is the earlier alternative.)
export default function HeroCollage() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ maskImage: "linear-gradient(to bottom, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000 92%, transparent)" }}
    >
      <div className="absolute inset-0 opacity-[0.04]">
        {Array.from({ length: ROWS }, (_, row) => (
          // Two hero-widths wide: the row's photos drawn twice, so sliding by half loops seamlessly
          <div
            key={row}
            className={`collage-row absolute inset-y-0 left-0 w-[200%] ${row % 2 ? "collage-row-right" : "collage-row-left"}`}
            style={{ animationDuration: `${ROW_SECONDS[row]}s` }}
          >
            {[0, 50].flatMap((offset) =>
              TILES.filter((t) => t.row === row).map((t) => (
                <Image
                  key={`${t.src}-${offset}`}
                  src={t.src}
                  alt=""
                  width={t.w}
                  height={t.h}
                  sizes="22vw"
                  // On screen at load, so don't lazy-load; low priority keeps the headline first
                  loading="eager"
                  fetchPriority="low"
                  className="absolute h-auto"
                  style={{
                    left: `${t.left / 2 + offset}%`,
                    top: `${t.top}%`,
                    width: `${t.width / 2}%`,
                    transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
                  }}
                />
              ))
            )}
          </div>
        ))}
      </div>
      {/* Darker in the middle so the headline and copy read cleanly */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_50%_40%,rgba(17,19,26,0.8),transparent)]" />
    </div>
  );
}
