# AI Resume Analyzer & Career Optimizer

**Modern AI-Powered Resume Analysis with Google Gemini**

This is an advanced React-based application that leverages Google Gemini AI for comprehensive resume analysis and career optimization. The application provides instant feedback, professional insights, job recommendations, and detailed scoring to help job seekers enhance their resumes and accelerate career growth.

<br />

**Table of Contents**

1. [Key Technologies](#key-technologies)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Configuration](#api-configuration)
6. [Project Structure](#project-structure)
7. [Contributing](#contributing)
8. [License](#license)

<br />

## **Key Technologies**

### Frontend Stack
- **React 18** - Modern React with hooks and functional components
- **JavaScript ES6+** - Latest JavaScript features and async/await patterns
- **Tailwind CSS** - Utility-first CSS framework with custom glassmorphism effects
- **React Router** - Client-side routing for seamless navigation
- **Lucide React** - Modern SVG icon library

### AI & Document Processing
- **Google Gemini 1.5 Flash** - Advanced language model for resume analysis
- **PDF.js (pdfjs-dist)** - Client-side PDF text extraction and processing
- **Mammoth.js** - DOCX document processing for Word files
- **React Dropzone** - Drag & drop file upload with validation

### Additional Libraries
- **React Hot Toast** - Beautiful notification system
- **Custom Vector Service** - Browser-compatible text similarity search

<br />

## **Features**

### 🎯 **Comprehensive Resume Analysis**
- **Multi-format Support**: Processes both PDF and DOCX resume files
- **AI-Powered Insights**: Uses Google Gemini for intelligent analysis
- **Professional Rating System**: Detailed 10-point scoring across:
  - Content Quality & Clarity
  - Structure & Organization
  - Visual Formatting & Design
  - Achievement Impact & Quantification
  - ATS Compatibility & Optimization  
  - Experience Description
  - Achievement Highlights
  - Education & Certifications
  - Overall Professional Impact

### 📊 **Intelligent Analysis Features**
- **Professional Summary Generation**: AI-crafted summary optimized for ATS systems
- **Strength Identification**: Highlights key professional strengths with examples
- **Improvement Recommendations**: Actionable feedback for resume enhancement
- **Job Title Suggestions**: Career-appropriate position recommendations
- **Detailed Scoring**: Comprehensive breakdown with grade classification

### 💼 **Career Optimization Tools**
- **LinkedIn Job Scraper**: Automated job discovery and matching (demo available)
- **Skills Gap Analysis**: Identifies missing skills for target positions
- **Industry Insights**: Current market trends and requirements
- **ATS Optimization**: Ensures resume passes applicant tracking systems

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for all devices and screen sizes
- **Drag & Drop Interface**: Intuitive file upload with instant validation
- **Progress Indicators**: Real-time feedback during document processing
- **Tabbed Navigation**: Organized results in easily accessible sections
- **Export Functionality**: Download complete analysis as text reports
- **Status Indicators**: Visual feedback for API connectivity and file upload

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
git clone https://github.com/gopiashokan/AI-Resume-Analyzer-and-LinkedIn-Scraper-using-Generative-AI.git
cd AI-Resume-Analyzer-and-LinkedIn-Scraper-using-Generative-AI
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

4. **Start the development server:**
```bash
npm start
```

5. **Open your browser:**
Navigate to `http://localhost:3000`

<br />

## **Usage**

### Getting Started

1. **Launch the Application**
   - Run `npm start` and open `http://localhost:3000`
   - The application will load with a welcome dashboard

2. **Add Your OpenAI API Key**
   - Navigate to the Resume Analyzer
   - Enter your OpenAI API key when prompted
   - The key is stored locally in your browser

3. **Upload Your Resume**
   - Drag and drop your PDF resume or click to browse
   - Supported format: PDF only (max 10MB)
   - The system validates and processes the file

4. **Get Instant Analysis**
   - Click "Analyze Resume" to start the AI processing
   - View comprehensive results across multiple tabs:
     - **Summary**: Overall resume overview
     - **Strengths**: Key advantages and highlights
     - **Improvements**: Areas for enhancement
     - **Job Suggestions**: Recommended job titles
     - **Rating**: Detailed scoring breakdown

5. **Export Your Results**
   - Download a complete analysis report
   - Use insights to improve your resume
   - Track progress over time

### Advanced Features

#### Resume Rating System
The application provides detailed scoring across six key areas:
- **Content Quality** (1-10): Relevance and depth of information
- **Skills Presentation** (1-10): Technical and soft skills showcase
- **Experience Description** (1-10): Work experience quality
- **Achievement Highlights** (1-10): Quantifiable accomplishments
- **Education & Certifications** (1-10): Educational background relevance  
- **Overall Professional Impact** (1-10): Overall profile appeal

#### Professional Summary Generation
Automatically creates compelling 2-3 sentence summaries highlighting:
- Years of experience and expertise areas
- Most impressive qualifications
- Key skills and achievements
- Professional confidence and impact

<br />

## **API Integration**

### OpenAI Configuration

The application uses OpenAI's GPT-3.5 Turbo model with optimized prompts for:

```javascript
// Example API integration
const analyzer = new ResumeAnalyzer(apiKey);
const analysis = await analyzer.performCompleteAnalysis(textChunks);
```

### Supported Analysis Types

1. **Resume Summary**: Comprehensive overview of candidate profile
2. **Strengths Analysis**: Key advantages with supporting evidence  
3. **Weakness Analysis**: Improvement areas with actionable advice
4. **Job Title Suggestions**: Career opportunities based on background
5. **Professional Summary**: Concise resume top-line summary
6. **Resume Rating**: Multi-criteria scoring system

### Error Handling

The application includes robust error handling for:
- Invalid API keys
- Network connectivity issues
- PDF processing errors
- File format/size validation
- Rate limiting and timeouts

<br />

## **Project Structure**

```
src/
├── components/           # Reusable UI components
│   ├── Header.js        # App header with navigation
│   ├── Sidebar.js       # Navigation sidebar
│   └── FileUpload.js    # PDF upload component
├── pages/               # Main application pages  
│   ├── Dashboard.js     # Landing page
│   ├── ResumeAnalyzer.js # Resume analysis interface
│   └── JobScraper.js    # Job search interface
├── services/            # Business logic and API calls
│   ├── pdfProcessor.js  # PDF text extraction
│   └── resumeAnalyzer.js # OpenAI integration
├── context/             # React context for state management
│   └── ApiKeyContext.js # API key management
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

### Key Components

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

## **Development**

### Available Scripts

- `npm start` - Start development server
- `npm build` - Create production build  
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Environment Variables

```bash
# .env file configuration
REACT_APP_OPENAI_API_ENDPOINT=https://api.openai.com/v1
REACT_APP_VERSION=1.0.0
REACT_APP_MAX_FILE_SIZE=10485760
GENERATE_SOURCEMAP=false
```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

<br />

**Contributing**

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request.

<br />

**License**

This project is licensed under the MIT License. Please review the LICENSE file for more details.

<br />

**Contact**

📧 Email: gopiashokankiot@gmail.com 

🌐 LinkedIn: [linkedin.com/in/gopiashokan](https://www.linkedin.com/in/gopiashokan)

For any further questions or inquiries, feel free to reach out. We are happy to assist you with any queries.

