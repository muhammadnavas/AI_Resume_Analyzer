import { GoogleGenerativeAI } from '@google/generative-ai';
import { VectorService } from './vectorService';

export class ResumeAnalyzer {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    this.vectorService = new VectorService();
  }

  /**
   * Generate resume summary
   * @param {Array} chunks - Text chunks from resume
   * @returns {Promise<string>} - Generated summary
   */
  async generateSummary(chunks) {
    const prompt = this.createSummaryPrompt(chunks);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error('Failed to generate resume summary');
    }
  }

  /**
   * Analyze resume strengths
   * @param {Array} chunks - Text chunks from resume
   * @returns {Promise<string>} - Strengths analysis
   */
  async analyzeStrengths(chunks) {
    const prompt = this.createStrengthsPrompt(chunks);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error analyzing strengths:', error);
      throw new Error('Failed to analyze resume strengths');
    }
  }

  /**
   * Analyze resume weaknesses and provide improvement suggestions
   * @param {Array} chunks - Text chunks from resume
   * @returns {Promise<string>} - Weaknesses analysis and suggestions
   */
  async analyzeWeaknesses(chunks) {
    const prompt = this.createWeaknessesPrompt(chunks);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error analyzing weaknesses:', error);
      throw new Error('Failed to analyze resume weaknesses');
    }
  }

  /**
   * Suggest suitable job titles based on resume content
   * @param {Array} chunks - Text chunks from resume
   * @returns {Promise<string>} - Job title suggestions
   */
  async suggestJobTitles(chunks) {
    const prompt = this.createJobTitlesPrompt(chunks);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error suggesting job titles:', error);
      throw new Error('Failed to suggest job titles');
    }
  }

  /**
   * Generate a professional summary for the resume
   * @param {Array} chunks - Text chunks from resume
   * @returns {Promise<string>} - Professional summary
   */
  async generateProfessionalSummary(chunks) {
    const prompt = this.createProfessionalSummaryPrompt(chunks);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating professional summary:', error);
      throw new Error('Failed to generate professional summary');
    }
  }

  /**
   * Rate the resume on various criteria
   * @param {Array} chunks - Text chunks from resume
   * @returns {Promise<Object>} - Resume rating and breakdown
   */
  async rateResume(chunks) {
    const prompt = this.createRatingPrompt(chunks);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return this.parseRatingResponse(response.text());
    } catch (error) {
      console.error('Error rating resume:', error);
      throw new Error('Failed to rate resume');
    }
  }

  /**
   * Compare resume against a specific job title
   * @param {Array} chunks - Text chunks from resume
   * @param {string} jobTitle - Target job title
   * @returns {Promise<string>} - Comparison analysis
   */
  async compareWithJobTitle(chunks, jobTitle) {
    const prompt = this.createJobComparisonPrompt(chunks, jobTitle);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error comparing with job title:', error);
      throw new Error('Failed to compare resume with job title');
    }
  }

  // Prompt creation methods optimized for Gemini
  createSummaryPrompt(chunks) {
    return `You are an expert resume analyst. Please provide a detailed summarization of the following resume content and conclude with key insights:

RESUME CONTENT:
${chunks.join('\n\n')}

Please provide a comprehensive summary including:
1. Professional background and experience level
2. Key skills and technical competencies
3. Notable achievements and accomplishments
4. Education and certifications
5. Overall career trajectory and focus areas

Keep the summary professional, detailed, and insightful.`;
  }

  createStrengthsPrompt(chunks) {
    return `You are an expert career counselor. Please analyze the following resume content and identify key strengths:

RESUME CONTENT:
${chunks.join('\n\n')}

Analyze and explain the candidate's key strengths including:
1. Technical skills and expertise
2. Professional experience highlights
3. Leadership and soft skills
4. Educational qualifications
5. Unique value propositions
6. Industry knowledge and domain expertise

Provide specific examples from the resume to support each strength identified.`;
  }

  createWeaknessesPrompt(chunks) {
    return `You are an expert resume reviewer. Please analyze the following resume content and identify areas for improvement:

RESUME CONTENT:
${chunks.join('\n\n')}

Analyze potential weaknesses and provide constructive improvement suggestions:
1. Missing skills or qualifications for target roles
2. Gaps in experience or career progression
3. Presentation and formatting issues
4. Missing achievements or quantifiable results
5. Areas where additional certifications might help
6. Ways to better highlight existing strengths

Focus on actionable advice to improve the resume's effectiveness.`;
  }

  createJobTitlesPrompt(chunks) {
    return `You are an expert career advisor. Based on the following resume content, suggest suitable job titles and roles:

RESUME CONTENT:
${chunks.join('\n\n')}

Suggest 8-10 specific job titles that align with this candidate's background, including:
1. Current level positions (matching experience)
2. Growth/advancement opportunities
3. Different industries where skills could transfer
4. Emerging roles in relevant fields

For each suggestion, briefly explain why it's a good fit based on the candidate's background.`;
  }

  createProfessionalSummaryPrompt(chunks) {
    return `Create a compelling 2-3 sentence professional summary for the top of a resume based on this content:

RESUME CONTENT:
${chunks.join('\n\n')}

The summary should:
1. Highlight the most impressive qualifications
2. Mention years of experience and key areas of expertise
3. Include 2-3 most relevant skills or achievements
4. Be written in a professional, confident tone
5. Be concise but impactful (2-3 sentences maximum)

Write only the professional summary, no additional commentary.`;
  }

  createRatingPrompt(chunks) {
    return `Rate this resume on a scale of 1-10 for each criterion and provide an overall score:

RESUME CONTENT:
${chunks.join('\n\n')}

Rate the following aspects (1-10 scale):
1. Content Quality: Relevance and depth of information
2. Skills Presentation: How well technical and soft skills are showcased
3. Experience Description: Quality of work experience descriptions
4. Achievement Highlights: Presence of quantifiable accomplishments
5. Education & Certifications: Educational background relevance
5. Education & Certifications: Academic and professional credentials
6. Overall Professional Impact: How compelling the overall profile is

Format your response as:
Content Quality: X/10 - Brief explanation
Skills Presentation: X/10 - Brief explanation
Experience Description: X/10 - Brief explanation
Achievement Highlights: X/10 - Brief explanation
Education & Certifications: X/10 - Brief explanation
Overall Professional Impact: X/10 - Brief explanation

OVERALL SCORE: X/10`;
  }

  createJobComparisonPrompt(chunks, jobTitle) {
    return `Compare this resume against the requirements for a "${jobTitle}" position:

RESUME CONTENT:
${chunks.join('\n\n')}

Analyze:
1. Skills Match: Which required skills does the candidate have/lack?
2. Experience Relevance: How well does their experience align?
3. Gap Analysis: What skills or experience are missing?
4. Strengths for this Role: What makes them a strong candidate?
5. Improvement Suggestions: How to better position for this role?
6. Match Percentage: Provide an estimated match percentage (0-100%)

Be specific about technical requirements, years of experience, and industry knowledge.`;
  }

  /**
   * Parse the rating response to extract numerical scores
   * @param {string} response - Raw response from OpenAI
   * @returns {Object} - Parsed rating data
   */
  parseRatingResponse(response) {
    const ratings = {
      contentQuality: 0,
      skillsPresentation: 0,
      experienceDescription: 0,
      achievementHighlights: 0,
      educationCertifications: 0,
      overallImpact: 0,
      overallScore: 0,
      breakdown: response
    };

    try {
      // Extract individual scores using regex
      const patterns = {
        contentQuality: /Content Quality:\s*(\d+)/i,
        skillsPresentation: /Skills Presentation:\s*(\d+)/i,
        experienceDescription: /Experience Description:\s*(\d+)/i,
        achievementHighlights: /Achievement Highlights:\s*(\d+)/i,
        educationCertifications: /Education & Certifications:\s*(\d+)/i,
        overallImpact: /Overall Professional Impact:\s*(\d+)/i,
        overallScore: /OVERALL SCORE:\s*(\d+)/i
      };

      Object.keys(patterns).forEach(key => {
        const match = response.match(patterns[key]);
        if (match && match[1]) {
          ratings[key] = parseInt(match[1], 10);
        }
      });

      // Calculate overall score if not found
      if (ratings.overallScore === 0) {
        const scores = [
          ratings.contentQuality,
          ratings.skillsPresentation,
          ratings.experienceDescription,
          ratings.achievementHighlights,
          ratings.educationCertifications,
          ratings.overallImpact
        ].filter(score => score > 0);
        
        if (scores.length > 0) {
          ratings.overallScore = Math.round(scores.reduce((a, b) => a + b) / scores.length);
        }
      }
    } catch (error) {
      console.error('Error parsing rating response:', error);
    }

    return ratings;
  }

  /**
   * Perform complete resume analysis
   * @param {Array} chunks - Text chunks from resume
   * @returns {Promise<Object>} - Complete analysis results
   */
  async performCompleteAnalysis(chunks) {
    try {
      const [summary, strengths, weaknesses, jobTitles, professionalSummary, rating] = await Promise.all([
        this.generateSummary(chunks),
        this.analyzeStrengths(chunks),
        this.analyzeWeaknesses(chunks),
        this.suggestJobTitles(chunks),
        this.generateProfessionalSummary(chunks),
        this.rateResume(chunks)
      ]);

      return {
        summary,
        strengths,
        weaknesses,
        jobTitles,
        professionalSummary,
        rating,
        analyzedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error performing complete analysis:', error);
      throw new Error('Failed to complete resume analysis');
    }
  }
}