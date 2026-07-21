import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-10 md:flex-row">

        <div>

          <h2 className="text-xl font-bold">
            ResearchMind AI
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            AI-powered research assistant built with
            Next.js, FastAPI, LangChain, ChromaDB and Groq.
          </p>

        </div>

        <div className="flex items-center gap-6 text-sm">

          <a
            href="https://github.com/UmarQureshi7422"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-cyan-400"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/mumarqureshi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-cyan-400"
          >
            LinkedIn
          </a>

          <Link
            href="mailto:osxumar@gmail.com"
            className="transition hover:text-cyan-400"
          >
            Gmail
          </Link>

        </div>

      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-zinc-500">
        © 2026 ResearchMind AI. All rights reserved.
      </div>

    </footer>
  );
}