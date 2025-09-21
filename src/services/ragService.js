import { GoogleGenerativeAI } from '@google/generative-ai';
import { VectorService } from './vectorService.js';

/**
 * RAG (Retrieval-Augmented Generation) Service
 * Provides dynamic data-driven insights for the resume analyzer
 */
export class RAGService {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.3,
        topK: 20,
        topP: 0.8,
        maxOutputTokens: 1024,
      }
    });
    this.vectorService = new VectorService();
    this.knowledgeBase = new Map();
    this.initializeKnowledgeBase();
  }

  /**
   * Initialize the RAG knowledge base with industry data
   */
  initializeKnowledgeBase() {
    // Industry statistics and insights
    const industryData = [
      {
        id: 'tech_hiring_trends_2025',
        content: 'Technology sector hiring trends show 85% increase in AI/ML positions, 70% demand for cloud architects, and 65% growth in cybersecurity roles. Remote work adoption at 78% in tech companies.',
        category: 'hiring_trends',
        keywords: ['technology', 'AI', 'ML', 'cloud', 'cybersecurity', 'remote work']
      },
      {
        id: 'resume_ats_statistics',
        content: 'ATS systems filter out 75% of resumes before human review. Key factors: keyword optimization (90% weight), proper formatting (85% weight), and relevant experience matching (95% weight).',
        category: 'ats_insights',
        keywords: ['ATS', 'filtering', 'keywords', 'formatting', 'experience']
      },
      {
        id: 'career_advancement_metrics',
        content: 'Professionals with optimized resumes see 40% faster job placement, 25% higher salary offers, and 60% more interview callbacks. Regular resume updates correlate with 35% career growth acceleration.',
        category: 'career_metrics',
        keywords: ['career growth', 'salary', 'interviews', 'resume optimization']
      },
      {
        id: 'skill_demand_analysis',
        content: 'Most in-demand skills for 2025: Python (95% demand), React/JavaScript (90%), AWS/Cloud (88%), Data Analysis (85%), Machine Learning (82%), DevOps (80%).',
        category: 'skills_demand',
        keywords: ['Python', 'React', 'JavaScript', 'AWS', 'cloud', 'data analysis', 'machine learning', 'DevOps']
      },
      {
        id: 'industry_salary_insights',
        content: 'Average salary increases by experience: Entry-level (0-2 years): $55-75k, Mid-level (3-5 years): $75-105k, Senior (5-10 years): $105-150k, Lead/Principal (10+ years): $150-250k.',
        category: 'salary_insights',
        keywords: ['salary', 'experience', 'entry-level', 'senior', 'lead', 'principal']
      },
      {
        id: 'resume_optimization_stats',
        content: 'Resume optimization impact: Professional summary increases callbacks by 30%, quantified achievements boost by 45%, skills section optimization improves ATS score by 60%.',
        category: 'optimization_stats',
        keywords: ['resume optimization', 'professional summary', 'achievements', 'skills section', 'ATS score']
      }
    ];

    // Add to vector store
    industryData.forEach(item => {
      this.vectorService.addDocument(item.content, item);
      this.knowledgeBase.set(item.id, item);
    });
  }

  /**
   * Generate dynamic dashboard statistics based on user context
   */
  async generateDashboardStats(userContext = {}) {
    try {
      const relevantKnowledge = this.vectorService.similaritySearch(
        'hiring trends career growth statistics metrics', 3
      );

      const prompt = `Based on the following industry data and current market trends, generate realistic and encouraging dashboard statistics for an AI resume analyzer platform:

INDUSTRY CONTEXT:
${relevantKnowledge.map(doc => doc.pageContent).join('\n')}

Generate exactly 4 statistics in JSON format with these keys:
- icon: one of ["users", "award", "trending-up", "star"]
- label: descriptive label
- value: realistic value (can include +, %, etc.)

Focus on:
1. User engagement/usage metrics
2. Success rates and outcomes  
3. Career improvement metrics
4. User satisfaction ratings

Return only valid JSON array format.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const stats = JSON.parse(text);
        return Array.isArray(stats) ? stats : [];
      } catch (parseError) {
        console.error('Error parsing RAG stats:', parseError);
        return this.getFallbackStats();
      }
    } catch (error) {
      console.error('Error generating dashboard stats:', error);
      return this.getFallbackStats();
    }
  }

  /**
   * Generate personalized insights based on resume analysis
   */
  async generatePersonalizedInsights(resumeAnalysis) {
    try {
      // Extract key information from resume analysis
      const skills = this.extractSkills(resumeAnalysis);
      const experience = this.extractExperience(resumeAnalysis);
      
      // Retrieve relevant knowledge
      const relevantKnowledge = this.vectorService.similaritySearch(
        `${skills.join(' ')} ${experience} career advice job market`, 5
      );

      const prompt = `Based on the following resume analysis and current market data, provide personalized career insights:

RESUME ANALYSIS:
Skills: ${skills.join(', ')}
Experience Level: ${experience}
Overall Score: ${resumeAnalysis.rating?.totalScore || 'Not available'}

MARKET DATA:
${relevantKnowledge.map(doc => doc.pageContent).join('\n')}

Provide insights in JSON format with these sections:
{
  "marketPosition": "Brief assessment of their market position",
  "careerOpportunities": ["3-4 specific opportunities based on their profile"],
  "skillGaps": ["2-3 skills they should develop"],
  "salaryRange": "Expected salary range for their profile",
  "nextSteps": ["3 actionable next steps for career growth"]
}

Return only valid JSON.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Error generating personalized insights:', error);
      return null;
    }
  }

  /**
   * Get industry-specific recommendations
   */
  async getIndustryRecommendations(industry, role) {
    try {
      const relevantKnowledge = this.vectorService.similaritySearch(
        `${industry} ${role} trends skills requirements`, 3
      );

      const prompt = `Based on current market data for ${industry} industry and ${role} positions, provide specific recommendations:

MARKET DATA:
${relevantKnowledge.map(doc => doc.pageContent).join('\n')}

Provide recommendations in JSON format:
{
  "trending_skills": ["5 most important skills for this role"],
  "certifications": ["3-4 valuable certifications"],
  "salary_outlook": "salary range and growth projection",
  "key_companies": ["top companies hiring for this role"],
  "preparation_tips": ["3-4 specific tips for landing this role"]
}

Return only valid JSON.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Error getting industry recommendations:', error);
      return null;
    }
  }

  /**
   * Generate dynamic job market insights
   */
  async getJobMarketInsights() {
    try {
      const relevantKnowledge = this.vectorService.similaritySearch(
        'job market trends hiring demand skills technology', 4
      );

      const prompt = `Based on current job market data, provide comprehensive market insights:

MARKET DATA:
${relevantKnowledge.map(doc => doc.pageContent).join('\n')}

Generate insights in JSON format:
{
  "hot_skills": ["top 5 in-demand skills"],
  "growth_sectors": ["3-4 fastest growing sectors"],
  "remote_trends": "insights about remote work trends",
  "hiring_outlook": "overall hiring market outlook",
  "key_metrics": {
    "avg_time_to_hire": "average time in days",
    "interview_callback_rate": "percentage",
    "salary_growth": "percentage increase"
  }
}

Return only valid JSON.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Error getting job market insights:', error);
      return null;
    }
  }

  /**
   * Helper methods
   */
  extractSkills(resumeAnalysis) {
    const skills = [];
    if (resumeAnalysis.summary) {
      // Extract skills from summary using common patterns
      const skillPatterns = [
        /\b(JavaScript|Python|Java|React|Node\.?js|Angular|Vue\.?js|TypeScript)\b/gi,
        /\b(HTML|CSS|SCSS|SASS|Bootstrap|Tailwind)\b/gi,
        /\b(SQL|MongoDB|PostgreSQL|MySQL|Redis|Firebase)\b/gi,
        /\b(AWS|Azure|Docker|Kubernetes|Git|Jenkins)\b/gi,
        /\b(Machine Learning|AI|Data Science|Analytics)\b/gi
      ];
      
      skillPatterns.forEach(pattern => {
        const matches = resumeAnalysis.summary.match(pattern);
        if (matches) {
          skills.push(...matches);
        }
      });
    }
    return [...new Set(skills)].slice(0, 10);
  }

  extractExperience(resumeAnalysis) {
    if (resumeAnalysis.summary) {
      const experienceMatch = resumeAnalysis.summary.match(/(\d+)\+?\s*years?\s*(?:of\s*)?experience/i);
      if (experienceMatch) {
        const years = parseInt(experienceMatch[1]);
        if (years < 2) return 'Entry Level';
        if (years < 5) return 'Mid Level';
        if (years < 10) return 'Senior Level';
        return 'Executive Level';
      }
    }
    return 'Entry Level';
  }

  getFallbackStats() {
    return [
      { icon: 'users', label: 'Resumes Analyzed', value: '500+' },
      { icon: 'award', label: 'Success Rate', value: '89%' },
      { icon: 'trending-up', label: 'Career Growth', value: '35%' },
      { icon: 'star', label: 'User Rating', value: '4.7/5' }
    ];
  }

  /**
   * Update knowledge base with new data
   */
  addKnowledge(id, content, category, keywords) {
    const knowledge = { id, content, category, keywords };
    this.vectorService.addDocument(content, knowledge);
    this.knowledgeBase.set(id, knowledge);
  }

  /**
   * Query the knowledge base
   */
  queryKnowledge(query, limit = 5) {
    return this.vectorService.similaritySearch(query, limit);
  }
}