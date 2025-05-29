FROM python:3.10-slim

WORKDIR /app

COPY backend/runner.py .

ENTRYPOINT ["python", "runner.py"]