"use client";

import { useState } from "react";

const EMAIL = "studio@sloppyko.com";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative inline-flex flex-col items-center">
      <button
        onClick={handleCopy}
        className="inline-flex h-12 px-8 items-center justify-center bg-[#4f8cff] text-white rounded-full hover:opacity-90 hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 text-base font-medium"
      >
        {EMAIL}
      </button>

      <span
        className={`absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f4f1ea] text-[#11131a] text-xs font-semibold px-3 py-1 shadow transition-all duration-300 pointer-events-none ${
          copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        Copied!
      </span>
    </div>
  );
}
