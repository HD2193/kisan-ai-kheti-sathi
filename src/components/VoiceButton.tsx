import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AudioRecorder, requestMicrophonePermission } from '@/lib/utils/media';
import { sttService, ttsService, geminiService } from '@/lib/ai-services';
import { toast } from 'sonner';

interface VoiceButtonProps {
  language: string;
  onTranscript?: (text: string) => void;
  onResponse?: (response: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({
  language,
  onTranscript,
  onResponse,
  size = 'md',
  className = ''
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [recorder] = useState(() => new AudioRecorder());

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const permission = await requestMicrophonePermission();
    setHasPermission(permission);
    if (!permission) {
      toast.error('Microphone permission is required for voice features');
    }
  };

  const startRecording = async () => {
    if (!hasPermission) {
      await checkPermissions();
      return;
    }

    const started = await recorder.startRecording();
    if (started) {
      setIsRecording(true);
      toast.success('Listening... Speak now');
    } else {
      toast.error('Failed to start recording');
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessing(true);

    try {
      const audioBlob = await recorder.stopRecording();
      if (audioBlob) {
        // Convert speech to text
        const transcript = await sttService.speechToText(audioBlob, language);
        console.log('Transcript:', transcript);
        
        if (onTranscript) {
          onTranscript(transcript);
        }

        // Get AI response
        const response = await geminiService.analyzeFarmingQuestion(transcript, language);
        console.log('AI Response:', response);
        
        if (onResponse) {
          onResponse(response);
        }

        // Speak the response
        await ttsService.textToSpeech(response, language);
        
        toast.success('Voice processing complete');
      } else {
        toast.error('No audio recorded');
      }
    } catch (error) {
      console.error('Voice processing error:', error);
      toast.error('Failed to process voice input');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isProcessing || !hasPermission}
      className={`
        btn-voice ${sizeClasses[size]} ${className}
        ${isRecording ? 'animate-pulse-glow bg-destructive hover:bg-destructive/90' : ''}
        ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      {isProcessing ? (
        <Volume2 className="animate-pulse" size={iconSizes[size]} />
      ) : isRecording ? (
        <MicOff size={iconSizes[size]} />
      ) : (
        <Mic size={iconSizes[size]} />
      )}
    </Button>
  );
};

export default VoiceButton;