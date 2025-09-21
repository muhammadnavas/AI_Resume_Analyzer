#!/bin/bash

echo "Installing AI Resume Analyzer Dependencies..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js version:"
node --version

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

echo "npm version:"
npm --version

echo
echo "Installing React dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo
    echo "Error: Failed to install dependencies"
    echo "Please check your internet connection and try again"
    exit 1
fi

echo
echo "Creating environment file..."
if [ ! -f ".env" ]; then
    cp ".env.example" ".env"
    echo "Environment file created successfully"
else
    echo "Environment file already exists"
fi

echo
echo "====================================="
echo "Installation completed successfully!"
echo "====================================="
echo
echo "Next steps:"
echo "1. Get your OpenAI API key from https://platform.openai.com/"
echo "2. Add your API key in the application"
echo "3. Run 'npm start' to start the development server"
echo "4. Open http://localhost:3000 in your browser"
echo
echo "For production build, run 'npm run build'"
echo