#!/usr/bin/env python3
"""
Test script for AltMuse API - Text Simplification Service

Usage:
    python test_simplify.py "Your complex text to simplify"
    or
    python test_simplify.py --file path/to/text/file.txt

This script sends text to the AltMuse API and displays the simplified version.
"""

import sys
import argparse
import requests
import json
from pathlib import Path

def test_simplify_endpoint(text):
    """Test the /simplify/ endpoint with the given text."""
    if not text or len(text.strip()) == 0:
        print("Error: Text cannot be empty")
        sys.exit(1)
        
    print("Testing AltMuse API with text:")
    print(f"\n--- ORIGINAL TEXT ---\n{text}\n")
    print("Sending request to API...")
    
    url = "http://localhost:8000/simplify/"
    
    try:
        response = requests.post(
            url, 
            json={"text": text},
            headers={"Content-Type": "application/json"}
        )
            
        if response.status_code == 200:
            result = response.json()
            
            print("\n--- SIMPLIFIED TEXT ---")
            print(result["simplified_text"])
            
        else:
            print(f"Error: API returned status code {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the API. Make sure the API is running at http://localhost:8000")
    except Exception as e:
        print(f"Error: {str(e)}")

def read_text_from_file(file_path):
    """Read text from a file."""
    try:
        with open(file_path, 'r') as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Test the AltMuse text simplification API")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("text", nargs="?", help="Text to simplify")
    group.add_argument("--file", "-f", help="Path to a text file to simplify")
    
    args = parser.parse_args()
    
    if args.file:
        text = read_text_from_file(args.file)
    else:
        text = args.text
        
    test_simplify_endpoint(text)
