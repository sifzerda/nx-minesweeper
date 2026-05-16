// components/Footer.js
"use client";

export default function Footer() {
  return (
    <footer className="relative z-20 overflow-hidden border-t border-cyan-500/20 bg-black/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

      <div className="relative mx-auto grid grid-cols-3 max-w-7xl items-center px-3 py-3">

        {/* Left: Version */}
        <div className="flex justify-start">

          <div className=" 
            px-3 py-2 font-mono text-[11px] sm:text-xs
            uppercase tracking-[0.45em] sm:tracking-[0.25em] text-blue-300
           whitespace-nowrap">
            VERSION 2.0
          </div>
        </div>

        {/* Center: Sifzerda */}
        <div className="flex justify-center">
          <a
            href="https://github.com/sifzerda"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.45em] text-cyan-500 hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            Sifzerda
          </a>
        </div>

        {/* Right: Built with */}
        <div className="flex justify-end">
          <p className="     
            px-3 py-2 font-mono text-[11px] sm:text-xs
            uppercase tracking-[0.45em] sm:tracking-[0.25em] text-zinc-300
           whitespace-nowrap">
            NEXT.JS
          </p>
        </div>

      </div>
    </footer>
  );
}
