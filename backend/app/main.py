from pathlib import Path
import shutil

from fastapi import FastAPI, File, UploadFile

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text

app = FastAPI(title="ResearchMind AI API")

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/")
def root():
    return {
        "message": "ResearchMind AI Backend is Running 🚀"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    # Save uploaded file
    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(str(file_path))

    # Split text into chunks
    chunks = chunk_text(extracted_text)

    # Return response
    return {
        "filename": file.filename,
        "characters": len(extracted_text),
        "chunks": len(chunks),
        "first_chunk": chunks[0] if chunks else ""
    }