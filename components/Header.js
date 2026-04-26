// components/Header.js
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "PLAY", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "HIGHSCORES", href: "/highscores" },
  ];

  return (
    <header className="relative z-20 overflow-visible border-b border-cyan-500/20 bg-black/80 backdrop-blur-xl">

      {/* background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.06)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />

      <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
      <div className="absolute right-0 top-0 h-full w-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />

      {/* TOP BAR */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-2">

        {/* LEFT */}
        <div className="flex items-center gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10">
            <div className="h-5 w-5 rounded-full bg-cyan-400" />
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-400">Neural Interface Active</p>
            <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-white glitch-text">Minesweeper.exe</h2>
          </div>
        </div>

        {/* HAMBURGER (mobile) */}
        <button
          className="md:hidden text-cyan-300 font-mono text-xs uppercase tracking-widest border border-cyan-500/30 px-3 py-2 cursor-pointer hover:border-cyan-400 hover:border-cyan-400"
          onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="border border-cyan-500/20 bg-zinc-900/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/50">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* MOBILE DROPDOWN (below header) */}
     {open && (
  <div className="md:hidden absolute left-0 top-full w-full z-50 border-t border-cyan-500/20 bg-black/90 backdrop-blur-xl">
          <div className="flex flex-col px-4 py-3 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border border-cyan-500/20 bg-zinc-900/60 px-4 py-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 hover:text-cyan-300 hover:border-cyan-400 hover:bg-zinc-900/80 transition-all duration-200">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

    </header>
  );
}