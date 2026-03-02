#!/bin/bash

# Script to start the FastAPI backend server

echo "🚀 Starting سمو النبلاء Dashboard Backend..."
echo ""

cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "📥 Installing requirements..."
pip install -r ../requirements.txt

# Start server
echo "✅ Starting server on http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo ""
uvicorn main:app --reload --host 0.0.0.0 --port 8000
