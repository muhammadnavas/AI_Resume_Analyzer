# AI Resume Analyzer & Career Optimizer

**Intelligent Resume Analysis with Google Gemini AI**

A modern React-based application that provides comprehensive resume analysis using Google Gemini AI. The application processes PDF and DOCX resumes to deliver detailed insights, scoring, and career recommendations with a beautiful, responsive interface.

<br />

**Table of Contents**

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [API Configuration](#api-configuration)
7. [Contributing](#contributing)
8. [License](#license)

<br />

## **Features**

### 🎯 **Resume Analysis Engine**
- **Multi-format Processing**: Supports PDF and DOCX file uploads
- **Google Gemini Integration**: Advanced AI analysis using Gemini 1.5 Flash
- **Comprehensive Scoring**: 10-point rating system across 5 key criteria:
  - Content Quality & Clarity
  - Structure & Organization  
  - Visual Formatting & Design
  - Achievement Impact & Quantification
  - ATS Compatibility & Optimization

### 📊 **Detailed Insights**
- **Professional Summary Generation**: AI-crafted summaries optimized for ATS
- **Strengths Analysis**: Identifies key advantages with supporting examples
- **Improvement Recommendations**: Actionable feedback for resume enhancement
- **Job Title Suggestions**: Career-appropriate position recommendations
- **Grade Classification**: Professional grading from A+ to F based on overall score

### 💼 **Job Search Integration**
- **Job Scraper Demo**: Mock job search interface with sample data
- **LinkedIn-style Results**: Professional job listing presentation
- **Industry Insights**: Career market information and trends

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Drag & Drop Upload**: Intuitive file handling with instant validation
- **Real-time Processing**: Live progress indicators during analysis
- **Tabbed Interface**: Organized results in easily navigable sections
- **Export Functionality**: Download complete analysis as formatted text reports
- **Status Indicators**: Visual feedback for API connectivity and file processing

<br />

## **Technology Stack**

### **Frontend Framework**
- **React 18** - Modern functional components with hooks
- **JavaScript ES6+** - Latest JavaScript features and async/await patterns
- **React Router 6** - Client-side routing and navigation

### **UI & Styling**
- **Tailwind CSS 3** - Utility-first CSS with custom design system
- **Lucide React** - Modern SVG icon library
- **Glassmorphism Effects** - Modern UI with backdrop blur effects
- **Responsive Design** - Mobile-first approach with breakpoint optimization

### **AI & Document Processing**
- **Google Generative AI (@google/generative-ai)** - Gemini 1.5 Flash model integration
- **PDF.js (pdfjs-dist)** - Client-side PDF text extraction
- **Mammoth.js** - Microsoft Word (.docx) document processing
- **Custom Vector Service** - Text similarity search and analysis

### **File Handling & Validation**
- **React Dropzone** - Drag and drop file upload with validation
- **Custom Document Processor** - Unified PDF/DOCX processing pipeline
- **File Type Detection** - Automatic format recognition and validation

### **State Management & Context**
- **React Context API** - Global state for API key management
- **React Hooks** - Modern state management patterns
- **Local Storage** - Secure API key persistence

### **User Experience**
- **React Hot Toast** - Beautiful notification system
- **Progress Indicators** - Real-time feedback during processing
- **Error Handling** - Comprehensive error management and user feedback

<br />

## **Installation**

### **Prerequisites**
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Google Gemini API Key** ([Get from Google AI Studio](https://makersuite.google.com/))

### **Setup Instructions**

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

<br />

## **Usage**

### **Getting Started**

1. **Launch Application**
   - Run `npm start` and navigate to `http://localhost:3000`
   - The application opens with a modern dashboard interface

2. **Configure Google Gemini API**
   - Navigate to "Resume Analyzer" section
   - Enter your Google Gemini API key when prompted
   - Key is securely stored in browser's local storage

3. **Upload Resume**
   - Use drag & drop or click to browse files
   - Supported formats: PDF and DOCX (max 10MB)
   - Real-time validation with progress indicators

4. **Get AI Analysis**
   - Click "Analyze Resume" to start processing
   - View comprehensive results across multiple tabs:
     - **Summary**: Overall resume evaluation and key insights
     - **Strengths**: Professional advantages and standout features
     - **Improvements**: Specific enhancement recommendations
     - **Job Suggestions**: AI-matched career opportunities
     - **Rating**: Detailed scoring breakdown with grade

5. **Export Results**
   - Download complete analysis as formatted text report
   - Use insights to optimize resume for ATS systems
   - Track improvement progress over multiple analyses

### **Advanced Features**

#### **Professional Rating System**
- **Content Quality (1-10)**: Information relevance, clarity, and professional impact
- **Structure & Organization (1-10)**: Logical flow and section organization
- **Visual Formatting (1-10)**: Design consistency and presentation quality
- **Achievement Impact (1-10)**: Quantified accomplishments and measurable results
- **ATS Compatibility (1-10)**: Keyword optimization and system compatibility

#### **AI-Generated Insights**
- **Professional Summary**: Compelling 2-3 sentence career overview
- **Strength Analysis**: Data-driven identification of competitive advantages
- **Improvement Roadmap**: Prioritized enhancement recommendations
- **Career Positioning**: Strategic advice for job market positioning

<br />

## **Installation**

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Google Gemini API Key** (get from [Google AI Studio](https://makersuite.google.com/))

### Quick Setup

#### Manual Installation:

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

<br />

## **Usage**

### Getting Started

1. **Launch the Application**
   - Run `npm start` and open `http://localhost:3000`
   - The application loads with a modern dashboard interface

2. **Configure Google Gemini API**
   - Navigate to the Resume Analyzer section
   - Enter your Google Gemini API key when prompted
   - The key is securely stored in your browser's local storage

3. **Upload Your Resume**
   - Drag and drop your resume file or click to browse
   - Supported formats: PDF and DOCX (max 10MB)
   - Real-time validation and progress indicators

4. **Get Instant Analysis**
   - Click "Analyze Resume" to start the AI processing
   - View comprehensive results across multiple tabs:
     - **Summary**: Overall resume overview with key insights
     - **Strengths**: Professional advantages and highlights
     - **Improvements**: Actionable enhancement recommendations
     - **Job Suggestions**: AI-matched career opportunities
     - **Rating**: Detailed 10-point scoring breakdown

5. **Export Your Results**
   - Download complete analysis as a formatted text report
   - Use insights to optimize your resume for ATS systems
   - Track improvement progress over time

### Advanced Features

#### Professional Rating System
The application provides detailed scoring across five key areas:
- **Content Quality** (1-10): Information relevance, clarity, and depth
- **Structure & Organization** (1-10): Layout and logical flow
- **Visual Formatting** (1-10): Design and presentation quality
- **Achievement Impact** (1-10): Quantified accomplishments and results
- **ATS Compatibility** (1-10): Applicant tracking system optimization

#### AI-Generated Professional Summary
Automatically creates compelling summaries highlighting:
- Years of experience and core expertise
- Most impressive qualifications and achievements
- Key technical and soft skills
- Professional value proposition

<br />

## **API Configuration**

### Google Gemini Setup

The application uses Google Gemini 1.5 Flash model for analysis:

```javascript
// Example API integration
const analyzer = new ResumeAnalyzer(geminiApiKey);
const analysis = await analyzer.performCompleteAnalysis(resumeText);
```

### Supported Analysis Features

1. **Resume Analysis**: Comprehensive professional evaluation
2. **Strength Analysis**: Professional advantages with evidence
3. **Improvement Analysis**: Enhancement opportunities with recommendations
4. **Job Suggestions**: AI-matched career opportunities
5. **Professional Summary**: Optimized resume summary generation
6. **Performance Rating**: Multi-criteria scoring with detailed breakdown

### Error Handling & Validation

The application includes comprehensive error handling for:
- Invalid API keys and authentication issues
- Network connectivity and timeout problems
- Document processing errors (PDF/DOCX)
- File format and size validation
- Rate limiting and API quota management

<br />

## **Project Structure**

```
src/
├── components/           # Reusable UI components
│   ├── FileUpload.js    # File upload with drag & drop
│   └── FormattedContent.js # Enhanced text display
├── pages/               # Main application pages  
│   ├── Dashboard.js     # Landing page with features overview
│   ├── ResumeAnalyzer.js # Resume analysis interface
│   └── JobScraper.js    # LinkedIn job search demo
├── services/            # Business logic and API integration
│   ├── documentProcessor.js  # Unified PDF/DOCX processing
│   ├── pdfProcessor.js      # PDF text extraction
│   ├── docxProcessor.js     # DOCX text extraction
│   ├── resumeAnalyzer.js    # Google Gemini integration
│   └── vectorService.js     # Text similarity search
├── utils/               # Helper utilities
│   └── textFormatter.js    # Text processing and formatting
├── context/             # React context for state management
│   └── ApiKeyContext.js    # API key management
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind CSS
```

### Key Features

#### PDF Processor (`services/pdfProcessor.js`)
- Text extraction using PDF.js
- Document chunking for AI processing
- Metadata extraction and file validation
- Basic section identification

#### Resume Analyzer (`services/resumeAnalyzer.js`)  
- OpenAI API integration
- Prompt engineering for each analysis type
- Response parsing and formatting
- Error handling and retry logic

#### File Upload (`components/FileUpload.js`)
- Drag & drop functionality
- File validation and size limits
- Progress indicators and error handling
- Visual feedback for user interactions

<br />