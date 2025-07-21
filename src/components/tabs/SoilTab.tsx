import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  WifiOff, 
  Droplets, 
  Zap, 
  Thermometer,
  Activity,
  Plus,
  Settings,
  AlertTriangle
} from 'lucide-react';

interface SoilTabProps {
  language: string;
}

interface SoilData {
  fieldName: string;
  connected: boolean;
  lastUpdate: string;
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
}

const SoilTab: React.FC<SoilTabProps> = ({ language }) => {
  const [fields] = useState<SoilData[]>([
    {
      fieldName: 'Field 1 - Wheat',
      connected: true,
      lastUpdate: '2 hours ago',
      ph: 6.8,
      moisture: 45,
      nitrogen: 32,
      phosphorus: 18,
      potassium: 28,
      temperature: 24
    },
    {
      fieldName: 'Field 2 - Cotton',
      connected: false,
      lastUpdate: '2 days ago',
      ph: 7.2,
      moisture: 20,
      nitrogen: 15,
      phosphorus: 12,
      potassium: 22,
      temperature: 26
    }
  ]);

  const getSoilStatus = (value: number, type: string) => {
    switch (type) {
      case 'ph':
        if (value >= 6.0 && value <= 7.5) return { status: 'good', color: 'text-success' };
        if (value >= 5.5 && value <= 8.0) return { status: 'fair', color: 'text-warning' };
        return { status: 'poor', color: 'text-destructive' };
      case 'moisture':
        if (value >= 40 && value <= 60) return { status: 'good', color: 'text-success' };
        if (value >= 30 && value <= 70) return { status: 'fair', color: 'text-warning' };
        return { status: 'poor', color: 'text-destructive' };
      case 'nutrients':
        if (value >= 30) return { status: 'good', color: 'text-success' };
        if (value >= 20) return { status: 'fair', color: 'text-warning' };
        return { status: 'poor', color: 'text-destructive' };
      default:
        return { status: 'unknown', color: 'text-muted-foreground' };
    }
  };

  const getProgressColor = (value: number, type: string) => {
    const status = getSoilStatus(value, type);
    switch (status.status) {
      case 'good':
        return 'bg-success';
      case 'fair':
        return 'bg-warning';
      case 'poor':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="pb-20 p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Soil Health
        </h1>
        <div className="text-dual-lang">
          <p className="text-primary-lang text-muted-foreground">
            Monitor soil conditions with IoT sensors
          </p>
          <p className="text-secondary-lang text-sm text-muted-foreground">
            मिट्टी की स्थिति की निगरानी करें
          </p>
        </div>
      </div>

      {/* Connect Sensor CTA */}
      <Card className="card-kisan bg-primary/5 border-primary/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Activity className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Connect Soil Sensor
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get real-time soil data with our IoT sensors. Monitor pH, moisture, and nutrients automatically.
            </p>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Sensor
            </Button>
          </div>
        </div>
      </Card>

      {/* Field Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Your Fields
          </h3>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Manage
          </Button>
        </div>

        {fields.map((field, index) => (
          <Card key={index} className="card-kisan">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  field.connected ? 'bg-success' : 'bg-destructive'
                }`}></div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {field.fieldName}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {field.connected ? (
                      <Wifi className="w-3 h-3" />
                    ) : (
                      <WifiOff className="w-3 h-3" />
                    )}
                    <span>Last update: {field.lastUpdate}</span>
                  </div>
                </div>
              </div>
              
              {!field.connected && (
                <AlertTriangle className="w-5 h-5 text-warning" />
              )}
            </div>

            {/* Soil Metrics */}
            <div className="space-y-4">
              {/* pH Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    pH Level
                  </span>
                  <span className={`text-sm font-semibold ${getSoilStatus(field.ph, 'ph').color}`}>
                    {field.ph}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(field.ph, 'ph')}`}
                    style={{ width: `${(field.ph / 14) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Optimal: 6.0 - 7.5
                </p>
              </div>

              {/* Moisture */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-foreground">
                      Moisture
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${getSoilStatus(field.moisture, 'moisture').color}`}>
                    {field.moisture}%
                  </span>
                </div>
                <Progress 
                  value={field.moisture} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Optimal: 40% - 60%
                </p>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-foreground">
                      Temperature
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {field.temperature}°C
                  </span>
                </div>
              </div>

              {/* NPK Levels */}
              <div className="border-t border-border pt-4">
                <h5 className="text-sm font-medium text-foreground mb-3">
                  Nutrient Levels (NPK)
                </h5>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">N</span>
                      <span className={`text-xs font-semibold ${getSoilStatus(field.nitrogen, 'nutrients').color}`}>
                        {field.nitrogen}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${getProgressColor(field.nitrogen, 'nutrients')}`}
                        style={{ width: `${field.nitrogen}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">P</span>
                      <span className={`text-xs font-semibold ${getSoilStatus(field.phosphorus, 'nutrients').color}`}>
                        {field.phosphorus}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${getProgressColor(field.phosphorus, 'nutrients')}`}
                        style={{ width: `${field.phosphorus}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">K</span>
                      <span className={`text-xs font-semibold ${getSoilStatus(field.potassium, 'nutrients').color}`}>
                        {field.potassium}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${getProgressColor(field.potassium, 'nutrients')}`}
                        style={{ width: `${field.potassium}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {field.connected && (
              <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                <h6 className="text-sm font-medium text-foreground mb-2">
                  AI Recommendations
                </h6>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {field.moisture < 40 && (
                    <li>• Increase irrigation - soil moisture is low</li>
                  )}
                  {field.nitrogen < 25 && (
                    <li>• Apply nitrogen-rich fertilizer</li>
                  )}
                  {field.ph < 6.0 && (
                    <li>• Add lime to increase soil pH</li>
                  )}
                  {field.ph > 7.5 && (
                    <li>• Add organic matter to reduce pH</li>
                  )}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Add Field Button */}
      <Button variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add New Field
      </Button>
    </div>
  );
};

export default SoilTab;