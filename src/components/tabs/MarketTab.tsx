import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VoiceButton from '@/components/VoiceButton';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface MarketTabProps {
  language: string;
}

interface CropPrice {
  crop: string;
  icon: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  mandi: string;
}

const MarketTab: React.FC<MarketTabProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState] = useState('Maharashtra');
  const [cropPrices] = useState<CropPrice[]>([
    {
      crop: 'Wheat',
      icon: '🌾',
      currentPrice: 2150,
      previousPrice: 2080,
      unit: 'quintal',
      trend: 'up',
      change: 3.4,
      mandi: 'Pune APMC'
    },
    {
      crop: 'Rice',
      icon: '🌾',
      currentPrice: 1950,
      previousPrice: 1980,
      unit: 'quintal',
      trend: 'down',
      change: -1.5,
      mandi: 'Mumbai APMC'
    },
    {
      crop: 'Soybean',
      icon: '🫛',
      currentPrice: 4200,
      previousPrice: 4150,
      unit: 'quintal',
      trend: 'up',
      change: 1.2,
      mandi: 'Nagpur APMC'
    },
    {
      crop: 'Cotton',
      icon: '🌱',
      currentPrice: 5800,
      previousPrice: 5850,
      unit: 'quintal',
      trend: 'down',
      change: -0.9,
      mandi: 'Aurangabad APMC'
    },
    {
      crop: 'Onion',
      icon: '🧅',
      currentPrice: 800,
      previousPrice: 820,
      unit: 'quintal',
      trend: 'down',
      change: -2.4,
      mandi: 'Nashik APMC'
    },
    {
      crop: 'Tomato',
      icon: '🍅',
      currentPrice: 1200,
      previousPrice: 1000,
      unit: 'quintal',
      trend: 'up',
      change: 20.0,
      mandi: 'Pune APMC'
    }
  ]);

  const filteredPrices = cropPrices.filter(crop =>
    crop.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVoiceQuery = (transcript: string, response: string) => {
    console.log('Voice market query:', { transcript, response });
  };

  const handleCropClick = (crop: CropPrice) => {
    console.log('Crop clicked:', crop);
    // Here you can add navigation to detailed crop page or show modal with more info
    alert(`Crop Details:
${crop.icon} ${crop.crop}
Current Price: ₹${crop.currentPrice.toLocaleString()} per ${crop.unit}
Mandi: ${crop.mandi}
7-day change: ${crop.change > 0 ? '+' : ''}${crop.change}%
Previous Price: ₹${crop.previousPrice.toLocaleString()}`);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-success" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-destructive" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="pb-20 p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Market Prices
        </h1>
        <div className="text-dual-lang">
          <p className="text-primary-lang text-muted-foreground">
            Real-time mandi prices and market trends
          </p>
          <p className="text-secondary-lang text-sm text-muted-foreground">
            वर्तमान मंडी भाव और बाजार की जानकारी
          </p>
        </div>
      </div>

      {/* Location & Voice Query */}
      <Card className="card-kisan">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedState}
            </span>
          </div>
          <VoiceButton
            language={language}
            size="sm"
            onTranscript={(transcript) => console.log('Voice input:', transcript)}
            onResponse={(response) => handleVoiceQuery('', response)}
          />
        </div>
        
        <p className="text-sm text-muted-foreground">
          Ask: "महाराष्ट्र में ज्वार का भाव?" or "What's the wheat price today?"
        </p>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search crops... (e.g., wheat, rice, cotton)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Market Summary */}
      <Card className="card-kisan">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Today's Summary
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-IN')}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Rising</span>
            </div>
            <p className="text-lg font-bold text-success">4</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingDown className="w-4 h-4 text-destructive" />
              <span className="text-xs text-muted-foreground">Falling</span>
            </div>
            <p className="text-lg font-bold text-destructive">2</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>
              <span className="text-xs text-muted-foreground">Stable</span>
            </div>
            <p className="text-lg font-bold text-muted-foreground">0</p>
          </div>
        </div>
      </Card>

      {/* Crop Prices List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Current Prices
          </h3>
          <Button variant="outline" size="sm">
            Refresh
          </Button>
        </div>

        {filteredPrices.map((crop, index) => (
          <Card 
            key={index} 
            className="card-feature p-4 hover-scale cursor-pointer transition-all duration-200" 
            onClick={() => handleCropClick(crop)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{crop.icon}</div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {crop.crop}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {crop.mandi}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg font-bold text-foreground">
                    ₹{crop.currentPrice.toLocaleString()}
                  </span>
                  {getTrendIcon(crop.trend)}
                </div>
                <p className="text-sm text-muted-foreground">
                  per {crop.unit}
                </p>
                <div className={`text-xs ${getTrendColor(crop.trend)}`}>
                  {crop.trend === 'up' ? '+' : ''}{crop.change}%
                </div>
              </div>
            </div>

            {/* Price Chart Placeholder */}
            <div className="mt-4 h-12 bg-muted/30 rounded-lg flex items-center justify-center">
              <span className="text-xs text-muted-foreground">
                7-day trend chart
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Recommendation */}
      <Card className="card-kisan bg-accent/5 border-accent/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              AI Recommendation
            </h3>
            <p className="text-sm text-muted-foreground">
              Tomato prices are showing strong upward trend (+20%). Consider selling in next 2-3 days for better returns.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MarketTab;