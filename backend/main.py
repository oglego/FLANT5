from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from vector_store import get_relevant_chunks, store_file
from llm_chain import get_answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")  # NEW
    content = await file.read()
    
    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError:
        print("⚠️ Could not decode file as UTF-8")
        return {"error": "Could not decode file as UTF-8 text."}

    print(f"File content length: {len(text)}")  # NEW
    store_file(text, filename=file.filename)
    print(f"Stored file: {file.filename}")  # NEW
    return {"message": f"{file.filename} uploaded and processed."}


@app.post("/ask")
async def ask_question(request: Request):
    data = await request.json()
    question = data.get("question", "")
    chunks = get_relevant_chunks(question)
    answer = get_answer(question, chunks)
    return JSONResponse({"answer": answer, "sources": chunks})
