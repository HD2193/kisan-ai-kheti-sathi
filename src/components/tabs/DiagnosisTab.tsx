import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CameraUpload from '@/components/CameraUpload';
import VoiceButton from '@/components/VoiceButton';
import { History, BookOpen, AlertTriangle } from 'lucide-react';
import { getTranslation } from '@/lib/languages';

interface DiagnosisTabProps {
  language: string;
}

interface DiagnosisHistory {
  id: string;
  date: string;
  crop: string;
  disease: string;
  confidence: number;
  imageUrl: string;
}

const DiagnosisTab: React.FC<DiagnosisTabProps> = ({ language }) => {
  const [activeView, setActiveView] = useState<'upload' | 'history'>('upload');
  const [diagnosisHistory] = useState<DiagnosisHistory[]>([
    {
      id: '1',
      date: '2024-01-20',
      crop: 'Tomato',
      disease: 'Leaf Spot Disease',
      confidence: 85,
      imageUrl: '/placeholder-crop.jpg'
    },
    {
      id: '2', 
      date: '2024-01-18',
      crop: 'Wheat',
      disease: 'Healthy Crop',
      confidence: 92,
      imageUrl: '/placeholder-crop.jpg'
    }
  ]);

  const handleImageAnalysis = (result: any) => {
    console.log('Image analysis result:', result);
    // TODO: Save to Firestore
  };

  const handleVoiceQuery = (transcript: string, response: string) => {
    console.log('Voice query:', { transcript, response });
  };

  return (
    <div className="pb-20 p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Crop Diagnosis
        </h1>
        <div className="text-dual-lang">
          <p className="text-primary-lang text-muted-foreground">
            Upload or capture crop images for AI-powered disease detection
          </p>
          <p className="text-secondary-lang text-sm text-muted-foreground">
            फसल की तस्वीर अपलोड करें या कैमरे से लें
          </p>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="flex space-x-2">
        <Button
          variant={activeView === 'upload' ? 'default' : 'outline'}
          onClick={() => setActiveView('upload')}
          className="flex-1"
        >
          Upload Image
        </Button>
        <Button
          variant={activeView === 'history' ? 'default' : 'outline'}
          onClick={() => setActiveView('history')}
          className="flex-1"
        >
          <History className="w-4 h-4 mr-2" />
          History
        </Button>
      </div>

      {activeView === 'upload' ? (
        <div className="space-y-6">
          {/* Voice Assistant for Crop Issues */}
          <Card className="card-kisan">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Describe the Problem
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tell us about your crop issue in your language
                </p>
              </div>
              <VoiceButton
                language={language}
                size="md"
                onTranscript={(transcript) => console.log('Voice input:', transcript)}
                onResponse={(response) => handleVoiceQuery('', response)}
              />
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground text-center">
                "मेरे टमाटर पर पीले धब्बे हैं" या "My wheat leaves are turning brown"
              </p>
            </div>
          </Card>

          {/* Image Upload Component */}
          <CameraUpload
            language={language}
            onImageAnalysis={handleImageAnalysis}
            title="Upload Crop Image"
            subtitle="Take a clear photo of affected crop area"
          />

          {/* Tips for Better Results */}
          <Card className="card-kisan bg-accent/5 border-accent/20">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-accent mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Tips for Better Results
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Take photos in good lighting conditions</li>
                  <li>• Focus on affected areas of the plant</li>
                  <li>• Include leaves, stems, or fruits with symptoms</li>
                  <li>• Avoid blurry or distant shots</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* History View */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Diagnosis History
            </h3>
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {diagnosisHistory.length === 0 ? (
            <Card className="card-kisan text-center py-8">
              <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No diagnosis history yet
              </p>
              <p className="text-sm text-muted-foreground">
                Upload your first crop image to get started
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {diagnosisHistory.map((item) => (
                <Card key={item.id} className="card-feature p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">
                          {item.crop}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.disease}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${item.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiagnosisTab;