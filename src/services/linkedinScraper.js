// LinkedIn Job Scraper Service - Implements browser-based job scraping
import puppeteer from 'puppeteer';

class LinkedInScraperService {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  // Initialize browser (equivalent to webdriver setup)
  async initializeBrowser() {
    try {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1366, height: 768 });
      return true;
    } catch (error) {
      console.error('Browser initialization failed:', error);
      return false;
    }
  }

  // Build LinkedIn search URL
  buildSearchUrl(jobTitles, location = 'India') {
    const encodedTitles = jobTitles
      .map(title => title.trim().replace(/\s+/g, '%20'))
      .join('%2C%20');
    
    return `https://in.linkedin.com/jobs/search?keywords=${encodedTitles}&location=${location}&locationId=&geoId=102713980&f_TPR=r604800&position=1&pageNum=0`;
  }

  // Navigate to LinkedIn and handle initial setup
  async navigateToLinkedIn(url) {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Handle any cookie/privacy dialogs
      try {
        await this.page.waitForSelector('[data-tracking-control-name="public_jobs_contextual-sign-in-modal_modal_dismiss"]', { timeout: 5000 });
        await this.page.click('[data-tracking-control-name="public_jobs_contextual-sign-in-modal_modal_dismiss"]');
      } catch (e) {
        // Modal might not appear, continue
      }

      return true;
    } catch (error) {
      console.error('Navigation failed:', error);
      return false;
    }
  }

  // Scroll and load more jobs
  async loadMoreJobs(jobCount = 10) {
    try {
      const scrollCount = Math.ceil(jobCount / 25); // LinkedIn shows ~25 jobs per scroll
      
      for (let i = 0; i < scrollCount; i++) {
        // Scroll to bottom
        await this.page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        
        await this.page.waitForTimeout(2000);
        
        // Try to click "See more jobs" button
        try {
          await this.page.waitForSelector('button[aria-label="See more jobs"]', { timeout: 3000 });
          await this.page.click('button[aria-label="See more jobs"]');
          await this.page.waitForTimeout(3000);
        } catch (e) {
          // Button might not be available
        }
        
        // Handle sign-in modal if it appears
        try {
          await this.page.click('[data-tracking-control-name="public_jobs_contextual-sign-in-modal_modal_dismiss"]');
        } catch (e) {
          // Modal might not appear
        }
      }
      
      return true;
    } catch (error) {
      console.error('Failed to load more jobs:', error);
      return false;
    }
  }

  // Scrape job listings from current page
  async scrapeJobListings(userJobTitles, userLocation) {
    try {
      const jobs = await this.page.evaluate((jobTitles, location) => {
        const jobElements = document.querySelectorAll('[data-entity-urn*="jobPosting"]');
        const scrapedJobs = [];
        
        jobElements.forEach(element => {
          try {
            // Extract basic job information
            const titleElement = element.querySelector('h3.base-search-card__title a');
            const companyElement = element.querySelector('h4.base-search-card__subtitle a');
            const locationElement = element.querySelector('span.job-search-card__location');
            const linkElement = element.querySelector('h3.base-search-card__title a');
            
            if (!titleElement || !companyElement) return;
            
            const jobTitle = titleElement.textContent.trim();
            const company = companyElement.textContent.trim();
            const jobLocation = locationElement ? locationElement.textContent.trim() : '';
            const jobUrl = linkElement ? linkElement.href : '';
            
            // Filter by job title relevance
            const titleMatch = jobTitles.some(userTitle => 
              jobTitle.toLowerCase().includes(userTitle.toLowerCase()) ||
              userTitle.toLowerCase().split(' ').every(word => 
                jobTitle.toLowerCase().includes(word)
              )
            );
            
            // Filter by location
            const locationMatch = !location || 
              jobLocation.toLowerCase().includes(location.toLowerCase());
            
            if (titleMatch && locationMatch) {
              scrapedJobs.push({
                title: jobTitle,
                company: company,
                location: jobLocation,
                url: jobUrl,
                description: '' // Will be filled later
              });
            }
          } catch (error) {
            console.log('Error processing job element:', error);
          }
        });
        
        return scrapedJobs;
      }, userJobTitles, userLocation);
      
      return jobs;
    } catch (error) {
      console.error('Failed to scrape job listings:', error);
      return [];
    }
  }

  // Scrape individual job description
  async scrapeJobDescription(jobUrl) {
    try {
      const newPage = await this.browser.newPage();
      await newPage.goto(jobUrl, { waitUntil: 'networkidle0', timeout: 20000 });
      
      // Try to click "Show more" button for full description
      try {
        await newPage.waitForSelector('[data-tracking-control-name="public_jobs_show-more-html-btn"]', { timeout: 5000 });
        await newPage.click('[data-tracking-control-name="public_jobs_show-more-html-btn"]');
        await newPage.waitForTimeout(1000);
      } catch (e) {
        // Button might not exist
      }
      
      // Extract job description
      const description = await newPage.evaluate(() => {
        const descElement = document.querySelector('.show-more-less-html__markup') ||
                           document.querySelector('.jobs-description__content') ||
                           document.querySelector('[data-job-id] .jobs-box__html-content');
        
        return descElement ? descElement.textContent.trim() : 'Description not available';
      });
      
      await newPage.close();
      return description;
    } catch (error) {
      console.error('Failed to scrape job description:', error);
      return 'Description not available';
    }
  }

  // Main scraping function
  async scrapeJobs(jobTitles, location = 'India', maxJobs = 10) {
    try {
      // Initialize browser
      const browserReady = await this.initializeBrowser();
      if (!browserReady) {
        throw new Error('Failed to initialize browser');
      }

      // Build search URL and navigate
      const searchUrl = this.buildSearchUrl(jobTitles, location);
      const navigationSuccess = await this.navigateToLinkedIn(searchUrl);
      
      if (!navigationSuccess) {
        throw new Error('Failed to navigate to LinkedIn');
      }

      // Load more jobs
      await this.loadMoreJobs(maxJobs);

      // Scrape job listings
      const jobs = await this.scrapeJobListings(jobTitles, location);
      
      // Limit to requested number and scrape descriptions
      const limitedJobs = jobs.slice(0, maxJobs);
      
      // Scrape descriptions for each job (with rate limiting)
      for (let i = 0; i < limitedJobs.length; i++) {
        if (limitedJobs[i].url) {
          try {
            limitedJobs[i].description = await this.scrapeJobDescription(limitedJobs[i].url);
            // Add delay between requests to avoid rate limiting
            await this.page.waitForTimeout(2000);
          } catch (error) {
            console.error(`Failed to get description for job ${i + 1}:`, error);
            limitedJobs[i].description = 'Description not available';
          }
        }
      }

      return limitedJobs;
    } catch (error) {
      console.error('Scraping failed:', error);
      throw error;
    } finally {
      await this.cleanup();
    }
  }

  // Cleanup browser resources
  async cleanup() {
    try {
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
        this.page = null;
      }
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  }

  // Static method to create and run scraper
  static async scrapeLinkedInJobs(jobTitles, location = 'India', maxJobs = 10) {
    const scraper = new LinkedInScraperService();
    try {
      return await scraper.scrapeJobs(jobTitles, location, maxJobs);
    } catch (error) {
      throw error;
    }
  }
}

export { LinkedInScraperService };