"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import UploadBox from "@/components/upload/UploadBox";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";

import { useChat } from "@/hooks/useChat";
import { useState } from "react";

export default function DashboardPage() {
  const {
    messages,
    loading,
    sendMessage,
    clearChat,
  } = useChat();

  const [documentName, setDocumentName] = useState(
    "No document uploaded"
  );

  return (
    <main className="flex h-screen overflow-hidden bg-[#09090B] text-white">

      {/* Sidebar */}
      <Sidebar
        messageCount={messages.length}
        onClearChat={clearChat}
      />

      {/* Right Side */}
      <section className="flex flex-1 flex-col">

        {/* Topbar */}
        <Topbar
          documentName={documentName}
        />

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Upload */}
          <section
            id="upload"
            className="border-b border-zinc-800 p-6"
          >
            <UploadBox
              onUploadSuccess={(fileName) =>
                setDocumentName(fileName)
              }
            />
          </section>

          {/* Chat */}
          <section
            id="chat"
            className="flex flex-1 flex-col overflow-hidden"
          >
            <ChatWindow
              messages={messages}
              loading={loading}
            />

            <ChatInput
              onSend={sendMessage}
              disabled={
                documentName ===
                "No document uploaded"
              }
            />
          </section>

        </div>

      </section>

    </main>
  );
}