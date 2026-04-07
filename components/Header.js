// components/Header.js
"use client";
import Link from "next/link";

export default function Header() {
  const navItems = [
    { label: "MINE I", href: "/" },
    { label: "SESSIONS", href: "/" },
    { label: "LEADERBOARD", href: "/" },
    { label: "ARCHIVE", href: "/" },
    { label: "MINE II", href: "/game2" },
  ];

  return (
    <header className="relative z-20 overflow-hidden border-b border-cyan-500/20 bg-black/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.06)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />
      <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
      <div className="absolute right-0 top-0 h-full w-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,0.35)]">
            <div className="h-6 w-6 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-400">
              Neural Interface Active
            </p>
            <h2 className="mt-1 text-3xl font-bold uppercase tracking-[0.25em] text-white glitch-text">
              Minesweeper.exe
            </h2>
          </div>
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="group relative overflow-hidden border border-cyan-500/20 bg-zinc-900/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 transition duration-300 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 transition group-hover:opacity-100" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}