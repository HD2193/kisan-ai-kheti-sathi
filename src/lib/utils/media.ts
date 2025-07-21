// Media handling utilities for camera and microphone access

export interface MediaPermissions {
  camera: boolean;
  microphone: boolean;
}

// Check and request camera permissions
export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach(track => track.stop()); // Stop the stream
    return true;
  } catch (error) {
    console.error('Camera permission denied:', error);
    return false;
  }
};

// Check and request microphone permissions
export const requestMicrophonePermission = async (): Promise<boolean> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop()); // Stop the stream
    return true;
  } catch (error) {
    console.error('Microphone permission denied:', error);
    return false;
  }
};

// Capture image from camera
export const captureImageFromCamera = async (): Promise<string | null> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      video.srcObject = stream;
      video.play();
      
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Capture frame after 2 seconds
        setTimeout(() => {
          if (context) {
            context.drawImage(video, 0, 0);
            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            stream.getTracks().forEach(track => track.stop());
            resolve(imageData);
          } else {
            resolve(null);
          }
        }, 2000);
      });
    });
  } catch (error) {
    console.error('Error capturing image:', error);
    return null;
  }
};

// Convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:image/jpeg;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Record audio from microphone
export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  async startRecording(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
      return true;
    } catch (error) {
      console.error('Error starting recording:', error);
      return false;
    }
  }

  async stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    });
  }
}

// Check if device supports required media features
export const getMediaCapabilities = async (): Promise<MediaPermissions> => {
  const permissions: MediaPermissions = {
    camera: false,
    microphone: false
  };

  try {
    // Check camera
    const cameraDevices = await navigator.mediaDevices.enumerateDevices();
    permissions.camera = cameraDevices.some(device => device.kind === 'videoinput');
    
    // Check microphone
    permissions.microphone = cameraDevices.some(device => device.kind === 'audioinput');
  } catch (error) {
    console.error('Error checking media capabilities:', error);
  }

  return permissions;
};