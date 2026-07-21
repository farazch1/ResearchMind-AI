"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight transition hover:text-cyan-400"
        >
          ResearchMind AI
        </Link>

        {/* Tagline */}
        <p className="text-lg italic text-zinc-400">
          Your modern research companion
        </p>

      </div>

    </nav>
  );
}