"use client";

export default function AboutPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-black text-white">

            {/* Background (same style as home) */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_35%)]" />
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center px-6 py-20">
                <div className="w-full max-w-4xl rounded-[30px] border border-cyan-500/20 bg-black/60 p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(34,211,238,0.15)]">

                    {/* Header */}
                    <div className="mb-8 font-mono text-xs tracking-[0.4em] text-cyan-400 uppercase space-y-1 opacity-90">
                        <p className="text-cyan-300">system://node</p>
                        <p className="text-cyan-400">react://next.js</p>
                        <p className="text-cyan-500">db:prisma</p>
                        <p className="text-cyan-600">status://
                            <span className="text-green-400">connected : </span>
                            <span className="text-amber-400 animate-pulse">standby</span>
                        </p>
                        <h1 className="mt-4 text-[3rem] font-light tracking-[-0.08em]">
                            about
                        </h1>
                    </div>

                    {/* Body */}
                    <div className="space-y-6 text-sm leading-relaxed text-cyan-100/80">
                        <p>
                            This system is a simulated cyber interface built around a real-time logic core.
                            It processes user interaction, score computation, and memory state rendering.
                        </p>

                        <p>
                            The environment you see is not static — it reacts to time cycles, input states,
                            and probabilistic scoring events.
                        </p>

                        <p>
                            All visuals are generated using layered noise fields, grid overlays, and
                            reactive glow systems.
                        </p>
                    </div>

                    {/* Terminal footer */}
                    <div className="mt-10 border-t border-cyan-500/20 pt-6 font-mono text-xs text-cyan-400/60">
                        STATUS: ONLINE • CORE STABLE • LATENCY LOW
                    </div>

                </div>
            </div>
        </main>
    );
}