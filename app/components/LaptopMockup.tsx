// Screen offsets calibrated against the PNG frames.
// "angled" = /images/hero/laptop angles.png (3/4 view, pre-baked perspective)
// "front"  = /images/hero/laptop mockup.png (straight-on)
const SCREENS = {
  angled: { top: "4%",  left: "12%", width: "74%", height: "60%" },
  front:  { top: "9%",  left: "14%", width: "71%", height: "50%" },
};

const SRCS = {
  angled: "/images/hero/laptop angles.png",
  front:  "/images/hero/laptop new.png",
};

export default function LaptopMockup({
  children,
  variant = "front",
}: {
  children?: React.ReactNode;
  variant?: "front" | "angled";
}) {
  const screen = SCREENS[variant];
  const src    = SRCS[variant];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Laptop PNG frame — rendered first, no blend mode needed */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        style={{
          display:       "block",
          width:         "100%",
          position:      "relative",
          pointerEvents: "none",
          userSelect:    "none",
        }}
      />

      {/* Screenshot layer — sits on top, positioned over the screen area */}
      <div
        style={{
          position: "absolute",
          top:      screen.top,
          left:     screen.left,
          width:    screen.width,
          height:   screen.height,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
