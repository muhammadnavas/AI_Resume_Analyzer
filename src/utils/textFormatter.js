/**
 * Text formatter utility for cleaning and formatting AI-generated text
 */

export class TextFormatter {
  /**
   * Format text by preserving important markdown and improving readability
   * @param {string} text - Raw text from AI
   * @returns {string} - Formatted text
   */
  static formatAnalysisText(text) {
    if (!text) return '';

    let formatted = text;

    // Remove markdown headers (# ## ###) but preserve content
    formatted = formatted.replace(/^#{1,6}\s+/gm, '');
    
    // Clean up excessive whitespace while preserving structure
    formatted = formatted.replace(/[ \t]{3,}/g, ' ');
    
    // Normalize line breaks (max 2 consecutive)
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    // Clean up bullet points - normalize different bullet styles
    formatted = formatted.replace(/^[\s]*[-•*]\s+/gm, '• ');
    formatted = formatted.replace(/^[\s]*(\d+)[\.\)]\s+/gm, '$1. ');
    
    // Remove extra spaces at line beginnings/ends
    formatted = formatted.replace(/^[ \t]+|[ \t]+$/gm, '');
    
    // Trim overall whitespace
    formatted = formatted.trim();

    return formatted;
  }

  /**
   * Enhanced method to detect and format structured content
   * @param {string} text - Raw text content
   * @returns {Object} - Structured content object
   */
  static parseStructuredContent(text) {
    if (!text) return { type: 'text', content: '' };

    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Detect if content is primarily a list
    const listPattern = /^(?:[-•*]|\d+[\.\)])\s+/;
    const listLines = lines.filter(line => listPattern.test(line));
    const isMainlyList = listLines.length / lines.length > 0.6;

    if (isMainlyList) {
      return {
        type: 'list',
        items: lines.map(line => {
          if (listPattern.test(line)) {
            return {
              type: 'item',
              content: line.replace(listPattern, '').trim(),
              marker: line.match(listPattern)[0].trim()
            };
          } else {
            return {
              type: 'text',
              content: line
            };
          }
        })
      };
    }

    // Detect paragraphs vs single items
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    if (paragraphs.length > 1) {
      return {
        type: 'paragraphs',
        content: paragraphs.map(p => p.trim())
      };
    }

