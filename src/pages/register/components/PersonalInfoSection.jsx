import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ 
  formData, 
  errors, 
  onInputChange, 
  passwordStrength 
}) => {
  const getPasswordStrengthColor = () => {
    switch (passwordStrength.level) {
      case 'weak': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'strong': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength.level) {
      case 'weak': return 'Weak password';
      case 'medium': return 'Medium strength';
      case 'strong': return 'Strong password';
      default: return 'Enter password';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={onInputChange}
          error={errors.firstName}
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={onInputChange}
          error={errors.lastName}
          required
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your business email"
        value={formData.email}
        onChange={onInputChange}
        error={errors.email}
        description="We'll use this for account verification and important updates"
        required
      />

      <div className="space-y-2">
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={onInputChange}
          error={errors.password}
          required
        />
        
        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength.score}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${
                passwordStrength.level === 'strong' ? 'text-success' :
                passwordStrength.level === 'medium' ? 'text-warning' : 'text-error'
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
            
            {passwordStrength.suggestions.length > 0 && (
              <div className="text-xs text-muted-foreground">
                <p>Suggestions:</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  {passwordStrength.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={onInputChange}
        error={errors.confirmPassword}
        required
      />
    </div>
  );
};

export default PersonalInfoSection;