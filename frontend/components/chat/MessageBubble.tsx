"use client";

import { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`mb-8 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-4xl gap-4 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            isUser
              ? "bg-cyan-500"
              : "border border-zinc-700 bg-zinc-800"
          }`}
        >
          {isUser ? (
            <User size={18} className="text-black" />
          ) : (
            <Bot size={18} className="text-cyan-400" />
          )}
        </div>

        {/* Bubble */}

        <div
          className={`rounded-3xl px-6 py-5 ${
            isUser
              ? "bg-cyan-500 text-black"
              : "border border-zinc-800 bg-zinc-900 text-white"
          }`}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest opacity-70">
            {isUser ? "You" : "ResearchMind AI"}
          </p>

          {isUser ? (
            <p className="whitespace-pre-wrap leading-7">
              {message.content}
            </p>
          ) : (
            <div className="space-y-4 leading-8">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-4 text-3xl font-bold">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 text-2xl font-semibold">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-3 mt-5 text-xl font-semibold">
                      {children}
                    </h3>
                  ),

                  p: ({ children }) => (
                    <p className="mb-4 text-zinc-200">
                      {children}
                    </p>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-2 pl-6">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-2 pl-6">
                      {children}
                    </ol>
                  ),

                  code: ({ children }) => (
                    <code className="rounded bg-zinc-800 px-2 py-1 text-cyan-300">
                      {children}
                    </code>
                  ),

                  pre: ({ children }) => (
                    <pre className="my-5 overflow-x-auto rounded-xl bg-black p-5">
                      {children}
                    </pre>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-bold text-white">
                      {children}
                    </strong>
                  ),

                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-zinc-300">
                      {children}
                    </blockquote>
                  ),

                  table: ({ children }) => (
                    <table className="my-5 w-full border-collapse">
                      {children}
                    </table>
                  ),

                  th: ({ children }) => (
                    <th className="border border-zinc-700 bg-zinc-800 p-3 text-left">
                      {children}
                    </th>
                  ),

                  td: ({ children }) => (
                    <td className="border border-zinc-700 p-3">
                      {children}
                    </td>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}