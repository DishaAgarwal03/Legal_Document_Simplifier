from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.summarizer_service import generate_summary_from_pdf

router = APIRouter()

@router.post("/summarize", summary="Summarize a legal contract PDF")
async def summarize_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    try:
        # You can read file content as bytes (this works for small to medium PDFs)
        file_bytes = await file.read()
        # Pass the bytes wrapped in an in-memory file-like object (e.g., io.BytesIO)
        from io import BytesIO
        pdf_file = BytesIO(file_bytes)
        summary = generate_summary_from_pdf(pdf_file)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
