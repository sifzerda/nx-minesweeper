
"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [time, setTime] = useState(65);
  const [score, setScore] = useState(730);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 65));
      setScore((prev) => prev + Math.floor(Math.random() * 3));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const grid = [
    ["", "", "", "", "", "", "", "", "1", "1"],
    ["", "", "", "", "", "1", "1", "2", "2", "🚩"],
    ["", "", "1", "1", "1", "1", "🚩", "2", "🚩", "2"],
    ["", "", "", "1", "", "1", "2", "2", "2", "1"],
    ["", "", "", "", "", "", "", "", "", ""],
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.08),transparent_40%)]" />

        <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[12%] top-[20%] h-80 w-80 rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-[10%] left-[35%] h-96 w-96 rounded-full bg-cyan-400/5 blur-[180px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

        <div className="absolute inset-0 opacity-[0.04] mix-blend-screen">
          <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.08)_3px)]" />
        </div>

        <div className="absolute left-8 top-8 rounded border border-cyan-500/30 bg-black/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
          root@neural-core:~
        </div>

        <div className="absolute right-8 top-8 rounded border border-emerald-500/30 bg-black/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.35em] text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
          secure channel online
        </div>
      </div>

      {/* Header */}
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
            {["Dashboard", "Sessions", "Leaderboard", "Archive"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="group relative overflow-hidden border border-cyan-500/20 bg-zinc-900/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 transition duration-300 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 transition group-hover:opacity-100" />
                  <span className="relative z-10">{item}</span>
                </a>
              )
            )}
          </nav>
        </div>
      </header>

      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-16 overflow-hidden rounded-[40px] border border-cyan-500/20 bg-black/50 p-10 shadow-[0_0_100px_rgba(34,211,238,0.12)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_rgba(34,211,238,0.9)]" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_25px_rgba(59,130,246,0.9)]" />

          {/* Minesweeper */}
          <div className="relative overflow-hidden rounded-[28px] border border-cyan-500/30 bg-black/90 px-8 py-6 shadow-[0_0_60px_rgba(34,211,238,0.22)] backdrop-blur-xl">
            <div className="absolute right-4 top-4 flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
              <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            </div>

            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.45em] text-cyan-500">
              terminal://minesweeper_protocol
            </div>

            <div className="relative z-10 mb-6 flex justify-center gap-4">
              <div className="rounded-md border border-cyan-500/40 bg-black px-4 py-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                Time: {time}
              </div>

              <div className="rounded-md border border-cyan-500/40 bg-black px-4 py-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                Score: {score}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-10 overflow-hidden rounded-xl border border-cyan-500/20 shadow-[0_0_25px_rgba(34,211,238,0.15)]">
              {grid.flat().map((cell, index) => (
                <div
                  key={index}
                  className={`flex h-12 w-12 items-center justify-center border border-cyan-500/10 text-lg font-medium ${
                    cell === "🚩"
                      ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                      : "bg-zinc-950 text-cyan-200"
                  }`}
                >
                  {cell}
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="relative flex-1 overflow-hidden">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              network connected
            </div>

            <div className="absolute right-0 top-0 h-[2px] w-40 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
            <div className="absolute bottom-0 left-0 h-[2px] w-52 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />

            <div className="space-y-[-10px] text-right uppercase leading-none">
              <p className="font-mono text-2xl tracking-[0.5em] text-cyan-400/90">
                interface online
              </p>

              <h1 className="glitch-text text-[7rem] font-light tracking-[-0.08em]">
                cybernetic
              </h1>

              <h1 className="glitch-text translate-x-6 text-[8rem] font-light tracking-[-0.08em]">
                terminal
              </h1>

              <h1 className="glitch-text -translate-x-4 text-[6rem] font-light tracking-[-0.08em] opacity-70">
                protocol
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 overflow-hidden border-t border-cyan-500/20 bg-black/80 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-cyan-500">
              Digital Archive Node
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
              Built with Next.js, layered neon gradients, terminal grids,
              glitch typography, and cinematic UI motion.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.25)]">
              Signal Stable
            </div>

            <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-blue-300 shadow-[0_0_18px_rgba(59,130,246,0.25)]">
              Version 01.98
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}