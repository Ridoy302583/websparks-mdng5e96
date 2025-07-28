import React, { useState, useEffect, useRef } from 'react';
import Logo from './components/Logo';
import SocialButton from './components/SocialButton';
import InputField from './components/InputField';
import SubmitButton from './components/SubmitButton';
import FooterLinks from './components/FooterLinks';
import SuccessMessage from './components/SuccessMessage';
import CustomAlert from './components/CustomAlert';
import FirebaseStatus from './components/FirebaseStatus';
import { subscribeEmail } from './lib/firebase';

function App() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  
  // Refs to store timeout IDs for cleanup
  const alertTimeoutRef = useRef<number | null>(null);
  const socialSignupTimeoutRef = useRef<number | null>(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) {
        window.clearTimeout(alertTimeoutRef.current);
        alertTimeoutRef.current = null;
      }
      if (socialSignupTimeoutRef.current) {
        window.clearTimeout(socialSignupTimeoutRef.current);
        socialSignupTimeoutRef.current = null;
      }
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    // Clear existing timeout
    if (alertTimeoutRef.current) {
      window.clearTimeout(alertTimeoutRef.current);
      alertTimeoutRef.current = null;
    }
    
    setAlert({ type, message });
    
    alertTimeoutRef.current = window.setTimeout(() => {
      setAlert(null);
      alertTimeoutRef.current = null;
    }, 5000);
  };

  const handleSocialSignup = async (provider: string) => {
    console.log(`Signing up with ${provider}`);
    setIsLoading(true);
    
    try {
      // Clear any existing timeout
      if (socialSignupTimeoutRef.current) {
        window.clearTimeout(socialSignupTimeoutRef.current);
        socialSignupTimeoutRef.current = null;
      }
      
      // For demo purposes, we'll use a placeholder email for social signups
      const demoEmail = `demo-${provider.toLowerCase()}@example.com`;
      const result = await subscribeEmail(demoEmail, provider.toLowerCase());
      
      if (result.success) {
        setEmail(demoEmail);
        setIsSubscribed(true);
        showAlert('success', `Successfully subscribed with ${provider}!`);
      } else {
        showAlert('error', result.error || `Failed to subscribe with ${provider}`);
      }
    } catch (error) {
      showAlert('error', `Failed to subscribe with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await subscribeEmail(email, 'email');
      
      if (result.success) {
        setIsSubscribed(true);
        showAlert('success', 'Successfully subscribed to our newsletter!');
      } else {
        setError(result.error || 'Failed to subscribe. Please try again.');
        showAlert('error', result.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      const errorMessage = 'Failed to subscribe. Please try again.';
      setError(errorMessage);
      showAlert('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSubscribed(false);
    setEmail('');
    setError('');
  };

  const handleCloseAlert = () => {
    if (alertTimeoutRef.current) {
      window.clearTimeout(alertTimeoutRef.current);
      alertTimeoutRef.current = null;
    }
    setAlert(null);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://cdn.websparks.ai/3_md-allmamun-TB58c1h-dmg-unsplash-153ea199.png)'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Custom Alert */}
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-accent-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 animate-slide-up">
          {!isSubscribed ? (
            <>
              <Logo />
              
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  Subscribe to My Newsletter
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Get exclusive insights, tips, and updates delivered straight to your inbox. 
                  Join our community of forward-thinking readers.
                </p>
              </div>

              <div className="space-y-6">
                {/* Social signup options */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 text-center font-medium">
                    Quick signup with social media
                  </p>
                  <div className="flex gap-3">
                    <SocialButton
                      icon="bi bi-google"
                      provider="Google"
                      bgColor="bg-red-500"
                      hoverColor="hover:bg-red-600"
                      onClick={() => handleSocialSignup('Google')}
                    />
                    <SocialButton
                      icon="bi bi-facebook"
                      provider="Facebook"
                      bgColor="bg-blue-600"
                      hoverColor="hover:bg-blue-700"
                      onClick={() => handleSocialSignup('Facebook')}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
                  </div>
                </div>

                {/* Email signup */}
                <div className="space-y-4">
                  <InputField
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    icon="bi bi-envelope"
                    error={error}
                  />
                  
                  <SubmitButton
                    isLoading={isLoading}
                    onClick={handleEmailSignup}
                  />
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-brand-50 to-accent-50 rounded-xl p-4 border border-brand-100">
                  <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <i className="bi bi-gift text-brand-600"></i>
                    What you will get:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <i className="bi bi-check text-green-500"></i>
                      Weekly curated content and insights
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="bi bi-check text-green-500"></i>
                      Exclusive tips and resources
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="bi bi-check text-green-500"></i>
                      Early access to new features
                    </li>
                  </ul>
                </div>

                {/* Firebase Connection Status */}
                <FirebaseStatus />
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <FooterLinks />
              </div>
            </>
          ) : (
            <SuccessMessage email={email} onClose={handleCloseSuccess} />
          )}
        </div>

        {/* Powered by Websparks AI */}
        <div className="text-center mt-6">
          <p className="text-sm text-white/80 flex items-center justify-center gap-2 drop-shadow-lg">
            <i className="bi bi-lightning-charge text-brand-400"></i>
            Powered by Websparks AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
