from transformers import pipeline

qa_pipeline = pipeline("text2text-generation", model="google/flan-t5-base")

def get_answer(question, context_chunks):
    context = "\n".join(context_chunks)
    prompt = f"Answer the question based on context:\nContext: {context}\nQuestion: {question}"
    result = qa_pipeline(prompt, max_new_tokens=150)
    return result[0]["generated_text"]
