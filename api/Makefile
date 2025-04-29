.PHONY: install run fmt lint

install:
	python3 -m venv .venv
	source .venv/bin/activate && pip install -r requirements.txt

run:
	uvicorn altmuse.main:app --reload --port 8000

fmt:
	ruff altmuse --fix

lint:
	mypy altmuse