import os
from langchain_huggingface import HuggingFaceEndpointEmbeddings

def get_embedding_model():
    return HuggingFaceEndpointEmbeddings(
        model="BAAI/bge-small-en-v1.5",
        task="feature-extraction",
        huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_TOKEN")
    )