from pathlib import Path
from langchain_community.vectorstores import Chroma

from app.services.embedding_service import get_embedding_model

# Root folder for all vector databases
CHROMA_ROOT = Path("chroma_db")
CHROMA_ROOT.mkdir(exist_ok=True)

# Stores the currently active database name
ACTIVE_DB_FILE = Path("active_db.txt")


def create_vector_database(chunks, db_name: str):
    """
    Create a new Chroma database for the uploaded PDF
    and make it the active database.
    """

    embeddings = get_embedding_model()

    db_directory = CHROMA_ROOT / db_name

    # Delete previous DB with same name if it exists
    if db_directory.exists():
        import shutil
        shutil.rmtree(db_directory)

    db = Chroma.from_texts(
        texts=chunks,
        embedding=embeddings,
        persist_directory=str(db_directory),
    )

    # Save currently active database
    ACTIVE_DB_FILE.write_text(db_name)

    return db


def get_active_database():

    if not ACTIVE_DB_FILE.exists():
        return None

    db_name = ACTIVE_DB_FILE.read_text().strip()

    if not db_name:
        return None

    db_directory = CHROMA_ROOT / db_name

    if not db_directory.exists():
        return None

    embeddings = get_embedding_model()

    return Chroma(
        persist_directory=str(db_directory),
        embedding_function=embeddings,
    )


def search_documents(query: str):

    db = get_active_database()

    if db is None:
        return []

    # Maximum Marginal Relevance retrieval
    retriever = db.as_retriever(
        search_type="mmr",
        search_kwargs={
            "k": 8,
            "fetch_k": 20,
        },
    )

    docs = retriever.invoke(query)

    return docs