// Browser-compatible LinkedIn job search service
// Note: This uses public APIs and search techniques instead of scraping

class LinkedInJobSearch {
  constructor() {
    this.baseUrl = 'https://www.linkedin.com/jobs/search';
  }

  // Generate LinkedIn job search URLs based on resume skills
  generateJobSearchUrls(resumeData) {
    const { skills, experience, location } = resumeData;
    
    const urls = [];
    
    // Primary skill-based searches
    if (skills && skills.length > 0) {
      const topSkills = skills.slice(0, 3);
      topSkills.forEach(skill => {
        const url = this.buildSearchUrl({
          keywords: skill,
          location: location || 'United States',
          experience: this.mapExperienceLevel(experience)
        });
        urls.push({
          skill,
          url,
          description: `Jobs requiring ${skill}`
        });
      });
    }

    // Combined skills search
    if (skills && skills.length > 1) {
      const combinedSkills = skills.slice(0, 3).join(' ');
      const url = this.buildSearchUrl({
        keywords: combinedSkills,
        location: location || 'United States',
        experience: this.mapExperienceLevel(experience)
      });
      urls.push({
        skill: 'Combined Skills',
        url,
        description: `Jobs matching multiple skills: ${skills.slice(0, 3).join(', ')}`
      });
    }

    return urls;
  }

  buildSearchUrl(params) {
    const searchParams = new URLSearchParams();
    
    if (params.keywords) {
      searchParams.append('keywords', params.keywords);
    }
    if (params.location) {
      searchParams.append('location', params.location);
    }
    if (params.experience) {
      searchParams.append('f_E', params.experience);
    }
    
    // Add some default filters for better results
    searchParams.append('f_TPR', 'r86400'); // Posted in last 24 hours
    searchParams.append('f_JT', 'F'); // Full-time jobs
    
    return `${this.baseUrl}?${searchParams.toString()}`;
  }

  mapExperienceLevel(experience) {
    if (!experience) return '2'; // Mid-level default
    
    const yearsMatch = experience.toString().match(/(\d+)/);
    if (!yearsMatch) return '2';
    
    const years = parseInt(yearsMatch[1]);
    
    if (years <= 2) return '1'; // Entry level
    if (years <= 5) return '2'; // Associate
    if (years <= 10) return '3'; // Mid-Senior
    return '4'; // Director+
  }

  // Simulate job recommendations based on resume analysis
  generateJobRecommendations(resumeData, analysisResult) {
    const recommendations = [];
    
    // Extract skills from analysis
    const skillsFromAnalysis = this.extractSkillsFromAnalysis(analysisResult);
    
    // Generate mock job data (in real app, this would come from an API)
    const jobTemplates = [
      {
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        matchingSkills: ['JavaScript', 'React', 'Node.js'],
        matchScore: 0.85
      },
      {
        title: 'Full Stack Developer',
        company: 'StartUp Inc',
        location: 'New York, NY',
        matchingSkills: ['Python', 'Django', 'PostgreSQL'],
        matchScore: 0.78
      },
      {
        title: 'Data Scientist',
        company: 'Data Analytics Co',
        location: 'Austin, TX',
        matchingSkills: ['Python', 'Machine Learning', 'SQL'],
        matchScore: 0.72
      },
      {
        title: 'Frontend Developer',
        company: 'Design Studio',
        location: 'Seattle, WA',
        matchingSkills: ['React', 'CSS', 'TypeScript'],
        matchScore: 0.68
      },
      {
        title: 'Backend Developer',
        company: 'Cloud Services Inc',
        location: 'Denver, CO',
        matchingSkills: ['Node.js', 'AWS', 'MongoDB'],
        matchScore: 0.75
      }
    ];

    // Calculate actual match scores based on resume skills
    jobTemplates.forEach(job => {
      const actualMatchScore = this.calculateMatchScore(
        skillsFromAnalysis,
        job.matchingSkills
      );
      
      recommendations.push({
        ...job,
        matchScore: actualMatchScore,
        searchUrl: this.buildSearchUrl({
          keywords: job.title,
          location: job.location.split(',')[0]
        }),
        reasoning: `Matches ${Math.round(actualMatchScore * 100)}% of your skills`
      });
    });

    // Sort by match score
    return recommendations.sort((a, b) => b.matchScore - a.matchScore);
  }

