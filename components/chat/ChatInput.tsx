"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled= false }: Props) {
  const [question, setQuestion] = useState("");

  function handleSubmit() {
    if (!question.trim()) return;

    onSend(question);
    setQuestion("");
  }

  return (
    <div className="border-t border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center gap-4 rounded-2xl border border-zinc-700 bg-zinc-800 p-3">

        <input
          value={question}
          disabled={disabled}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
             handleSubmit();
            }
        }}
         placeholder={
           disabled
             ? "📄 Upload a PDF to start chatting..."
             : "Ask anything about your research paper..."
         }
         className="flex-1 rounded-xl bg-zinc-800 px-4 py-4 outline-none disabled:cursor-not-allowed disabled:opacity-50"

        />

      <button
         onClick={handleSubmit}
         disabled={disabled || !question.trim()}
         className="rounded-xl bg-cyan-500 px-6 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
>
      <SendHorizontal size={20} />
      </button>

      </div>

    </div>
  );
}