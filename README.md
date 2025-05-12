# MochaSimplifier

MochaSimplifier is a web application designed to make text from images and PDFs more accessible, especially for individuals with cognitive disabilities. It leverages advanced OCR and language models to extract and simplify text to different reading levels.

## What It Does
- Extracts text from images and PDFs
- Simplifies extracted text to easy, medium, or original reading levels
- Provides a user-friendly interface for uploading files and selecting reading levels
- Designed for accessibility and clarity
- Shows synonyms for every word when clicked

## Features
- Supports multiple file types: PDF, PNG, JPEG, WebP, GIF, SVG
- Adjustable reading levels for simplified output
- Fast, accurate extraction and simplification
- Modern, accessible UI

## Technology
MochaSimplifier is powered by the [ocr-llm](https://github.com/arshad-yaseen/ocr-llm) library for OCR and text simplification, and uses OpenAI's vision models for high-quality results.

## Setup & Usage

### 1. Install dependencies

```sh
pnpm install
```

### 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your OpenAI API key:

```sh
cp .env.local.example .env.local
```

Edit `.env.local` and set:

```
OPENAI_API_KEY=your-openai-api-key-here
```

### 3. Build and run the app

```sh
pnpm build
pnpm dev:website
```

- The app will be available at http://localhost:3000

### 4. Dependencies

- `pluralize` and `@types/pluralize` are used to improve synonym lookup for plural words in the UI.
- See `website/package.json` for all frontend dependencies.

## Credits
- Built on top of [ocr-llm](https://github.com/arshad-yaseen/ocr-llm) by Arshad Yaseen
- Uses OpenAI's GPT-4o-mini Vision for text extraction and simplification

---

This project is focused on accessibility and clarity, making complex text easier to understand for everyone.
