import React, { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import PhoneAuth from './PhoneAuth';
import BottomNavigation from './BottomNavigation';
import HomeTab from './tabs/HomeTab';
import DiagnosisTab from './tabs/DiagnosisTab';
import MarketTab from './tabs/MarketTab';
import SoilTab from './tabs/SoilTab';
import CommunityTab from './tabs/CommunityTab';
import CattleTab from './tabs/CattleTab';
import LoansTab from './tabs/LoansTab';

const KisanApp: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');

  useEffect(() => {
    // Check for saved language and auth state
    const savedLanguage = localStorage.getItem('kisanai_language');
    const savedAuth = localStorage.getItem('kisanai_authenticated');
    
    if (savedLanguage) setSelectedLanguage(savedLanguage);
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('kisanai_language', languageCode);
  };

  const handleAuth = (phoneNumber: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('kisanai_authenticated', 'true');
    localStorage.setItem('kisanai_phone', phoneNumber);
  };

  // Language selection screen
  if (!selectedLanguage) {
    return (
      <LanguageSelector 
        onLanguageSelect={handleLanguageSelect}
        selectedLanguage={selectedLanguage}
      />
    );
  }

  // Authentication screen
  if (!isAuthenticated) {
    return (
      <PhoneAuth 
        language={selectedLanguage}
        onAuth={handleAuth}
      />
    );
  }

  // Main app with tabs
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab language={selectedLanguage} />;
      case 'diagnosis':
        return <DiagnosisTab language={selectedLanguage} />;
      case 'market':
        return <MarketTab language={selectedLanguage} />;
      case 'soil':
        return <SoilTab language={selectedLanguage} />;
      case 'community':
        return <CommunityTab language={selectedLanguage} />;
      case 'cattle':
        return <CattleTab language={selectedLanguage} />;
      case 'loans':
        return <LoansTab language={selectedLanguage} />;
      default:
        return <HomeTab language={selectedLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderActiveTab()}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={selectedLanguage}
      />
    </div>
  );
};

export default KisanApp;