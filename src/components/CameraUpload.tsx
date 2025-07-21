import React, { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { requestCameraPermission, fileToBase64 } from '@/lib/utils/media';
import { geminiVisionService } from '@/lib/ai-services';
import { getTranslation } from '@/lib/languages';
import { toast } from 'sonner';

interface CameraUploadProps {
  language: string;
  onImageAnalysis?: (result: any) => void;
  title?: string;
  subtitle?: string;
}

const CameraUpload: React.FC<CameraUploadProps> = ({
  language,
  onImageAnalysis,
  title,
  subtitle
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleCameraCapture = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      toast.error('Camera permission is required');
      return;
    }
    
    cameraInputRef.current?.click();
  };

  const handleGalleryUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      
      // Convert to base64 for API
      const base64 = await fileToBase64(file);
      await analyzeImage(base64);
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image');
    }
  };

  const analyzeImage = async (imageBase64: string) => {
    setIsAnalyzing(true);
    
    try {
      const result = await geminiVisionService.analyzeCropImage(imageBase64, language);
      setAnalysisResult(result);
      
      if (onImageAnalysis) {
        onImageAnalysis(result);
      }
      
      toast.success('Image analysis complete');
    } catch (error) {
      console.error('Image analysis error:', error);
      toast.error('Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      {title && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Upload Area */}
      {!selectedImage ? (
        <Card className="card-feature p-8">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <ImageIcon className="w-12 h-12 text-primary" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Upload Crop Image
              </h3>
              <p className="text-muted-foreground text-dual-lang">
                <span className="text-primary-lang">
                  {getTranslation('upload', language)} / {getTranslation('camera', language)}
                </span>
                <span className="text-secondary-lang">
                  Take photo or upload from gallery
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <Button
                onClick={handleGalleryUpload}
                variant="outline"
                size="lg"
                className="flex flex-col h-24 space-y-2"
              >
                <Upload className="w-6 h-6" />
                <div className="text-dual-lang">
                  <span className="text-primary-lang text-sm font-medium">
                    {getTranslation('gallery', language)}
                  </span>
                  <span className="text-secondary-lang text-xs">
                    गैलरी से चुनें
                  </span>
                </div>
              </Button>

              <Button
                onClick={handleCameraCapture}
                variant="outline"
                size="lg"
                className="flex flex-col h-24 space-y-2"
              >
                <Camera className="w-6 h-6" />
                <div className="text-dual-lang">
                  <span className="text-primary-lang text-sm font-medium">
                    {getTranslation('camera', language)}
                  </span>
                  <span className="text-secondary-lang text-xs">
                    फोटो खींचे
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        /* Image Preview & Analysis */
        <div className="space-y-4">
          <Card className="relative">
            <Button
              onClick={clearImage}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 z-10"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <img
              src={selectedImage}
              alt="Selected crop"
              className="w-full h-64 object-cover rounded-lg"
            />
          </Card>

          {isAnalyzing && (
            <Card className="p-6">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  Analyzing your crop image...
                </p>
              </div>
            </Card>
          )}

          {analysisResult && (
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-primary">
                Analysis Result
              </h3>
              
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Disease/Issue
                  </label>
                  <p className="text-foreground">{analysisResult.disease}</p>
                </div>
                
                {analysisResult.confidence && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Confidence
                    </label>
                    <p className="text-foreground">{analysisResult.confidence}%</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Treatment
                  </label>
                  <p className="text-foreground">{analysisResult.treatment}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Prevention
                  </label>
                  <p className="text-foreground">{analysisResult.prevention}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageSelect}
        className="hidden"
      />
    </div>
  );
};

export default CameraUpload;