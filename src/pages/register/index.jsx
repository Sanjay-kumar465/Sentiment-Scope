import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';
import PersonalInfoSection from './components/PersonalInfoSection';
import BusinessInfoSection from './components/BusinessInfoSection';
import TrustSignals from './components/TrustSignals';
import AlternativeAuth from './components/AlternativeAuth';
import ProgressIndicator from './components/ProgressIndicator';
import RegistrationSuccess from './components/RegistrationSuccess';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    industry: '',
    teamSize: '',
    role: '',
    useCase: '',
    customIndustry: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    level: 'none',
    suggestions: []
  });

  // Mock credentials for testing
  const mockCredentials = {
    email: 'demo@business.com',
    password: 'Business123!',
    firstName: 'John',
    lastName: 'Smith',
    companyName: 'Demo Analytics Corp'
  };

  useEffect(() => {
    // Show additional fields after industry and team size are selected
    if (formData.industry && formData.teamSize) {
      setShowAdditionalFields(true);
    }
  }, [formData.industry, formData.teamSize]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    const suggestions = [];

    if (password.length < 8) {
      suggestions.push('Use at least 8 characters');
    } else {
      score += 25;
    }

    if (!/[a-z]/.test(password)) {
      suggestions.push('Add lowercase letters');
    } else {
      score += 25;
    }

    if (!/[A-Z]/.test(password)) {
      suggestions.push('Add uppercase letters');
    } else {
      score += 25;
    }

    if (!/[0-9]/.test(password)) {
      suggestions.push('Add numbers');
    } else {
      score += 12.5;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      suggestions.push('Add special characters');
    } else {
      score += 12.5;
    }

    let level = 'weak';
    if (score >= 75) level = 'strong';
    else if (score >= 50) level = 'medium';

    return { score, level, suggestions };
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Info Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Business Info Validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select your industry';
    }

    if (!formData.teamSize) {
      newErrors.teamSize = 'Please select your team size';
    }

    if (formData.industry === 'other' && !formData.customIndustry.trim()) {
      newErrors.customIndustry = 'Please specify your industry';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      setShowSuccess(true);
      setCurrentStep(3);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign up failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignUp = async () => {
    setLoading(true);
    try {
      // Simulate Microsoft OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      console.error('Microsoft sign up failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      // Simulate resend email
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setResendLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const isFormValid = () => {
    return formData.firstName.trim() &&
           formData.lastName.trim() &&
           formData.email.trim() &&
           formData.password &&
           formData.confirmPassword &&
           formData.password === formData.confirmPassword &&
           formData.companyName.trim() &&
           formData.industry &&
           formData.teamSize &&
           formData.agreeToTerms &&
           passwordStrength.level !== 'weak';
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <RegistrationSuccess
            email={formData.email}
            onContinue={handleContinue}
            onResendEmail={handleResendEmail}
            resendLoading={resendLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} color="white" />
                </div>
                <span className="text-2xl font-bold text-foreground">SentimentScope</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
              <p className="text-muted-foreground">
                Start analyzing sentiment data and gain valuable business insights
              </p>
            </div>

            {/* Progress Indicator */}
            <ProgressIndicator currentStep={currentStep} totalSteps={3} />

            {/* Demo Credentials Notice */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-primary mb-1">Demo Credentials Available</p>
                  <p className="text-muted-foreground text-xs">
                    For testing: {mockCredentials.email} / {mockCredentials.password}
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <PersonalInfoSection
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                passwordStrength={passwordStrength}
              />

              <BusinessInfoSection
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                showAdditionalFields={showAdditionalFields}
              />

              {/* Terms and Newsletter */}
              <div className="space-y-3">
                <Checkbox
                  label="I agree to the Terms of Service and Privacy Policy"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange(e)}
                  name="agreeToTerms"
                  error={errors.agreeToTerms}
                  required
                />

                <Checkbox
                  label="Subscribe to our newsletter for product updates and insights"
                  checked={formData.subscribeNewsletter}
                  onChange={(e) => handleInputChange(e)}
                  name="subscribeNewsletter"
                  description="Get weekly sentiment analysis tips and industry insights"
                />
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                  <p className="text-sm text-error">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={loading}
                disabled={!isFormValid() || loading}
                className="w-full"
                iconName="UserPlus"
                iconPosition="left"
              >
                Create Account
              </Button>

              {/* Alternative Auth */}
              <AlternativeAuth
                onGoogleSignUp={handleGoogleSignUp}
                onMicrosoftSignUp={handleMicrosoftSignUp}
                loading={loading}
              />

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Trust Signals */}
        <div className="hidden lg:flex lg:w-96 bg-muted/30 p-8 items-center">
          <div className="w-full">
            <TrustSignals />
            
            {/* Additional Features */}
            <div className="mt-8 space-y-4">
              <h4 className="text-lg font-semibold text-foreground">What you'll get:</h4>
              
              <div className="space-y-3">
                {[
                  { icon: 'BarChart3', title: 'Real-time Analytics', desc: 'Instant sentiment analysis results' },
                  { icon: 'Users', title: 'Team Collaboration', desc: 'Share insights with your team' },
                  { icon: 'Download', title: 'Export Reports', desc: 'Download detailed sentiment reports' },
                  { icon: 'Zap', title: 'API Access', desc: 'Integrate with your existing tools' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={feature.icon} size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;