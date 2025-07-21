import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CameraUpload from '@/components/CameraUpload';
import VoiceButton from '@/components/VoiceButton';
import { 
  Heart, 
  Plus, 
  Calendar,
  Stethoscope,
  Camera,
  TrendingUp,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface CattleTabProps {
  language: string;
}

interface CattleRecord {
  id: string;
  name: string;
  type: 'cow' | 'buffalo' | 'goat' | 'other';
  breed: string;
  age: number;
  healthStatus: 'healthy' | 'sick' | 'treatment';
  lastCheckup: string;
  vaccinations: string[];
  nextVaccination: string;
  milkProduction?: number;
}

const CattleTab: React.FC<CattleTabProps> = ({ language }) => {
  const [activeView, setActiveView] = useState<'list' | 'add' | 'health'>('list');
  const [selectedCattle, setSelectedCattle] = useState<string | null>(null);

  const [cattleRecords] = useState<CattleRecord[]>([
    {
      id: '1',
      name: 'Gaumata',
      type: 'cow',
      breed: 'Gir',
      age: 4,
      healthStatus: 'healthy',
      lastCheckup: '2024-01-15',
      vaccinations: ['FMD', 'HS', 'BQ'],
      nextVaccination: '2024-02-15',
      milkProduction: 15
    },
    {
      id: '2',
      name: 'Kaali',
      type: 'buffalo',
      breed: 'Murrah',
      age: 6,
      healthStatus: 'treatment',
      lastCheckup: '2024-01-18',
      vaccinations: ['FMD', 'HS'],
      nextVaccination: '2024-02-10',
      milkProduction: 12
    }
  ]);

  const [healthTips] = useState([
    {
      title: 'Vaccination Reminder',
      message: 'Gaumata needs FMD vaccination on Feb 15',
      priority: 'high',
      icon: Calendar
    },
    {
      title: 'Health Check',
      message: 'Kaali showing signs of mastitis - continue treatment',
      priority: 'urgent',
      icon: Stethoscope
    },
    {
      title: 'Feed Planning',
      message: 'Increase green fodder for better milk production',
      priority: 'medium',
      icon: TrendingUp
    }
  ]);

  const getCattleIcon = (type: string) => {
    switch (type) {
      case 'cow':
        return '🐄';
      case 'buffalo':
        return '🐃';
      case 'goat':
        return '🐐';
      default:
        return '🐄';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'treatment':
        return 'text-warning';
      case 'sick':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-destructive';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleImageAnalysis = (result: any) => {
    console.log('Cattle health analysis:', result);
  };

  if (activeView === 'add') {
    return (
      <div className="pb-20 p-4 space-y-6">
        <div className="pt-4">
          <Button
            variant="ghost"
            onClick={() => setActiveView('list')}
            className="mb-4"
          >
            ← Back to Cattle List
          </Button>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Add New Cattle
          </h1>
          <p className="text-muted-foreground">
            Register your cattle for health tracking
          </p>
        </div>

        <Card className="card-kisan space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Cattle Name
              </label>
              <Input placeholder="Enter name..." />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Type
              </label>
              <select className="w-full p-2 border border-input rounded-lg">
                <option>Cow</option>
                <option>Buffalo</option>
                <option>Goat</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Breed
              </label>
              <Input placeholder="e.g., Gir, Murrah..." />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Age (years)
              </label>
              <Input type="number" placeholder="0" />
            </div>
          </div>
          
          <Button className="btn-primary w-full">
            Add Cattle
          </Button>
        </Card>
      </div>
    );
  }

  if (activeView === 'health') {
    return (
      <div className="pb-20 p-4 space-y-6">
        <div className="pt-4">
          <Button
            variant="ghost"
            onClick={() => setActiveView('list')}
            className="mb-4"
          >
            ← Back to Cattle List
          </Button>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Cattle Health Check
          </h1>
          <p className="text-muted-foreground">
            Upload photos for AI-powered health diagnosis
          </p>
        </div>

        {/* Voice Description */}
        <Card className="card-kisan">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Describe the Issue
              </h3>
              <p className="text-sm text-muted-foreground">
                Tell us about your cattle's health concern
              </p>
            </div>
            <VoiceButton
              language={language}
              size="md"
              onTranscript={(transcript) => console.log('Cattle voice input:', transcript)}
            />
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground text-center">
              "मेरी गाय को बुखार है" या "My buffalo has white spots on skin"
            </p>
          </div>
        </Card>

        <CameraUpload
          language={language}
          onImageAnalysis={handleImageAnalysis}
          title="Cattle Health Analysis"
          subtitle="Take clear photos of affected areas"
        />
      </div>
    );
  }

  return (
    <div className="pb-20 p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Cattle Management
        </h1>
        <div className="text-dual-lang">
          <p className="text-primary-lang text-muted-foreground">
            Track health, vaccinations, and milk production
          </p>
          <p className="text-secondary-lang text-sm text-muted-foreground">
            पशुओं का स्वास्थ्य और दूध उत्पादन ट्रैक करें
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => setActiveView('add')}
          variant="outline"
          className="h-auto p-4 flex flex-col space-y-2"
        >
          <Plus className="w-6 h-6 text-primary" />
          <span className="text-sm">Add Cattle</span>
        </Button>
        <Button
          onClick={() => setActiveView('health')}
          variant="outline"
          className="h-auto p-4 flex flex-col space-y-2"
        >
          <Camera className="w-6 h-6 text-primary" />
          <span className="text-sm">Health Check</span>
        </Button>
      </div>

      {/* Health Alerts */}
      <Card className="card-kisan">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Health Alerts
          </h3>
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>
        
        <div className="space-y-3">
          {healthTips.map((tip, index) => {
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
                  <span className={`text-xs ${getPriorityColor(tip.priority)}`}>
                    {tip.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Cattle List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Your Cattle ({cattleRecords.length})
        </h3>

        {cattleRecords.map((cattle) => (
          <Card key={cattle.id} className="card-feature p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="text-3xl">{getCattleIcon(cattle.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">
                      {cattle.name}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      cattle.healthStatus === 'healthy' ? 'bg-success/10 text-success' :
                      cattle.healthStatus === 'treatment' ? 'bg-warning/10 text-warning' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {cattle.healthStatus}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {cattle.breed} • {cattle.age} years old
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Last Checkup:</span>
                      <p className="font-medium text-foreground">
                        {new Date(cattle.lastCheckup).toLocaleDateString()}
                      </p>
                    </div>
                    {cattle.milkProduction && (
                      <div>
                        <span className="text-muted-foreground">Milk/Day:</span>
                        <p className="font-medium text-foreground">
                          {cattle.milkProduction}L
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Next vaccination: {new Date(cattle.nextVaccination).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="card-kisan">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Summary
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">
              {cattleRecords.filter(c => c.healthStatus === 'healthy').length}
            </p>
            <p className="text-xs text-muted-foreground">Healthy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">
              {cattleRecords.filter(c => c.healthStatus === 'treatment').length}
            </p>
            <p className="text-xs text-muted-foreground">Treatment</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {cattleRecords.reduce((sum, c) => sum + (c.milkProduction || 0), 0)}L
            </p>
            <p className="text-xs text-muted-foreground">Total Milk/Day</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CattleTab;