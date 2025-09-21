import {
    BarChart3,
    FileText,
    Home,
    Search,
    Target,
    TrendingUp,
    X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Resume Analyzer', href: '/analyzer', icon: FileText },
    { name: 'Job Scraper', href: '/scraper', icon: Search },
  ];

  const features = [
    { name: 'Smart Analysis', icon: BarChart3 },
    { name: 'Career Insights', icon: TrendingUp },
    { name: 'Job Matching', icon: Target },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full pt-16">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-2">
            <div className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Main Navigation
              </h3>
              <div className="mt-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon 
                      className={`mr-3 h-5 w-5 transition-colors duration-200`}
                    />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Features section */}
            <div className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Features
              </h3>
              <div className="mt-2 space-y-1">
                {features.map((item) => (
                  <div
                    key={item.name}
                    className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div className="mt-auto p-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                <h4 className="text-sm font-semibold mb-2">
                  GenAI Hackathon 2025
                </h4>
                <p className="text-xs opacity-90">
                  Advanced resume analysis with AI-powered insights for better career opportunities.
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;