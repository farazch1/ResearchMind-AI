"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { uploadPDF } from "@/lib/api";

interface Props {
  onUploadSuccess?: (fileName: string) => void;
}

export default function UploadBox({
  onUploadSuccess,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");

  async function handleUpload(file: File) {
    setLoading(true);
    setUploaded(false);

    try {
      const result = await uploadPDF(file);

      setFileName(file.name);
      setMessage(result.status);

      // Update Dashboard Topbar
      onUploadSuccess?.(file.name);

      setUploaded(true);
    } catch (err) {
      console.error(err);

      setUploaded(false);
      setMessage("Upload Failed");
    }

    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    handleUpload(file);
  }

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf"
        onChange={handleChange}
      />

      {/* BEFORE UPLOAD */}

      {!uploaded && (
        <div
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900 px-10 py-10 transition hover:border-cyan-500"
        >
          <div className="flex flex-col items-center">

            <div className="rounded-full bg-cyan-500/10 p-4">

              {loading ? (
                <Loader2
                  size={34}
                  className="animate-spin text-cyan-400"
                />
              ) : (
                <UploadCloud
                  size={34}
                  className="text-cyan-400"
                />
              )}

            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Upload Research Paper
            </h2>

            <p className="mt-3 max-w-xl text-center text-zinc-400">
              Click anywhere to upload your PDF and build your AI knowledge base.
            </p>

            {!loading && (
              <button
                type="button"
                className="mt-7 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
              >
                Choose PDF
              </button>
            )}

            {loading && (
              <p className="mt-6 text-cyan-400">
                Building Knowledge Base...
              </p>
            )}

          </div>
        </div>
      )}

      {/* AFTER UPLOAD */}

      {uploaded && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-cyan-500/10 p-3">

                <FileText
                  size={28}
                  className="text-cyan-400"
                />

              </div>

              <div>

                <h3 className="font-semibold">
                  {fileName}
                </h3>

                <p className="text-sm text-zinc-500">
                  Ready for AI conversation
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">

              <CheckCircle2
                size={18}
                className="text-green-400"
              />

              <span className="text-sm text-green-400">
                Indexed
              </span>

            </div>

          </div>

          <div className="mt-5 flex items-center gap-3">

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
            >
              Upload Another PDF
            </button>

            <span className="text-sm text-zinc-500">
              {message}
            </span>

          </div>

        </div>
      )}
    </>
  );
}