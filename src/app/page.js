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
    <main className="relative overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.08),transparent_40%)]" />

        <div className="absolute left-[10%] top-[15%] h-40 w-40 sm:h-72 sm:w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[12%] top-[20%] h-52 w-52 sm:h-80 sm:w-80 rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-[10%] left-[35%] h-60 w-60 sm:h-96 sm:w-96 rounded-full bg-cyan-400/5 blur-[180px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

        <div className="absolute inset-0 opacity-[0.04] mix-blend-screen">
          <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.08)_3px)]" />
        </div>

        <div className="absolute left-3 top-3 sm:left-8 sm:top-8 rounded border border-cyan-500/30 bg-black/70 px-2 py-1 sm:px-4 sm:py-2 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
          root@neural-core:~
        </div>

        <div className="absolute right-3 top-3 sm:right-8 sm:top-8 rounded border border-emerald-500/30 bg-black/70 px-2 py-1 sm:px-4 sm:py-2 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.35em] text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
          secure channel online
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:min-h-screen">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16 overflow-hidden rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] border border-cyan-500/20 bg-black/50 p-4 sm:p-6 lg:p-10 shadow-[0_0_100px_rgba(34,211,238,0.12)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_rgba(34,211,238,0.9)]" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_25px_rgba(59,130,246,0.9)]" />

          {/* Minesweeper */}
          <div className="relative w-full max-w-full overflow-hidden rounded-[20px] sm:rounded-[28px] border border-cyan-500/30 bg-black/90 px-3 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6 shadow-[0_0_60px_rgba(34,211,238,0.22)] backdrop-blur-xl lg:w-auto">
            <div className="absolute right-3 top-3 sm:right-4 sm:top-4 flex gap-2">
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            </div>

            <div className="mb-4 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.45em] text-cyan-500 text-center sm:text-left">
              terminal://minesweeper_protocol
            </div>

            <div className="relative z-10 mb-4 sm:mb-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <div className="rounded-md border border-cyan-500/40 bg-black px-3 py-2 sm:px-4 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] text-center">
                Time: {time}
              </div>

              <div className="rounded-md border border-cyan-500/40 bg-black px-3 py-2 sm:px-4 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] text-center">
                Score: {score}
              </div>
            </div>

            <div className="relative z-10 overflow-x-auto">
              <div className="mx-auto grid w-max grid-cols-10 overflow-hidden rounded-xl border border-cyan-500/20 shadow-[0_0_25px_rgba(34,211,238,0.15)]">
                {grid.flat().map((cell, index) => (
                  <div
                    key={index}
                    className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center border border-cyan-500/10 text-sm sm:text-base lg:text-lg font-medium ${cell === "🚩"
                      ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                      : "bg-zinc-950 text-cyan-200"
                      }`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="relative flex-1 overflow-hidden text-center lg:text-right w-full">
            <div className="mb-6 sm:mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 sm:px-5 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              network connected
            </div>

            <div className="absolute right-0 top-0 hidden lg:block h-[2px] w-40 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
            <div className="absolute bottom-0 left-0 hidden lg:block h-[2px] w-52 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />

            <div className="space-y-1 sm:space-y-[-6px] lg:space-y-[-10px] uppercase leading-none">
              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.5em] text-cyan-400/90">
                interface online
              </p>

<h1 className="glitch-text text-[4.5rem] lg:text-[3.1rem] xl:text-[5rem] md:text-[3.8rem] font-light tracking-[-0.08em]">
  cybernetic
</h1>

<h1 className="glitch-text -translate-x-4 text-[4rem] lg:text-[3rem] xl:text-[4rem] md:text-[3rem] font-light tracking-[-0.08em] opacity-70">
  terminal
</h1>

<h1 className="glitch-text -translate-x-4 text-[4rem] lg:text-[3rem] xl:text-[4rem] md:text-[3rem] font-light tracking-[-0.08em] opacity-70">
  protocol
</h1>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