    return {
      type: 'text',
      content: text.trim()
    };
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
    let currentSection = { header: '', content: [], contentType: 'mixed' };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Enhanced header detection
      const isHeader = (
        trimmedLine.match(/^[0-9]+\.\s*[A-Z\s&\-']+:?$/) ||    // Numbered headers
        trimmedLine.match(/^[A-Z\s&\-']+:$/) ||                 // All caps headers  
        trimmedLine.match(/^[A-Z\s&\-']+\s*\([^)]+\):?$/) ||    // Headers with parentheses
        trimmedLine.match(/^[A-Z][A-Z\s&\-']+ (OR|AND|FOR) [A-Z\s&\-']+:?$/) || // Multi-word headers
        trimmedLine.match(/^[A-Z][A-Z\s&\-']+ (EXPERIENCE|SKILLS|BACKGROUND|COMPETENCIES|LEVEL):?$/i) // Common resume sections
      );

      if (isHeader && trimmedLine.length > 0) {
        // Save previous section if it has content
        if (currentSection.header || currentSection.content.length > 0) {
          sections.push({ ...currentSection });
        }
        // Start new section
        currentSection = {
          header: trimmedLine.replace(/^[0-9]+\.\s*/, '').replace(/:$/, ''),
          content: [],
          contentType: 'mixed'
        };
      } else if (trimmedLine.length > 0) {
        // Detect content type for better formatting
        const isBulletPoint = /^[-•*]\s+/.test(trimmedLine);
        const isNumberedItem = /^\d+[\.\)]\s+/.test(trimmedLine);
        
        if (isBulletPoint || isNumberedItem) {
          if (!currentSection.contentType || currentSection.contentType === 'mixed') {
            currentSection.contentType = 'list';
          }
          currentSection.content.push({
            type: 'listItem',
            content: trimmedLine.replace(/^[-•*]\s+|^\d+[\.\)]\s+/, '').trim()
          });
        } else {
          // Handle regular paragraphs - split overly long ones for readability
          if (trimmedLine.length > 150) {
            // Split at sentence boundaries
            const sentences = trimmedLine.split(/(?<=[.!?])\s+/);
            
            if (sentences.length > 1) {
              sentences.forEach((sentence, idx) => {
                if (sentence.trim().length > 0) {
                  currentSection.content.push({
                    type: 'paragraph',
                    content: sentence.trim(),
                    isPartOfLonger: idx > 0
                  });
                }
              });
            } else {
              // Try to break at logical conjunctions
              const logicalBreaks = trimmedLine.split(/(?:,\s+(?:and|or|but|however|furthermore|additionally|moreover)|\s+(?:while|whereas|although|because)\s+)/i);
              if (logicalBreaks.length > 1) {
                logicalBreaks.forEach((part, idx) => {
                  if (part.trim().length > 0) {
                    currentSection.content.push({
                      type: 'paragraph',
                      content: part.trim(),
                      isPartOfLonger: idx > 0
                    });
                  }
                });
              } else {
                currentSection.content.push({
                  type: 'paragraph',
                  content: trimmedLine
                });
              }
            }
          } else {
            currentSection.content.push({
              type: 'paragraph',
              content: trimmedLine
            });
          }
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
   * Enhanced method to format text with better markdown support
   * @param {string} text - Text to format
   * @returns {string} - Formatted text with preserved important formatting
   */
  static formatWithMarkdownSupport(text) {
    if (!text) return '';

    let formatted = text;
    
    // Normalize line breaks
    formatted = formatted.replace(/\r\n/g, '\n');
    
    // Clean up excessive spacing while preserving intentional formatting
    formatted = formatted.replace(/[ \t]{2,}/g, ' ');
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    // Improve bullet point formatting
    formatted = formatted.replace(/^\s*[-•*]\s+/gm, '• ');
    formatted = formatted.replace(/^\s*(\d+)[\.\)]\s+/gm, '$1. ');
    
    // Clean up common AI text artifacts
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '$1'); // Remove bold markers but keep text
    formatted = formatted.replace(/\*([^*]+)\*/g, '$1'); // Remove italic markers
    
    // Remove trailing spaces on lines
    formatted = formatted.replace(/[ \t]+$/gm, '');
    
    return formatted.trim();
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

  /**
   * Smart text chunking for better readability
   * @param {string} text - Long text to chunk
   * @param {number} maxLength - Maximum length per chunk
   * @returns {string[]} - Array of text chunks
   */
  static smartTextChunking(text, maxLength = 200) {
    if (!text || text.length <= maxLength) return [text];

    const chunks = [];
    const sentences = text.split(/(?<=[.!?])\s+/);
    let currentChunk = '';

    sentences.forEach(sentence => {
      if ((currentChunk + sentence).length <= maxLength) {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      } else {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          // Single sentence is too long, break at commas or conjunctions
          const parts = sentence.split(/,\s+|\s+(?:and|or|but|however|therefore|furthermore)\s+/);
          parts.forEach(part => {
            if (part.trim()) chunks.push(part.trim());
          });
        }
      }
    });

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }

  /**
   * Improve text readability with better paragraph breaks
   * @param {string} text - Raw text
   * @returns {string} - Text with improved paragraph structure
   */
  static improveReadability(text) {
    if (!text) return '';

    let improved = text;

    // Add paragraph breaks before key transition words
    const transitionWords = [
      'However', 'Furthermore', 'Additionally', 'Moreover', 'Nevertheless',
      'On the other hand', 'In contrast', 'Similarly', 'For example', 'In summary'
    ];

    transitionWords.forEach(word => {
      const regex = new RegExp(`(\\.)\\s+(${word})`, 'g');
      improved = improved.replace(regex, '$1\n\n$2');
    });

    // Improve list formatting
    improved = improved.replace(/(\w)\s*[-•*]\s*(\w)/g, '$1\n• $2');
    improved = improved.replace(/(\w)\s*(\d+\.)\s*(\w)/g, '$1\n$2 $3');

    // Clean up excessive whitespace
    improved = improved.replace(/\n{3,}/g, '\n\n');
    improved = improved.replace(/\s+/g, ' ');

    return improved.trim();
  }
}