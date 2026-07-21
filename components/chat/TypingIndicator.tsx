export default function TypingIndicator() {
  return (
    <div className="mb-8 flex items-start gap-4">

      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800">
        🤖
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 px-6 py-5">

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          ResearchMind AI
        </p>

        <div className="flex gap-2">

          <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />

          <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />

          <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />

        </div>

      </div>

    </div>
  );
}