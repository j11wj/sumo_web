@echo off
REM Script to start the FastAPI backend server on Windows

echo 🚀 Starting سمو النبلاء Dashboard Backend...
echo.

cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install requirements
echo 📥 Installing requirements...
pip install -r ..\requirements.txt

REM Start server
echo ✅ Starting server on http://localhost:8000
echo 📚 API Documentation: http://localhost:8000/docs
echo.
uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause
