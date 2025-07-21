import React from 'react';
import { SUPPORTED_LANGUAGES, getTranslation } from '@/lib/languages';
import { Card } from '@/components/ui/card';

interface LanguageSelectorProps {
  onLanguageSelect: (languageCode: string) => void;
  selectedLanguage?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  onLanguageSelect, 
  selectedLanguage 
}) => {
  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Kisan AI
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            {getTranslation('selectLanguage', selectedLanguage || 'en')}
          </p>
          <p className="text-lg text-muted-foreground">
            Select your preferred language
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {SUPPORTED_LANGUAGES.map((language) => (
            <Card
              key={language.code}
              className={`card-feature p-6 cursor-pointer transition-all duration-300 ${
                selectedLanguage === language.code
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'hover:border-primary/30'
              }`}
              onClick={() => onLanguageSelect(language.code)}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{language.flag}</div>
                <div className="text-dual-lang">
                  <span className="text-primary-lang font-semibold">
                    {language.nativeName}
                  </span>
                  <span className="text-secondary-lang">
                    {language.name}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            🌾 Supporting farmers across Bharat with multilingual AI assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;