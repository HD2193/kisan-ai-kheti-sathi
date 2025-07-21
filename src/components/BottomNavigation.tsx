import React from 'react';
import { 
  Home, 
  Camera, 
  TrendingUp, 
  Sprout, 
  Users, 
  Heart, 
  CreditCard 
} from 'lucide-react';
import { getTranslation } from '@/lib/languages';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: string;
}

const tabs = [
  { id: 'home', icon: Home, labelKey: 'home' },
  { id: 'diagnosis', icon: Camera, labelKey: 'cropDiagnosis' },
  { id: 'market', icon: TrendingUp, labelKey: 'market' },
  { id: 'soil', icon: Sprout, labelKey: 'soil' },
  { id: 'community', icon: Users, labelKey: 'community' },
  { id: 'cattle', icon: Heart, labelKey: 'cattle' },
  { id: 'loans', icon: CreditCard, labelKey: 'loans' },
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  language
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="grid grid-cols-4 md:grid-cols-7">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-tab ${isActive ? 'active' : ''} p-2 md:p-3`}
            >
              <Icon 
                size={20} 
                className={`transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`} 
              />
              <div className="text-dual-lang">
                <span className={`text-xs font-medium ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {getTranslation(tab.labelKey as any, language)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;