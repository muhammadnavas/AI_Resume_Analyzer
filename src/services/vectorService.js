// Vector Service - Implements FAISS-like functionality for text similarity search
import { Matrix } from 'ml-matrix';
import natural from 'natural';

class VectorService {
  constructor() {
    this.tfidf = new natural.TfIdf();
    this.documents = [];
    this.vectors = [];
    this.documentMetadata = [];
  }

  // Add documents to the vector store (similar to FAISS.from_texts)
  addDocuments(textChunks, metadata = []) {
    textChunks.forEach((chunk, index) => {
      this.tfidf.addDocument(chunk);
      this.documents.push(chunk);
      this.documentMetadata.push(metadata[index] || { id: index, text: chunk });
    });
    
    // Build TF-IDF vectors
    this.buildVectors();
  }

  // Build TF-IDF vectors for all documents
  buildVectors() {
    this.vectors = [];
    const terms = this.getAllTerms();
    
    this.documents.forEach((doc, docIndex) => {
      const vector = [];
      terms.forEach(term => {
        vector.push(this.tfidf.tfidf(term, docIndex));
      });
      this.vectors.push(vector);
    });
  }

  // Get all unique terms across documents
  getAllTerms() {
    const allTerms = new Set();
    this.tfidf.documents.forEach(doc => {
      Object.keys(doc).forEach(term => allTerms.add(term));
    });
    return Array.from(allTerms);
  }

  // Similarity search (equivalent to vectorstore.similarity_search)
  similaritySearch(query, k = 3) {
    if (this.vectors.length === 0) {
      return [];
    }

    // Create query vector
    const queryTfidf = new natural.TfIdf();
    queryTfidf.addDocument(query);
    
    const terms = this.getAllTerms();
    const queryVector = [];
    terms.forEach(term => {
      queryVector.push(queryTfidf.tfidf(term, 0));
    });

    // Calculate cosine similarities
    const similarities = this.vectors.map((docVector, index) => ({
      index,
      similarity: this.cosineSimilarity(queryVector, docVector),
      document: this.documents[index],
      metadata: this.documentMetadata[index]
    }));

    // Sort by similarity and return top k
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, k)
      .map(result => ({
        pageContent: result.document,
        metadata: result.metadata,
        similarity: result.similarity
      }));
  }

  // Calculate cosine similarity between two vectors
  cosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) {
      return 0;
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (normA * normB);
  }

  // Get embedding-like representation for a text
  getTextEmbedding(text) {
    const tempTfidf = new natural.TfIdf();
    tempTfidf.addDocument(text);
    
    const terms = this.getAllTerms();
    const vector = [];
    terms.forEach(term => {
      vector.push(tempTfidf.tfidf(term, 0));
    });
    
    return vector;
  }

  // Advanced text chunking similar to LangChain's RecursiveCharacterTextSplitter
  static createTextChunks(text, chunkSize = 700, chunkOverlap = 200) {
    const chunks = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let currentChunk = '';
    
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (!trimmedSentence) continue;
      
      // If adding this sentence exceeds chunk size, save current chunk
      if (currentChunk.length + trimmedSentence.length > chunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        
        // Create overlap by keeping last part of chunk
        const words = currentChunk.split(' ');
        const overlapWords = Math.floor(chunkOverlap / 10); // Approximate overlap
        currentChunk = words.slice(-overlapWords).join(' ') + ' ' + trimmedSentence;
      } else {
        currentChunk += (currentChunk ? '. ' : '') + trimmedSentence;
      }
    }
    
    // Add the last chunk
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks.filter(chunk => chunk.length > 50); // Filter very small chunks
  }

  // Extract key features from resume text
  static extractResumeFeatures(text) {
    const features = {
      skills: [],
      experience: [],
      education: [],
      certifications: [],
      keywords: []
    };

    // Common skill patterns
    const skillPatterns = [
      /\b(JavaScript|Python|Java|React|Node\.js|SQL|HTML|CSS|Git|Docker|AWS|Azure|Machine Learning|AI|Data Science)\b/gi,
      /\b(Programming|Development|Engineering|Analysis|Management|Leadership|Communication)\b/gi
    ];

    // Experience patterns
    const expPatterns = [
      /(\d+)\s*(years?|yrs?)\s*(of\s*)?(experience|exp)/gi,
      /(Senior|Junior|Lead|Principal|Manager|Director|Analyst|Engineer|Developer)/gi
    ];

    // Extract skills
    skillPatterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      features.skills.push(...matches);
    });

    // Extract experience indicators
    expPatterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      features.experience.push(...matches);
    });

    // Extract education keywords
    const eduKeywords = text.match(/\b(Bachelor|Master|PhD|Degree|University|College|Graduate|MBA|BS|MS|BSc|MSc)\b/gi) || [];
    features.education = eduKeywords;

    // Extract certification keywords
    const certKeywords = text.match(/\b(Certified|Certification|Certificate|AWS|Microsoft|Google|Oracle|Cisco)\b/gi) || [];
    features.certifications = certKeywords;

    // Extract general keywords using TF-IDF
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(text);
    
    const termFreqs = [];
    tfidf.listTerms(0).slice(0, 20).forEach(item => {
      if (item.term.length > 3) {
        termFreqs.push(item.term);
      }
    });
    features.keywords = termFreqs;

    return features;
  }
}

export { VectorService };