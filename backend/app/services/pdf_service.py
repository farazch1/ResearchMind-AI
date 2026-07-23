import fitz


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract readable text from a PDF while
    preserving paragraph spacing as much as possible.
    """

    document = fitz.open(pdf_path)

    pages = []

    for page in document:

        text = page.get_text("text")

        # Clean excessive blank lines
        lines = []

        for line in text.splitlines():

            line = line.strip()

            if line:
                lines.append(line)

        page_text = "\n".join(lines)

        pages.append(page_text)

    document.close()

    return "\n\n".join(pages)