from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_text(text: str):
    """
    Split extracted text into semantically meaningful chunks.
    Optimized for research papers and lecture slides.
    """

    splitter = RecursiveCharacterTextSplitter(

        chunk_size=1200,

        chunk_overlap=250,

        separators=[
            "\n\n",   # paragraphs
            "\n",     # lines
            ". ",     # sentences
            " ",      # words
            ""
        ]
    )

    chunks = splitter.split_text(text)

    # Remove tiny / useless chunks
    cleaned_chunks = []

    for chunk in chunks:

        chunk = chunk.strip()

        if len(chunk) > 120:
            cleaned_chunks.append(chunk)

    return cleaned_chunks