@echo off
echo Installing AI Resume Analyzer Dependencies...
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version

echo.
echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    pause
    exit /b 1
)

echo npm version:
npm --version

echo.
echo Installing React dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo Error: Failed to install dependencies
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

echo.
echo Creating environment file...
if not exist ".env" (
    copy ".env.example" ".env" >nul
    echo Environment file created successfully
) else (
    echo Environment file already exists
)

echo.
echo =====================================
echo Installation completed successfully!
echo =====================================
echo.
echo Next steps:
echo 1. Get your OpenAI API key from https://platform.openai.com/
echo 2. Add your API key in the application
echo 3. Run "npm start" to start the development server
echo 4. Open http://localhost:3000 in your browser
echo.
echo For production build, run "npm run build"
echo.
pause