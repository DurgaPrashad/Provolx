@echo off
echo Starting Provolx Services...

echo.
echo 1. Starting AI Service (Python)...
start "AI Service" cmd /k "cd ai-service-python && python main.py"

timeout /t 5

echo.
echo 2. Starting Backend Service...
start "Backend Service" cmd /k "cd backend && npm run dev"

timeout /t 5

echo.
echo 3. Starting Frontend Service...
start "Frontend Service" cmd /k "cd frontend && npm run dev"

echo.
echo All services started! Please wait a moment for them to initialize.
echo Frontend will be available at http://localhost:5173
echo Backend API at http://localhost:3000
echo AI Service at http://localhost:8001

pause