  extractSkillsFromAnalysis(analysisResult) {
    const skills = [];
    
    if (analysisResult && typeof analysisResult === 'string') {
      // Extract common technical skills from the analysis text
      const skillPatterns = [
        /\b(JavaScript|Python|Java|React|Node\.?js|Angular|Vue\.?js)\b/gi,
        /\b(HTML|CSS|SQL|MongoDB|PostgreSQL|MySQL)\b/gi,
        /\b(AWS|Azure|Docker|Kubernetes|Git)\b/gi,
        /\b(Machine Learning|AI|Data Science|Analytics)\b/gi,
        /\b(TypeScript|PHP|Ruby|Go|Rust|Swift)\b/gi,
        /\b(Express|Django|Flask|Spring|Laravel)\b/gi
      ];
      
      skillPatterns.forEach(pattern => {
        const matches = analysisResult.match(pattern);
        if (matches) {
          skills.push(...matches.map(match => match.toLowerCase()));
        }
      });
    }
    
    return [...new Set(skills)]; // Remove duplicates
  }

  calculateMatchScore(userSkills, jobSkills) {
    if (!userSkills.length || !jobSkills.length) return 0;
    
    const userSkillsLower = userSkills.map(s => s.toLowerCase());
    const jobSkillsLower = jobSkills.map(s => s.toLowerCase());
    
    const matches = jobSkillsLower.filter(skill => 
      userSkillsLower.some(userSkill => 
        userSkill.includes(skill) || skill.includes(userSkill)
      )
    );
    
    return matches.length / jobSkillsLower.length;
  }

  // Generate job titles based on skills and experience
  generateJobTitles(skills, experienceLevel) {
    const titles = [];
    
    // Web Development roles
    if (skills.some(skill => ['javascript', 'react', 'html', 'css'].includes(skill.toLowerCase()))) {
      titles.push('Frontend Developer', 'Web Developer', 'UI Developer');
      
      if (skills.some(skill => ['node.js', 'express', 'api'].includes(skill.toLowerCase()))) {
        titles.push('Full Stack Developer');
      }
    }
    
    // Backend Development roles
    if (skills.some(skill => ['node.js', 'python', 'java', 'api', 'database'].includes(skill.toLowerCase()))) {
      titles.push('Backend Developer', 'Software Engineer', 'API Developer');
    }
    
    // Data roles
    if (skills.some(skill => ['python', 'sql', 'machine learning', 'data', 'analytics'].includes(skill.toLowerCase()))) {
      titles.push('Data Analyst', 'Data Scientist', 'Machine Learning Engineer');
    }
    
    // DevOps roles
    if (skills.some(skill => ['aws', 'docker', 'kubernetes', 'cloud'].includes(skill.toLowerCase()))) {
      titles.push('DevOps Engineer', 'Cloud Engineer', 'Site Reliability Engineer');
    }
    
    // Mobile Development
    if (skills.some(skill => ['react native', 'swift', 'kotlin', 'mobile'].includes(skill.toLowerCase()))) {
      titles.push('Mobile Developer', 'iOS Developer', 'Android Developer');
    }
    
    // Default if no specific matches
    if (titles.length === 0) {
      titles.push('Software Developer', 'Software Engineer', 'Programmer');
    }
    
    return [...new Set(titles)]; // Remove duplicates
  }

  // Alternative: Use external job APIs (requires API keys)
  async searchJobsWithAPI(skills, location = 'United States') {
    // This would integrate with services like:
    // - Indeed API
    // - Glassdoor API  
    // - LinkedIn API (requires authentication)
    // - Adzuna API
    
    console.log('External API integration would go here');
    
    return {
      message: 'For production use, integrate with job search APIs like Indeed, Glassdoor, or Adzuna',
      searchUrls: this.generateJobSearchUrls({ skills, location }),
      mockResults: this.generateJobRecommendations({ skills }, `Skills: ${skills.join(', ')}`)
    };
  }

  // Browser-compatible job search that opens LinkedIn in new tabs
  async searchJobs(resumeData, maxResults = 5) {
    try {
      const { skills = [], experience } = resumeData;
      
      // Generate job titles based on skills
      const jobTitles = this.generateJobTitles(skills, experience);
      
      // Generate search URLs
      const searchUrls = this.generateJobSearchUrls(resumeData);
      
      // Generate recommendations
      const recommendations = this.generateJobRecommendations(resumeData, JSON.stringify(skills));
      
      return {
        success: true,
        jobTitles,
        searchUrls: searchUrls.slice(0, maxResults),
        recommendations: recommendations.slice(0, maxResults),
        message: 'Click the search URLs to view job listings on LinkedIn'
      };
    } catch (error) {
      console.error('Job search failed:', error);
      return {
        success: false,
        error: error.message,
        jobTitles: [],
        searchUrls: [],
        recommendations: []
      };
    }
  }
}

export { LinkedInJobSearch };

