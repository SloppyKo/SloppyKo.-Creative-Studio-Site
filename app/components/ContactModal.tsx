"use client";

import { useEffect, useState, type FormEvent } from "react";

const EMAIL = "kieran@sloppyko.com";
const PHONE_DISPLAY = "(559) 589-4790";
const PHONE_HREF = "tel:+15595894790";

const serviceAreas = [
  "San Luis Obispo",
  "Hanford",
  "Greater Central Coast",
  "Greater Central Valley",
];

type Status = "idle" | "sending" | "sent" | "error";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/sloppykocreativestudio/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kieran-apgar-518b59196/" },
];

// Form side (cream)
const inputClass =
  "w-full rounded-sm bg-white border border-black/15 px-4 py-2 text-sm text-[#11131a] placeholder:text-black/35 focus:outline-none focus:border-[#4f8cff] focus:ring-1 focus:ring-[#4f8cff] transition-colors duration-200";

const labelClass = "block text-xs uppercase tracking-[0.15em] text-black/60 mb-1.5";


function Field({
  label,
  name,
  type = "text",
  optional,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`contact-${name}`} className={labelClass}>
        {label}
        {optional && <span className="normal-case tracking-normal text-black/35"> (optional)</span>}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required={!optional}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  );
}

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Any link pointing at #contact opens the form instead of scrolling.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link || !link.getAttribute("href")?.endsWith("#contact")) return;
      e.preventDefault();
      setOpen(true);
    }
    function onHash() {
      if (window.location.hash === "#contact") setOpen(true);
    }
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    // Direct visits to /#contact (e.g. shared links) open the form too.
    const frame = requestAnimationFrame(onHash);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    if (window.location.hash === "#contact") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (status === "sent") setStatus("idle");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/80 backdrop-blur-sm"
      onClick={close}
    >
      <div className="min-h-full flex items-center justify-center p-4 md:p-8">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
          className="fade-in-up relative w-full max-w-6xl overflow-hidden rounded-md bg-[#f4f1ea] text-[#11131a] shadow-2xl grid md:grid-cols-[1fr_2.3fr]"
          style={{ animationDuration: "0.35s" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={close}
            className="absolute top-3 right-4 z-10 p-1 leading-none text-[#11131a]/60 text-2xl hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            ×
          </button>

          {/* Info column */}
          <div className="flex flex-col gap-8 p-6 md:p-10">
            <p id="contact-title" className="uppercase tracking-[0.3em] text-base font-bold text-[#D64545]">
              Contact
            </p>

            <div>
              <p className={labelClass}>Areas we serve</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-black/70 marker:text-black/70">
                {serviceAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className={labelClass}>Email</p>
              <a href={`mailto:${EMAIL}`} className="text-[#11131a] underline-offset-4 hover:underline break-all">
                {EMAIL}
              </a>
            </div>

            <div>
              <p className={labelClass}>Phone</p>
              <a href={PHONE_HREF} className="text-[#11131a] underline-offset-4 hover:underline">
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* Socials pinned to the bottom-left */}
            <div className="mt-auto flex gap-6 pt-4 text-sm">
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/60 hover:text-[#11131a] transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Form container, with a very faint divider that fades out at both ends */}
          <div className="relative p-6 md:p-10">
            <span
              aria-hidden="true"
              className="absolute top-0 left-[8%] right-[8%] h-px bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.1)_6%,rgba(0,0,0,0.1)_94%,transparent)] md:hidden"
            />
            <span
              aria-hidden="true"
              className="absolute left-0 top-[4%] bottom-[4%] w-px bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.1)_6%,rgba(0,0,0,0.1)_94%,transparent)] hidden md:block"
            />
            {status === "sent" ? (
              <div className="h-full min-h-[18.75rem] flex flex-col items-center justify-center text-center gap-4">
                <p className="text-2xl font-bold text-[#11131a]" role="status">Message sent!</p>
                <p className="text-black/60 max-w-sm">
                  Someone from our team will be getting back to you very soon :)
                </p>
                <button
                  onClick={close}
                  className="mt-2 inline-flex h-10 w-36 items-center justify-center border border-black/20 rounded-full hover:bg-black/5 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-y-6 gap-x-10 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" />
                <Field label="Business" name="business" autoComplete="organization" />
                <Field label="City" name="city" optional autoComplete="address-level2" />
                <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                <Field label="Email" name="email" type="email" autoComplete="email" className="sm:col-span-2" />

                <div className="sm:col-span-2">
                  <label htmlFor="contact-note" className={labelClass}>
                    Note
                  </label>
                  <textarea
                    id="contact-note"
                    name="note"
                    required
                    rows={4}
                    placeholder="Tell us about your business and what you need."
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {/* Honeypot: hidden from people, filled by bots */}
                <input
                  type="text"
                  name="company_url"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="sm:col-span-2 flex flex-col items-center text-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex h-11 px-8 items-center justify-center bg-[#4f8cff] text-white rounded-full hover:opacity-90 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-[#D64545]" role="alert">
                      {error} You can also email us at {EMAIL}.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
