// AI Services Configuration
// All API integrations with plug-and-play setup

interface AIConfig {
  geminiApiKey: string;
  vertexApiKey: string;
  translateApiKey: string;
}

// TODO: Replace with your actual API keys when available
const AI_CONFIG: AIConfig = {
  geminiApiKey: 'YOUR_GEMINI_API_KEY', // Replace with Gemini Pro API key
  vertexApiKey: 'YOUR_VERTEX_API_KEY', // Replace with Vertex AI API key
  translateApiKey: 'YOUR_TRANSLATE_API_KEY', // Replace with Google Translate API key
};

// Gemini Pro for text analysis and farming advice
export class GeminiService {
  private apiKey: string;

  constructor() {
    this.apiKey = AI_CONFIG.geminiApiKey;
  }

  async generateResponse(prompt: string, language: string = 'en'): Promise<string> {
    if (this.apiKey === 'YOUR_GEMINI_API_KEY') {
      // Mock response for development
      return `Mock AI Response: ${prompt.slice(0, 50)}... (Response would be in ${language})`;
    }

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${prompt} (Please respond in ${language})`
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response available';
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Unable to get AI response at the moment';
    }
  }

  async analyzeFarmingQuestion(question: string, language: string): Promise<string> {
    const prompt = `You are a knowledgeable farming expert helping Indian farmers. 
    Answer this farming question: "${question}"
    Provide practical, actionable advice suitable for small-scale farmers.
    Keep the language simple and easy to understand.`;
    
    return this.generateResponse(prompt, language);
  }

  async simplifyScheme(schemeText: string, language: string): Promise<string> {
    const prompt = `Simplify this government scheme information for farmers: "${schemeText}"
    Explain in simple terms:
    1. What the scheme is about
    2. Who can apply
    3. How to apply
    4. Required documents
    Keep it very simple and practical.`;
    
    return this.generateResponse(prompt, language);
  }
}

// Gemini Vision for crop disease detection
export class GeminiVisionService {
  private apiKey: string;

  constructor() {
    this.apiKey = AI_CONFIG.geminiApiKey;
  }

  async analyzeCropImage(imageBase64: string, language: string = 'en'): Promise<any> {
    if (this.apiKey === 'YOUR_GEMINI_API_KEY') {
      // Mock response for development
      return {
        disease: 'Leaf Spot Disease (Mock)',
        confidence: 85,
        treatment: 'Apply fungicide spray every 7 days (Mock response)',
        prevention: 'Ensure proper drainage and avoid overhead watering'
      };
    }

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: `Analyze this crop image and identify any diseases or problems. 
                Provide response in JSON format with:
                {
                  "disease": "disease name",
                  "confidence": "confidence percentage",
                  "treatment": "treatment steps",
                  "prevention": "prevention methods"
                }
                Respond in ${language} language.`
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageBase64
                }
              }
            ]
          }]
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      try {
        return JSON.parse(text);
      } catch {
        return {
          disease: 'Analysis Result',
          confidence: 'N/A',
          treatment: text,
          prevention: 'Regular monitoring recommended'
        };
      }
    } catch (error) {
      console.error('Gemini Vision API Error:', error);
      return {
        disease: 'Analysis Error',
        confidence: 0,
        treatment: 'Unable to analyze image at the moment',
        prevention: 'Please try again later'
      };
    }
  }
}

// Speech-to-Text service
export class STTService {
  private apiKey: string;

  constructor() {
    this.apiKey = AI_CONFIG.vertexApiKey;
  }

  async speechToText(audioBlob: Blob, language: string = 'hi-IN'): Promise<string> {
    if (this.apiKey === 'YOUR_VERTEX_API_KEY') {
      // Mock response for development
      return `Mock transcription: "मेरे टमाटर पर पीले धब्बे हैं"`;
    }

    // Implementation would use Vertex AI Speech-to-Text
    // For now, using Web Speech API as fallback
    return new Promise((resolve) => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = language;
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          resolve(transcript);
        };
        
        recognition.onerror = () => {
          resolve('Speech recognition error');
        };
        
        recognition.start();
      } else {
        resolve('Speech recognition not supported');
      }
    });
  }
}

// Text-to-Speech service
export class TTSService {
  private apiKey: string;

  constructor() {
    this.apiKey = AI_CONFIG.vertexApiKey;
  }

  async textToSpeech(text: string, language: string = 'hi'): Promise<void> {
    if (this.apiKey === 'YOUR_VERTEX_API_KEY') {
      // Fallback to Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        speechSynthesis.speak(utterance);
      }
      return;
    }

    // Implementation would use Vertex AI Text-to-Speech
    // For now, using Web Speech API as fallback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  }
}

// Translation service
export class TranslationService {
  private apiKey: string;

  constructor() {
    this.apiKey = AI_CONFIG.translateApiKey;
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    if (this.apiKey === 'YOUR_TRANSLATE_API_KEY') {
      // Mock translation for development
      return `[${targetLanguage}] ${text}`;
    }

    try {
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          format: 'text'
        })
      });

      const data = await response.json();
      return data.data?.translations?.[0]?.translatedText || text;
    } catch (error) {
      console.error('Translation API Error:', error);
      return text;
    }
  }
}

// Export service instances
export const geminiService = new GeminiService();
export const geminiVisionService = new GeminiVisionService();
export const sttService = new STTService();
export const ttsService = new TTSService();
export const translationService = new TranslationService();