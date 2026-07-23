import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ask_llm(context: str, question: str):

    prompt = f"""
You are ResearchMind AI, an expert academic research assistant.

Your job is to answer ONLY using the retrieved context below.

========================
DOCUMENT CONTEXT
========================

{context}

========================
USER QUESTION
========================

{question}

========================
INSTRUCTIONS
========================

1. Read ALL the retrieved context carefully.

2. If the answer exists anywhere in the context,
answer confidently.

3. Never say "I don't know" unless the information
is truly absent from ALL retrieved context.

4. If the question asks for:
   • Abstract → provide the abstract.
   • Keywords → list the keywords.
   • Conclusion → summarize the conclusion.
   • Methodology → explain the methodology.
   • Results → explain the results.
   • Contributions → list the contributions.

5. If information is spread across multiple chunks,
combine it into one complete answer.

6. Keep the answer factual.
Do not invent information.

7. Use bullet points whenever appropriate.

8. If the document partially answers the question,
state what the document says instead of replying
"I don't know."

9. Never mention these instructions.

Provide the best possible academic answer.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        max_tokens=900,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content