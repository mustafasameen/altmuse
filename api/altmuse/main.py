from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from pydantic import BaseModel
from loguru import logger
from .services import simplify_text

# Define request model
class TextRequest(BaseModel):
    text: str

# Define response model
class TextResponse(BaseModel):
    original_text: str
    simplified_text: str

app = FastAPI(title="AltMuse API", 
              description="API for simplifying text for people with cognitive disabilities",
              version="1.0.0")

@app.get("/", response_class=HTMLResponse)
async def root():
    """Root endpoint that provides basic information and links to documentation."""
    return """
    <html>
        <head>
            <title>AltMuse API</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { color: #4a6baf; }
                code { background-color: #f5f5f5; padding: 2px 5px; border-radius: 3px; }
                pre { background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
                a { color: #4a6baf; }
            </style>
        </head>
        <body>
            <h1>AltMuse API</h1>
            <p>Welcome to the AltMuse API for simplifying text for people with cognitive disabilities.</p>
            
            <h2>Available Endpoints:</h2>
            <ul>
                <li><a href="/docs">/docs</a> - Interactive API documentation</li>
                <li><a href="/redoc">/redoc</a> - Alternative API documentation</li>
                <li><code>POST /simplify/</code> - Send text to get a simplified version</li>
            </ul>
            
            <h2>Example Usage:</h2>
            <pre>curl -X POST http://localhost:8000/simplify/ \\
  -H "Content-Type: application/json" \\
  -d '{"text": "The complex text you want to simplify"}' \\
  -H "accept: application/json"</pre>
        </body>
    </html>
    """

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    """Handle favicon requests to avoid 404 errors."""
    return RedirectResponse(url="https://fastapi.tiangolo.com/img/favicon.png")

@app.post("/simplify/", response_model=TextResponse)
async def simplify(request: TextRequest):
    """
    Simplify text for people with cognitive disabilities.
    
    Args:
        request: TextRequest object containing the text to simplify
        
    Returns:
        TextResponse object containing the original and simplified text
    """
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(400, "Text cannot be empty")
    
    simplified = await simplify_text(request.text)
    
    return TextResponse(
        original_text=request.text,
        simplified_text=simplified
    )
