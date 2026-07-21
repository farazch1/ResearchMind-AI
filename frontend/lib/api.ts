const API_URL = "http://127.0.0.1:8000";

/**
 * Upload a PDF to the backend
 */
export async function uploadPDF(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to upload PDF");
  }

  return response.json();
}

/**
 * Ask a question about the uploaded document
 */
export async function askQuestion(question: string) {
  const response = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to get AI response");
  }

  return response.json();
}

/**
 * Health check (optional)
 */
export async function healthCheck() {
  const response = await fetch(`${API_URL}/`);

  if (!response.ok) {
    throw new Error("Backend is not reachable");
  }

  return response.json();
}