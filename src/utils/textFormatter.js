/**
 * Text formatter utility for cleaning and formatting AI-generated text
 */

export class TextFormatter {
  /**
   * Format text by removing markdown formatting and improving readability
   * @param {string} text - Raw text from AI
   * @returns {string} - Formatted text
   */
  static formatAnalysisText(text) {
    if (!text) return '';

    let formatted = text;

    // Remove markdown bold formatting (**text**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '$1');
    
    // Remove markdown italic formatting (*text*)
    formatted = formatted.replace(/\*(.*?)\*/g, '$1');
    
    // Remove markdown headers (# ## ###)
    formatted = formatted.replace(/^#{1,6}\s+/gm, '');
    
    // Clean up multiple consecutive spaces
    formatted = formatted.replace(/\s{3,}/g, '  ');
    
    // Clean up multiple consecutive newlines
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    // Trim whitespace
    formatted = formatted.trim();

    return formatted;
  }

  /**
   * Convert text with section headers to JSX with proper formatting
   * @param {string} text - Text with section headers
   * @returns {Array} - Array of section objects
   */
  static formatAsJSXSections(text) {
    if (!text) return [];

    const sections = [];
    const lines = text.split('\n');
    let currentSection = { header: '', content: [] };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Check if this is a section header (all caps, numbered, or ends with colon)
      const isHeader = (
        trimmedLine.match(/^[0-9]+\.\s*[A-Z\s&]+:?$/) || // Numbered headers like "1. TECHNICAL SKILLS:"
        trimmedLine.match(/^[A-Z\s&]+:$/) ||              // All caps headers like "TECHNICAL SKILLS:"
        trimmedLine.match(/^[A-Z\s&]+\s*\([^)]+\):?$/) || // Headers with parentheses
        trimmedLine.match(/^[A-Z][A-Z\s&]+ (OR|AND) [A-Z\s&]+:?$/) // Multi-word headers
      );

      if (isHeader && trimmedLine.length > 0) {
        // Save previous section if it has content
        if (currentSection.header || currentSection.content.length > 0) {
          sections.push({ ...currentSection });
        }
        // Start new section
        currentSection = {
          header: trimmedLine.replace(/^[0-9]+\.\s*/, '').replace(/:$/, ''),
          content: []
        };
      } else if (trimmedLine.length > 0) {
        // Process content - split long paragraphs into smaller, digestible points
        if (trimmedLine.length > 120) {
          // Split long paragraphs at sentence boundaries for better readability
          const sentences = trimmedLine.split(/(?<=[.!?])\s+/);
          
          // If multiple sentences, treat each as a separate point
          if (sentences.length > 1) {
            sentences.forEach(sentence => {
              if (sentence.trim().length > 0) {
                currentSection.content.push(sentence.trim());
              }
            });
          } else {
            // Single long sentence - try to break at logical points
            const parts = trimmedLine.split(/(?:,\s+(?:and|or|but|with|including|such as|for example)|\s+(?:and|or|but)\s+)/);
            if (parts.length > 1) {
              parts.forEach(part => {
                if (part.trim().length > 0) {
                  currentSection.content.push(part.trim());
                }
              });
            } else {
              currentSection.content.push(trimmedLine);
            }
          }
        } else {
          // Add shorter content as-is
          currentSection.content.push(trimmedLine);
        }
      }
    });

    // Don't forget the last section
    if (currentSection.header || currentSection.content.length > 0) {
      sections.push(currentSection);
    }

    return sections;
  }

  /**
   * Format professional summary by removing quotes and extra formatting
   * @param {string} summary - Raw summary text
   * @returns {string} - Clean summary
   */
  static formatProfessionalSummary(summary) {
    if (!summary) return '';

    let formatted = summary;
    
    // Remove quotes
    formatted = formatted.replace(/^["']|["']$/g, '');
    
    // Remove markdown formatting
    formatted = this.formatAnalysisText(formatted);
    
    // Remove any instructions or meta text
    formatted = formatted.replace(/^(Write only the professional summary|The summary should).*$/gim, '');
    
    // Clean up and trim
    formatted = formatted.trim();

    return formatted;
  }

  /**
   * Extract numeric rating from text
   * @param {string} text - Text containing a rating
   * @returns {number} - Extracted rating or 0
   */
  static extractRating(text) {
    const match = text.match(/(\d+(?:\.\d+)?)\s*\/\s*10/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Format job titles list for better display
   * @param {string} jobTitles - Raw job titles text
   * @returns {string[]} - Array of job titles
   */
  static formatJobTitles(jobTitles) {
    if (!jobTitles) return [];

    const lines = jobTitles.split('\n');
    const titles = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      // Look for job titles (usually start with numbers, bullets, or are standalone)
      if (trimmed && !trimmed.match(/^(CURRENT|GROWTH|DIFFERENT|EMERGING)/i)) {
        // Remove leading numbers, bullets, etc.
        const cleaned = trimmed
          .replace(/^[0-9]+\.\s*/, '')
          .replace(/^[-•*]\s*/, '')
          .replace(/^[:\-]\s*/, '');
        
        if (cleaned.length > 0 && !cleaned.includes('List') && !cleaned.includes('positions]')) {
          titles.push(cleaned);
        }
      }
    });

    return titles;
  }
}