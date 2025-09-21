import { Key, Menu, Settings, X } from 'lucide-react';
import { useApiKey } from '../context/ApiKeyContext';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { isApiKeyValid, clearApiKey } = useApiKey();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-30">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side - Menu button and Logo */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden transition-colors duration-200"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center ml-4 lg:ml-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 gradient-text">
                Resume Analyzer
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                GenAI-Powered Solutions
              </p>
            </div>
          </div>
        </div>

        {/* Right side - API Key status and settings */}
        <div className="flex items-center space-x-4">
          {/* API Key Status */}
          <div className="flex items-center space-x-2">
            <Key size={16} className={isApiKeyValid ? 'text-green-500' : 'text-red-500'} />
            <span className={`text-sm font-medium ${isApiKeyValid ? 'text-green-600' : 'text-red-600'}`}>
              {isApiKeyValid ? 'API Connected' : 'API Key Required'}
            </span>
          </div>

          {/* Settings Menu */}
          {isApiKeyValid && (
            <button
              onClick={clearApiKey}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              title="Clear API Key"
            >
              <Settings size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;