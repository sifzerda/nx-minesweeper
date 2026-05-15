"use client";

const legacyStack = [
    "Fullstack App",
    "React",
    "Custom CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "GraphQL",
    "Heroku",
    "Service Worker",
];

const currentStack = [
    "Serverless Front-End",
    "Next.js",
    "Tailwind",
    "Node.js",
    "Zustand",
    "Webpack",
    "Rust",
    "Tauri",
    "Vercel",
];



export default function AboutPage() {

    const isDesktop = typeof window !== "undefined" && window.__TAURI__;
    if (isDesktop) {
        window.location.href = "/";
        return null;
    }

    return (
        <main className="relative overflow-hidden bg-black text-white">

            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_35%)]" />
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center px-4 sm:px-6">
                <div className="w-full max-w-4xl rounded-[30px] border border-cyan-500/20 bg-black/60 p-4 sm:p-6 md:p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(34,211,238,0.15)]">

                    {/* Header */}
                    <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-cyan-400">
                        <p className="text-cyan-300 border border-cyan-300/20 bg-cyan-300/10 px-2 sm:px-3 py-1">system://node</p>
                        <p className="text-cyan-400 border border-cyan-400/20 bg-cyan-400/10 px-2 sm:px-3 py-1">react://next.js</p>
                        <p className="text-cyan-500 border border-cyan-500/20 bg-cyan-500/10 px-2 sm:px-3 py-1">wrapper://tauri</p>
                        <p className="text-cyan-600 border border-cyan-600/20 bg-cyan-600/10 px-2 sm:px-3 py-1">status:// <span className="text-cyan-700">vercel : </span><span className="text-green-400 animate-pulse">online</span></p>
                    </div>

                    {/* HOW TO PLAY */}
                    <h1 className="text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] font-black uppercase tracking-[-0.06em] sm:tracking-[-0.08em] text-white">How to Play</h1>

                    <div className="mb-4 max-w-3xl space-y-4">

                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-cyan-300 uppercase tracking-widest mb-2">Desktop</h2>
                            <ul className="space-y-1 text-[11px] sm:text-xs md:text-sm leading-relaxed text-cyan-100/75 list-disc list-inside">
                                <li>Left click a cell to reveal it</li>
                                <li>Right click a cell to place or remove a flag</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-cyan-300 uppercase tracking-widest mb-2">Mobile</h2>
                            <ul className="space-y-1 text-[11px] sm:text-xs md:text-sm leading-relaxed text-cyan-100/75 list-disc list-inside">
                                <li>Tap a cell to reveal it</li>
                                <li>Hold down a cell to place or remove a flag</li>
                            </ul>
                        </div>

                    </div>

                    {/* Title */}
                    <h1 className="text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] font-black uppercase tracking-[-0.06em] sm:tracking-[-0.08em] text-white">ABOUT</h1>

                    {/* Description */}
                    <div className="mb-4 max-w-3xl">
                        <p className="text-[11px] sm:text-xs md:text-base leading-relaxed text-cyan-100/75">
                            This project is a rebuild and refactor of my original
                            React fullstack Minesweeper application into a modern
                            serverless Next.js experience with a native desktop wrapper
                            powered by Rust and Tauri.
                        </p>
                    </div>

                    {/* STACKS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">

                        {/* LEGACY */}
                        <section className="relative overflow-hidden rounded-[28px] border border-cyan-500/15 bg-black/50 backdrop-blur-xl">
                            <div className="relative border-b border-cyan-500/10 px-4 sm:px-6 py-4 sm:py-5">

                                <div className="mb-2 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <div className="h-2 w-2 rounded-full bg-green-400" />
                                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                                </div>

                                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-green-500">legacy://build</p>
                                <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-black text-green-500">Minesweeper 1.0</h2>

                            </div>

                            <div className="relative p-2 sm:p-3 md:p-4">

                                <ol className="space-y-2">
                                    {legacyStack.map((item) => (
                                        <li key={item} className="flex items-center rounded-2xl border border-cyan-500/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-1 hover:border-cyan-400/40 hover:bg-cyan-500/[0.05]">
                                            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em]">{item}</span>
                                        </li>
                                    ))}
                                </ol>

                            </div>

                        </section>

                        {/* CURRENT */}
                        <section className="relative overflow-hidden rounded-[28px] border border-cyan-500/15 bg-black/50 backdrop-blur-xl">
                            <div className="relative border-b border-cyan-500/10 px-4 sm:px-6 py-4 sm:py-5">

                                <div className="mb-2 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-cyan-600" />
                                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                                    <div className="h-2 w-2 rounded-full bg-cyan-300" />
                                </div>

                                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-cyan-400">current://build</p>
                                <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-black text-cyan-400">Minesweeper 2.0</h2>

                            </div>

                            <div className="relative p-2 sm:p-3 md:p-4">
                                <ol className="space-y-2">
                                    {currentStack.map((item) => (
                                        <li key={item} className="flex items-center rounded-2xl border border-cyan-500/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-1 hover:border-green-400/40 hover:bg-green-500/[0.05]">
                                            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em]">{item}</span>
                                        </li>
                                    ))}
                                </ol>

                            </div>

                        </section>

                    </div>

                </div>
            </div>

        </main>
    );
}