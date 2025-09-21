import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ApiKeyProvider } from './context/ApiKeyContext';
import Dashboard from './pages/Dashboard';
import JobScraper from './pages/JobScraper';
import ResumeAnalyzer from './pages/ResumeAnalyzer';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ApiKeyProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
          
          <Header 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
          />
          
          <div className="flex h-screen pt-16">
            <Sidebar 
              sidebarOpen={sidebarOpen} 
              setSidebarOpen={setSidebarOpen} 
            />
            
            <main className="flex-1 overflow-y-auto p-6 lg:ml-64">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analyzer" element={<ResumeAnalyzer />} />
                <Route path="/scraper" element={<JobScraper />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ApiKeyProvider>
  );
}

export default App;