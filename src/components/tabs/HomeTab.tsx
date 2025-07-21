import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VoiceButton from '@/components/VoiceButton';
import { 
  Sun, 
  Droplets, 
  Thermometer, 
  Wind, 
  Calendar,
  Bell,
  Lightbulb,
  Settings,
  TrendingUp
} from 'lucide-react';
import { getTranslation } from '@/lib/languages';

interface HomeTabProps {
  language: string;
  userName?: string;
}

const HomeTab: React.FC<HomeTabProps> = ({ language, userName = 'Farmer' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData] = useState({
    location: 'Ahmedabad',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    rainfall: '85%',
    wind: '12 km/h'
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todaysTips = [
    {
      icon: Droplets,
      title: 'Irrigation Alert',
      message: 'Water your crops early morning for better absorption',
      time: '6:00 AM'
    },
    {
      icon: Lightbulb,
      title: 'Farming Tip',
      message: 'Check for pest infestation on tomato leaves',
      time: 'Today'
    },
    {
      icon: Calendar,
      title: 'Reminder',
      message: 'Apply fertilizer to wheat crop this week',
      time: 'This Week'
    }
  ];

  const handleVoiceResponse = (transcript: string, response: string) => {
    console.log('Voice interaction:', { transcript, response });
  };

  return (
    <div className="pb-20 p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Namaste, {userName}! 🙏
          </h1>
          <p className="text-muted-foreground">
            {currentTime.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Voice Assistant */}
      <Card className="card-kisan text-center space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Kisan AI Assistant
          </h2>
          <p className="text-muted-foreground text-dual-lang">
            <span className="text-primary-lang">
              Ask me anything about farming
            </span>
            <span className="text-secondary-lang">
              खेती के बारे में कुछ भी पूछें
            </span>
          </p>
        </div>
        
        <VoiceButton 
          language={language}
          size="lg"
          onTranscript={(transcript) => console.log('Voice input:', transcript)}
          onResponse={(response) => console.log('AI response:', response)}
          className="mx-auto"
        />
        
        <p className="text-sm text-muted-foreground">
          Tap and speak in your language
        </p>
      </Card>

      {/* Weather Widget */}
      <Card className="card-kisan">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Weather
          </h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View Forecast
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sun className="w-8 h-8 text-accent" />
              <div>
                <p className="font-semibold text-foreground">
                  {weatherData.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  {weatherData.condition}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">
                {weatherData.temperature}°C
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Rainfall</p>
              <p className="text-sm font-semibold text-foreground">
                {weatherData.rainfall}
              </p>
            </div>
            <div className="text-center">
              <Thermometer className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-sm font-semibold text-foreground">
                {weatherData.humidity}%
              </p>
            </div>
            <div className="text-center">
              <Wind className="w-5 h-5 text-gray-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="text-sm font-semibold text-foreground">
                {weatherData.wind}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Today's Tips & Alerts */}
      <Card className="card-kisan">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Today's Tips
          </h3>
          <Bell className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <div className="space-y-3">
          {todaysTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {tip.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {tip.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tip.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="card-kisan">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-sm">Crop Calendar</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-sm">Market Prices</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HomeTab;