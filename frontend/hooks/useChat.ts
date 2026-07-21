"use client";

import { useState } from "react";
import { askQuestion } from "@/lib/api";
import { Message } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(question: string) {
    if (!question.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await askQuestion(question);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
      };

      // Add AI response
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "❌ Failed to contact the AI backend.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
  }

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
}