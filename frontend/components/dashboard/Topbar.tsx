"use client";

import { CheckCircle2, FileText } from "lucide-react";

interface Props {
  documentName?: string;
}

export default function Topbar({
  documentName = "No document uploaded",
}: Props) {
  return (
    <header className="flex h-24 items-center justify-between border-b border-zinc-800 bg-[#0B0B0F] px-10">

      {/* Left */}
      <div>

        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-zinc-500">
          Upload research papers and chat with AI.
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Active Document */}
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3">

          <div className="rounded-xl bg-cyan-500/15 p-2">

            <FileText
              size={20}
              className="text-cyan-400"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Active Document
            </p>

            <p className="max-w-[220px] truncate text-sm font-medium">
              {documentName}
            </p>

          </div>

        </div>

        {/* Backend Status */}
        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">

          <CheckCircle2
            size={18}
            className="text-green-400"
          />

          <span className="text-sm text-green-300">
            Backend Online
          </span>

        </div>

      </div>

    </header>
  );
}