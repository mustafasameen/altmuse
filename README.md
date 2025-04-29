# AltMuse

**AltMuse** is a FastAPI service for simplifying text to make it more accessible for people with cognitive disabilities. It provides:

1. A web interface (via FastAPI) with interactive docs at `/docs` and `/redoc`  
2. A `POST /simplify/` endpoint to transform complex text into simple, clear language

---

## Quickstart

1. **Clone & navigate**  
   ```bash
   git clone https://github.com/mustafasameen/altmuse.git
   cd altmuse/api
   ```

2. **Configure**  
   ```bash
   cp .env.example .env
   # Fill in:
   #   GROQ_API_KEY       – your Groq API key
   ```

3. **Install & run**  
   ```bash
   # Option A: Local Python
   make install     # creates .venv & installs deps
   make run         # starts Uvicorn on http://localhost:8000

   # Option B: Docker
   # Install Docker Desktop app
   cd ..
   docker-compose up
   ```

4. **Explore the docs**  
   - Swagger UI:  http://localhost:8000/docs  
   - Redoc:       http://localhost:8000/redoc  

---

## API Reference

### POST `/simplify/`

Simplify a block of text.

- **Request body** (`application/json`):

  ```json
  {
    "text": "Your complex text here"
  }
  ```

- **Response** (`application/json`):

  ```json
  {
    "original_text": "Your complex text here",
    "simplified_text": "Your simplified text here"
  }
  ```

---

## Example Usage

```bash
curl -X POST http://localhost:8000/simplify/ \
  -H "Content-Type: application/json" \
  -d '{"text": "The complex text you want to simplify"}'
```

---

## Single Test Script

We provide `test_simplify.py` to exercise the `/simplify/` endpoint:

```bash
# Ensure the API is running, then:
python test_simplify.py "This is some complex text."
# Or pass a file:
python test_simplify.py --file path/to/text.txt
```

The script will print out both the original and simplified text.

## Development

- **Format:** `make fmt`  
- **Type check:** `make lint`  
- **Run server:** `make run`  

## Architecture

AltMuse uses:
- **FastAPI** for the web API
- **Groq** LLM API for rewriting descriptions in simpler language
- **Docker Compose** for orchestrating the service
