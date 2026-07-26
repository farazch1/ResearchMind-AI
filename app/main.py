from pathlib import Path
import shutil

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text
from app.services.vector_db_service import (
    create_vector_database,
    search_documents,
)
from app.services.chat_service import ask_llm

app = FastAPI(
    title="ResearchMind AI API",
    version="1.0.0"
)

# -----------------------------------
# CORS
# -----------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------
# Upload Folder
# -----------------------------------

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# -----------------------------------
# Root
# -----------------------------------

@app.get("/")
def root():
    return {
        "message": "ResearchMind AI Backend is Running 🚀"
    }


# -----------------------------------
# Upload PDF
# -----------------------------------

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        return {
            "error": "Only PDF files are allowed."
        }

    # Remove previous uploaded PDFs
    for pdf in UPLOAD_DIR.glob("*.pdf"):
        pdf.unlink()

    # Save uploaded PDF
    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract Text
    extracted_text = extract_text_from_pdf(str(file_path))

    if not extracted_text.strip():
        return {
            "error": "No readable text found in this PDF."
        }

    # Chunk Text
    chunks = chunk_text(extracted_text)

    # Create Vector Database
    db_name = Path(file.filename).stem
    create_vector_database(chunks, db_name)

    return {
        "filename": file.filename,
        "characters": len(extracted_text),
        "chunks": len(chunks),
        "status": "Knowledge Base Created Successfully!"
    }


# -----------------------------------
# Request Model
# -----------------------------------

class QuestionRequest(BaseModel):
    question: str


# -----------------------------------
# Ask AI
# -----------------------------------

@app.post("/ask")
def ask_question(request: QuestionRequest):

    print("\n===================================================")
    print("QUESTION:")
    print(request.question)
    print("===================================================\n")

    # Retrieve Similar Chunks
    docs = search_documents(request.question)

    if len(docs) == 0:
        return {
            "question": request.question,
            "answer": "I couldn't find any relevant information in the uploaded document.",
            "sources_found": 0
        }

    # ---------------- DEBUG ----------------

    print("\n============== RETRIEVED CHUNKS ==============\n")

    for i, doc in enumerate(docs, start=1):

        print(f"\n----------- CHUNK {i} -----------\n")

        print(doc.page_content)

        print("\n---------------------------------\n")

    # ---------------------------------------

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    print("\n============== CONTEXT SENT TO LLM ==============\n")
    print(context)
    print("\n=================================================\n")

    # Ask LLM
    answer = ask_llm(
        context=context,
        question=request.question
    )

    print("\n============== LLM ANSWER ==============\n")
    print(answer)
    print("\n========================================\n")

    return {
        "question": request.question,
        "answer": answer,
        "sources_found": len(docs)
    }