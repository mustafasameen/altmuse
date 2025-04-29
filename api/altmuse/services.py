from loguru import logger
from langchain_groq import ChatGroq
from .config import settings

# Groq LLM for simple language rewriting
groq = ChatGroq(api_key=settings.GROQ_API_KEY, model="gemma2-9b-it")

async def simplify_text(text: str) -> str:
    """
    Simplify text for people with cognitive disabilities using Groq LLM.
    
    Args:
        text: The original text to simplify
        
    Returns:
        The simplified version of the text
    """
    logger.info(f"ORIGINAL TEXT → {text}")
    
    # Create system prompt for text simplification
    messages = [
        ("system", "You are a helpful assistant that rewrites text in simple, clear language for people with cognitive disabilities. Follow these guidelines:\n- Use short, simple sentences\n- Avoid technical or complex terminology\n- Maintain the key details from the original text\n- Make the text accessible to readers of all ages and backgrounds\n- Use simple vocabulary and clear structure"),
        ("human", f"Rewrite this text in simple language:\n\n\"{text}\"")
    ]
    
    # Get simplified text from Groq
    ai_msg = groq.invoke(messages)
    simple = ai_msg.content.strip()
    logger.info(f"SIMPLIFIED TEXT → {simple}")
    
    return simple
