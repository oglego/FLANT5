# FLANT5

A modern web RAG app for uploading files and chatting with an LLM about their contents.

## Features

- Upload text files via the frontend
- Ask questions about your uploaded files
- Get answers powered by an LLM (Large Language Model)
- Modern React frontend with a purple-themed UI
- FastAPI backend with file storage and vector search

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js & npm

### Backend Setup

1. Install dependencies:
    ```sh
    cd backend
    pip install -r requirements.txt
    ```
2. Run the FastAPI server:
    ```sh
    uvicorn main:app --reload
    ```

### Frontend Setup

1. Install dependencies:
    ```sh
    cd frontend/FLANT5
    npm install
    ```
2. Start the React app:
    ```sh
    npm run dev
    ```

### Usage

- Go to [http://localhost:5173](http://localhost:5173)
- Upload a text file
- Ask questions about the file in the chat interface

## Project Structure

```
backend/
  main.py
  vector_store.py
  llm_chain.py
frontend/
  FLANT5/
    src/
      App.tsx
      components/
        FileUpload.tsx
        ChatBox.tsx
    public/
    package.json
```

## Configuration

- The backend runs on port 8000 by default.
- The frontend runs on port 5173 by default.
- CORS is enabled for development.