import os
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings


def get_embedding_model():
    return HuggingFaceInferenceAPIEmbeddings(
        api_key=os.getenv("HUGGINGFACEHUB_API_TOKEN"),
        model_name="BAAI/bge-small-en-v1.5",
    )