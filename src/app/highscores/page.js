"use client";

const mockScores = [
  { name: "NEON_RAVEN", score: 9820, time: "00:54" },
  { name: "CYBER_GHOST", score: 8760, time: "01:12" },
  { name: "VOID_HACKER", score: 8450, time: "01:03" },
  { name: "GRID_WALKER", score: 7900, time: "01:21" },
  { name: "TERMINAL_X", score: 7655, time: "01:33" },
];

export default function HighScoresPage() {
  return (
    <main className="relative overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.12),transparent_40%)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center px-6 py-0 sm:py-8 md:py-20">

        <div className="w-full max-w-5xl rounded-[30px] border border-cyan-500/20 bg-black/60 p-6 backdrop-blur-2xl shadow-[0_0_90px_rgba(34,211,238,0.15)]">

          {/* Header */}
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.4em] text-cyan-400 uppercase">
              leaderboard://global_rankings
            </p>

            <h1 className="mt-2 text-[3rem] font-light tracking-[-0.08em]">
              high scores
            </h1>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-cyan-500/20">

            {/* Header Row */}
            <div className="grid grid-cols-3 bg-cyan-500/10 px-4 py-3 font-mono text-xs text-cyan-300">
              <div>PLAYER</div>
              <div>SCORE</div>
              <div>TIME</div>
            </div>

            {/* Rows */}
            {mockScores.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-3 px-4 py-4 text-sm border-t border-cyan-500/10 hover:bg-cyan-500/5 transition">
                <div className="text-cyan-100">{s.name}</div>
                <div className="text-cyan-300">{s.score}</div>
                <div className="text-cyan-400/70">{s.time}</div>
              </div>
            ))}

          </div>

          {/* Footer */}
          <div className="mt-8 font-mono text-xs text-cyan-400/60 flex flex-col sm:flex-row sm:items-center sm:gap-x-2 gap-y-1">
            <span>LIVE RANKING FEED:</span>

            <span className="text-red-400 uppercase animate-pulse">
              [offline]
            </span>

            <span className="text-cyan-400/40">•</span>

            <span>UPDATING STATUS:</span>

            <span className="text-white uppercase animate-pulse">
              [static]
            </span>
          </div>

        </div>
      </div>
    </main>
  );
}