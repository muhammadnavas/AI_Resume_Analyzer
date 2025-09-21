import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    Award,
    BarChart3,
    FileText,
    Search,
    Star,
    Target,
    TrendingUp,
    Users,
    Zap,
    RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { RAGService } from '../services/ragService';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [ragService, setRagService] = useState(null);

  // Initialize RAG Service
  useEffect(() => {
    const initializeRAG = async () => {
      try {
        // Get API key from localStorage or environment
        const apiKey = localStorage.getItem('geminiApiKey') || process.env.REACT_APP_GEMINI_API_KEY;
        if (apiKey) {
          const rag = new RAGService(apiKey);
          setRagService(rag);
          await loadDynamicStats(rag);
        } else {
          // Fallback to default stats if no API key
          setStats(getDefaultStats());
          setIsLoadingStats(false);
        }
      } catch (error) {
        console.error('Error initializing RAG service:', error);
        setStats(getDefaultStats());
        setIsLoadingStats(false);
      }
    };

    initializeRAG();
  }, []);

  const loadDynamicStats = async (ragServiceInstance) => {
    try {
      setIsLoadingStats(true);
      const dynamicStats = await ragServiceInstance.generateDashboardStats();
      
      // Map icons correctly
      const statsWithIcons = dynamicStats.map(stat => ({
        ...stat,
        icon: getIconComponent(stat.icon)
      }));
      
      setStats(statsWithIcons);
    } catch (error) {
      console.error('Error loading dynamic stats:', error);
      setStats(getDefaultStats());
    } finally {
      setIsLoadingStats(false);
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      'users': Users,
      'award': Award,
      'trending-up': TrendingUp,
      'star': Star
    };
    return iconMap[iconName] || Users;
  };

  const getDefaultStats = () => [
    { icon: Users, label: 'Resumes Analyzed', value: '500+' },
    { icon: Award, label: 'Success Rate', value: '89%' },
    { icon: TrendingUp, label: 'Career Growth', value: '35%' },
    { icon: Star, label: 'User Rating', value: '4.7/5' }
  ];

  const refreshStats = async () => {
    if (ragService) {
      await loadDynamicStats(ragService);
    }
  };
  const features = [
    {
      icon: FileText,
      title: 'Resume Analysis',
      description: 'AI-powered analysis of your resume with detailed insights on strengths, weaknesses, and improvement suggestions.',
      link: '/analyzer',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Search,
      title: 'Job Scraper',
      description: 'Automated job scraping from LinkedIn with intelligent matching based on your profile and skills.',
      link: '/scraper',
      color: 'from-green-500 to-teal-600'
    }
  ];

  const stats = [
    { icon: Users, label: 'Resumes Analyzed', value: '1000+' },
    { icon: Award, label: 'Success Rate', value: '95%' },
    { icon: TrendingUp, label: 'Career Growth', value: '40%' },
    { icon: Star, label: 'User Rating', value: '4.9/5' }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Get comprehensive resume analysis in seconds with AI-powered insights.'
    },
    {
      icon: Target,
      title: 'Job Matching',
      description: 'Find perfect job matches based on your skills and experience.'
    },
    {
      icon: BarChart3,
      title: 'Performance Metrics',
      description: 'Track your resume\'s performance and improvement over time.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-blue-600/20 bg-[length:60px_60px] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_2px,transparent_2px)]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              AI-Powered Resume
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                Analyzer
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your career with GenAI-powered resume analysis. Get instant feedback, 
              professional insights, and job recommendations to boost your hiring success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/analyzer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Analyze Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/scraper"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-semibold rounded-2xl text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10"
              >
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/90 backdrop-blur-md py-12 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="mx-auto w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Powerful Features for Career Success
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need to optimize your resume and accelerate your job search
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 border border-white/50"
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.color} mb-4 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 text-sm">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Why Choose Our AI Resume Analyzer?
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Built for the GenAI Hackathon 2025 with cutting-edge technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="mx-auto w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Join thousands of professionals who have enhanced their resumes with our AI-powered platform.
          </p>
          <Link
            to="/analyzer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-2xl text-blue-600 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Analyzing Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025 AI Resume Analyzer - GenAI Hackathon Project
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Built with React, Google Gemini, and advanced PDF processing
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;