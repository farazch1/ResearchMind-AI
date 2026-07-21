"use client";

import {
  BrainCircuit,
  MessageSquare,
  Trash2,
  Settings,
} from "lucide-react";

interface Props {
  messageCount: number;
  onClearChat: () => void;
}

export default function Sidebar({
  messageCount,
  onClearChat,
}: Props) {
  return (
    <aside className="flex h-screen w-72 flex-col justify-between border-r border-zinc-800 bg-[#111111]">

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="p-7">

          <div className="flex items-center gap-3">

            <BrainCircuit
              size={34}
              className="text-cyan-400"
            />

            <div>

              <h1 className="text-2xl font-bold text-cyan-400">
                ResearchMind AI
              </h1>

              <p className="text-sm text-zinc-500">
                Your AI Research Assistant
              </p>

            </div>

          </div>

        </div>

        {/* Menu */}
        <div className="space-y-3 px-7">

          {/* Conversation */}
          <div className="flex items-center justify-between rounded-xl bg-zinc-800 px-4 py-4">

            <div className="flex items-center gap-3">

              <MessageSquare
                size={18}
                className="text-cyan-400"
              />

              <span className="font-medium">
                Conversation
              </span>

            </div>

            <span className="rounded-full bg-cyan-500 px-2 py-1 text-xs font-bold text-black">
              {messageCount}
            </span>

          </div>

          {/* Clear Chat */}
          <button
            onClick={onClearChat}
            className="flex w-full items-center gap-3 rounded-xl bg-zinc-800 px-4 py-4 transition duration-300 hover:bg-red-500 hover:text-white"
          >

            <Trash2 size={18} />

            Clear Chat

          </button>

          {/* Settings */}
          <button
            onClick={() =>
              alert("⚙️ Settings will be available in Version 2.")
            }
            className="flex w-full items-center gap-3 rounded-xl bg-zinc-800 px-4 py-4 transition duration-300 hover:bg-zinc-700"
          >

            <Settings size={18} />

            Settings

          </button>

        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
            R
          </div>

          <div>

            <p className="font-medium">
              ResearchMind AI
            </p>

            <p className="text-xs text-zinc-500">
              Version 1.0
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}