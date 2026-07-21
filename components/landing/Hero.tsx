import Button from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">

      {/* Background Glow */}
      <div className="absolute -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

      <span className="z-10 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300 backdrop-blur">
        🚀 AI-Powered Research Assistant
      </span>

      <h1 className="z-10 mt-8 max-w-5xl text-6xl font-extrabold leading-tight md:text-7xl">
        Understand
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          {" "}
          Any Research Paper
        </span>
        <br />
        in Seconds
      </h1>

      <p className="z-10 mt-8 max-w-3xl text-lg text-zinc-400 md:text-xl">
        Upload PDFs, ask questions, generate summaries, and discover insights
        using Retrieval-Augmented Generation (RAG) powered by LLMs.
      </p>

      <div className="z-10 mt-12 flex flex-wrap justify-center gap-4">
        <Link href="/dashboard">
  <Button>Launch App →</Button>
</Link>
        <Link href="https://github.com/UmarQureshi7422">
          <Button variant="secondary">GitHub</Button>
        </Link>
      </div>
    </section>
  );
}