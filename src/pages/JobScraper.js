import { Briefcase, Building, Clock, ExternalLink, MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const JobScraper = () => {
  const [searchData, setSearchData] = useState({
    jobTitle: '',
    location: 'India',
    count: 5
  });
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchData.jobTitle.trim()) {
      toast.error('Please enter a job title');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Searching for jobs...');

    try {
      // Simulate job search - In a real implementation, this would call a backend service
      // that uses Selenium or LinkedIn API to scrape job data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock job data for demonstration
      const mockJobs = [
        {
          id: 1,
          title: `Senior ${searchData.jobTitle}`,
          company: 'Tech Solutions Inc.',
          location: 'Bangalore, India',
          type: 'Full-time',
          postedDate: '2 days ago',
          description: `We are looking for an experienced ${searchData.jobTitle} to join our dynamic team. The ideal candidate will have strong technical skills and experience in modern development practices.`,
          url: 'https://linkedin.com/jobs/example-1'
        },
        {
          id: 2,
          title: `Junior ${searchData.jobTitle}`,
          company: 'Innovation Labs',
          location: 'Mumbai, India',
          type: 'Full-time',
          postedDate: '1 week ago',
          description: `Join our team as a ${searchData.jobTitle} and work on cutting-edge projects. We offer excellent growth opportunities and a collaborative work environment.`,
          url: 'https://linkedin.com/jobs/example-2'
        },
        {
          id: 3,
          title: `Lead ${searchData.jobTitle}`,
          company: 'Global Systems Ltd.',
          location: 'Delhi, India',
          type: 'Full-time',
          postedDate: '3 days ago',
          description: `We are seeking a lead ${searchData.jobTitle} to drive our technical initiatives and mentor junior team members.`,
          url: 'https://linkedin.com/jobs/example-3'
        }
      ].slice(0, parseInt(searchData.count));

      setJobs(mockJobs);
      toast.success(`Found ${mockJobs.length} job(s)`, { id: loadingToast });
      
    } catch (error) {
      console.error('Job search error:', error);
      toast.error('Failed to search for jobs', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Scraper</h1>
          <p className="text-gray-600">
            Search and discover job opportunities from LinkedIn based on your criteria
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Jobs</h2>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="jobTitle"
                    value={searchData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer, Data Scientist"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={searchData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Bangalore, Mumbai, Delhi"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Jobs
                </label>
                <select
                  name="count"
                  value={searchData.count}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="5">5 jobs</option>
                  <option value="10">10 jobs</option>
                  <option value="15">15 jobs</option>
                  <option value="20">20 jobs</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>{loading ? 'Searching...' : 'Search Jobs'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Demo Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-yellow-600 mt-0.5">⚠️</div>
            <div>
              <h3 className="text-sm font-medium text-yellow-800 mb-1">Demo Mode</h3>
              <p className="text-sm text-yellow-700">
                This is a demonstration of the job scraper interface. In the full implementation, 
                this would integrate with LinkedIn's job search using Selenium automation or LinkedIn's API 
                to fetch real job postings based on your search criteria.
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for jobs on LinkedIn...</p>
          </div>
        )}

        {/* Job Results */}
        {jobs.length > 0 && !loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Found {jobs.length} job{jobs.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-gray-600">
                Showing results for "{searchData.jobTitle}" in {searchData.location}
              </p>
            </div>

            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.postedDate}</span>
                      </div>
                    </div>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>View Job</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Job Description</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Posted {job.postedDate}
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {jobs.length === 0 && !loading && searchData.jobTitle && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or keywords
            </p>
          </div>
        )}

        {/* Implementation Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Implementation Details</h3>
          <div className="text-blue-800 space-y-2">
            <p>• <strong>LinkedIn Integration:</strong> Uses Selenium WebDriver for automated job scraping</p>
            <p>• <strong>Smart Filtering:</strong> Filters jobs based on relevance to search criteria</p>
            <p>• <strong>Data Extraction:</strong> Captures company names, job titles, locations, and descriptions</p>
            <p>• <strong>Rate Limiting:</strong> Implements proper delays to respect LinkedIn's usage policies</p>
            <p>• <strong>Error Handling:</strong> Robust error handling for network issues and page changes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobScraper;