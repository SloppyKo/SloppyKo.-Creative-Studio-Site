"use client";

import { useState, useEffect, useRef } from "react";

type StackItem = { src: string; w: number; h: number };

const DIR = "/images/contact-collage/collage2";

// Ordered so similar pieces aren't back to back.
const ITEMS: StackItem[] = [
  { src: `${DIR}/countrycollision.webp`, w: 640, h: 434 },
  { src: `${DIR}/portal.webp`, w: 640, h: 581 },
  { src: `${DIR}/kahlo-final.webp`, w: 640, h: 480 },
  { src: `${DIR}/powerapps.webp`, w: 640, h: 489 },
  { src: `${DIR}/receipt-tool.webp`, w: 640, h: 563 },
  { src: `${DIR}/phone.webp`, w: 640, h: 875 },
  { src: `${DIR}/radiantlybare-green.webp`, w: 640, h: 444 },
  { src: `${DIR}/portal-tan.webp`, w: 640, h: 443 },
  { src: `${DIR}/kahlo.webp`, w: 640, h: 309 },
  { src: `${DIR}/hoodie-back.webp`, w: 640, h: 476 },
];

const INTERVAL_MS = 900;
const VISIBLE = 5; // pieces shown in the pile; older ones fade out
const KEEP = VISIBLE + 2; // extra pieces kept while they fade

// Where a piece lands, plus where it flies in from.
type Card = {
  id: number;
  item: number;
  rot: number;
  dx: number;
  dy: number;
  scale: number;
  fromX: number;
  fromY: number;
  fromRot: number;
  fromScale: number;
  duration: number;
  dropped: boolean;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function randomCard(id: number, item: number): Card {
  // Roughly 1 in 4 pieces lands far off-center.
  const sloppy = Math.random() < 0.25;
  const rot = 0; // pieces always land level; variety comes from position
  const angle = rand(0, Math.PI * 2); // fly in from any direction
  const distance = rand(120, 260);
  return {
    id,
    item,
    rot,
    dx: sloppy ? rand(-130, 130) : rand(-60, 60),
    dy: sloppy ? rand(-70, 70) : rand(-35, 35),
    scale: rand(0.85, 1.08),
    fromX: Math.cos(angle) * distance,
    fromY: Math.sin(angle) * distance - 60,
    fromRot: rand(-6, 6), // slight turn mid-flight, settles level
    fromScale: rand(1.15, 1.4),
    duration: rand(0.55, 0.95),
    dropped: true,
  };
}

// Fixed starting pile (no randomness during render, so server and client match).
const base = { fromX: 0, fromY: 0, fromRot: 0, fromScale: 1, duration: 0, dropped: false };
const INITIAL: Card[] = [
  { ...base, id: 0, item: 0, rot: 0, dx: -90, dy: 25, scale: 0.95 },
  { ...base, id: 1, item: 1, rot: 0, dx: 75, dy: -30, scale: 1 },
  { ...base, id: 2, item: 2, rot: 0, dx: -15, dy: 15, scale: 0.9 },
];

export default function PhotoStack() {
  const [cards, setCards] = useState<Card[]>(INITIAL);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const next = useRef({ id: INITIAL.length, item: INITIAL.length });

  // Only animate while the stack is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Warm the cache so each piece has its image before it lands.
    const preload = (i: number) => {
      new window.Image().src = ITEMS[i % ITEMS.length].src;
    };
    preload(next.current.item);

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const { id, item } = next.current;
      const card = randomCard(id, item % ITEMS.length);
      next.current = { id: id + 1, item: item + 1 };
      preload(item + 1);
      setCards((prev) => [...prev, card].slice(-KEEP));
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} aria-hidden="true" className="photo-stack relative w-full h-[23.75rem] sm:h-[30rem] md:h-[37.5rem]">
      {cards.map((card, i) => {
        const item = ITEMS[card.item % ITEMS.length]; // stays valid if the list changes
        const depth = cards.length - 1 - i; // 0 = top piece
        return (
          <div
            key={card.id}
            className={`photo-stack-card ${card.dropped ? "photo-stack-drop" : ""} ${
              depth >= VISIBLE ? "opacity-0" : "opacity-100"
            }`}
            style={
              {
                "--rot": `${card.rot}deg`,
                "--dx": `${card.dx / 16}rem`,
                "--dy": `${card.dy / 16}rem`,
                "--s": card.scale,
                "--from-x": `${card.fromX / 16}rem`,
                "--from-y": `${card.fromY / 16}rem`,
                "--from-rot": `${card.fromRot}deg`,
                "--from-s": card.fromScale,
                "--ratio": item.w / item.h,
                animationDuration: card.dropped ? `${card.duration}s` : undefined,
                zIndex: i,
              } as React.CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt="" draggable={false} className="block w-full h-full object-contain" />
          </div>
        );
      })}
    </div>
  );
}
