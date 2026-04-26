// components/Footer.js
"use client";

export default function Footer() {
  return (
    <footer className="relative z-20 overflow-hidden border-t border-cyan-500/20 bg-black/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

      <div className="relative mx-auto flex max-w-7xl flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 px-3 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-cyan-500">
            Digital Archive Node
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
            Built with Next.js.
          </p>
        </div>

        <div className="flex items-center gap-6">
<div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 
  px-2 sm:px-3 md:px-4 
  py-1 sm:py-1.5 md:py-2 
  font-mono 
  text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs
  uppercase 
  tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] 
  text-cyan-300 
  shadow-[0_0_18px_rgba(34,211,238,0.25)]">
  Signal Stable
</div>

<div className="rounded-full border border-blue-500/30 bg-blue-500/10 
  px-2 sm:px-3 md:px-4 
  py-1 sm:py-1.5 md:py-2 
  font-mono 
  text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs
  uppercase 
  tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] 
  text-blue-300 
  shadow-[0_0_18px_rgba(59,130,246,0.25)]">
  Version 2.0
</div>
        </div>
      </div>
    </footer>
  );
}