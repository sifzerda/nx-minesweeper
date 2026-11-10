"use client";

import Minesweeper from "../../components/Minesweeper.jsx";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-zinc-950 px-4 py-10 text-white">
      <div className="w-full max-w-7xl">
        <Minesweeper />
      </div>
    </main>
  );
}
