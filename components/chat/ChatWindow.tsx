"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface Props {
  messages: Message[];
  loading: boolean;
}

export default function ChatWindow({
  messages,
  loading,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#09090B] px-8 py-8">

      {messages.length === 0 && (
        <div className="mt-20 text-center">

        <div className="mb-8 text-6xl">
          🧠
        </div>

        <h1 className="text-5xl font-bold">
        ResearchMind AI
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Upload a research paper and ask questions in natural language.
          AI will answer using only your uploaded document.
        </p>

     </div>
      )}

      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />

    </div>
  );
}