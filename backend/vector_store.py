import os
import pickle
import faiss
from sentence_transformers import SentenceTransformer

MODEL = SentenceTransformer("all-MiniLM-L6-v2")

DOCS_PATH = "paths/docs.pkl"
INDEX_PATH = "paths/index.faiss"

def store_file(text: str, filename: str):
    # Load or create docs
    if os.path.exists(DOCS_PATH):
        with open(DOCS_PATH, "rb") as f:
            docs = pickle.load(f)
    else:
        docs = []

    # Add new doc
    docs.append({"filename": filename, "text": text})

    # Save updated docs
    with open(DOCS_PATH, "wb") as f:
        pickle.dump(docs, f)

    # Generate embeddings for all texts
    texts = [doc["text"] for doc in docs]
    embeddings = MODEL.encode(texts, show_progress_bar=False)

    dim = embeddings[0].shape[0]

    # Load or initialize FAISS index
    if os.path.exists(INDEX_PATH):
        index = faiss.read_index(INDEX_PATH)
    else:
        index = faiss.IndexFlatL2(dim)

    # Rebuild index with all docs
    index.reset()
    index.add(embeddings)

    # Save updated index
    faiss.write_index(index, INDEX_PATH)

    print(f"Stored {filename}, total docs: {len(docs)}")

def get_relevant_chunks(query: str, top_k: int = 3):
    # Load documents (list of dicts with 'text' key)
    with open(DOCS_PATH, "rb") as f:
        documents = pickle.load(f)

    # Embed the query
    query_embedding = MODEL.encode([query])

    # Load FAISS index
    index = faiss.read_index(INDEX_PATH)

    # Search index
    distances, indices = index.search(query_embedding, top_k)

    # Collect results safely (check bounds)
    results = []
    for idx in indices[0]:
        if 0 <= idx < len(documents):
            results.append(documents[idx]["text"])

    return results

