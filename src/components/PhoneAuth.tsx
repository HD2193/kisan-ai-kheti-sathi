import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { getTranslation } from '@/lib/languages';
import { Smartphone, Shield } from 'lucide-react';

interface PhoneAuthProps {
  language: string;
  onAuth: (phoneNumber: string) => void;
}

const PhoneAuth: React.FC<PhoneAuthProps> = ({ language, onAuth }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) return;
    
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      onAuth(phoneNumber);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to Kisan AI
          </h2>
          <p className="text-muted-foreground">
            {step === 'phone' ? 'Enter your mobile number' : 'Enter OTP sent to your phone'}
          </p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-input bg-muted text-muted-foreground">
                  +91
                </span>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="rounded-l-none"
                />
              </div>
            </div>

            <Button
              onClick={handleSendOtp}
              disabled={phoneNumber.length !== 10 || loading}
              className="w-full btn-primary"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>

            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Your data is secure and encrypted
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter OTP
              </label>
              <Input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-muted-foreground mt-2">
                OTP sent to +91 {phoneNumber}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || loading}
                className="w-full btn-primary"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>

              <Button
                variant="ghost"
                onClick={() => setStep('phone')}
                className="w-full"
              >
                Change Number
              </Button>
            </div>

            <div className="text-center">
              <button className="text-sm text-primary hover:underline">
                Resend OTP
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PhoneAuth;