import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationSuccess = ({ email, onContinue, onResendEmail, resendLoading }) => {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Account Created Successfully!</h2>
        <p className="text-muted-foreground">
          We've sent a verification email to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={20} className="text-primary mt-0.5" />
          <div className="text-left">
            <h4 className="text-sm font-semibold text-foreground">Check your email</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Click the verification link in your email to activate your account and start analyzing sentiment data.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Icon name="Clock" size={20} className="text-warning mt-0.5" />
          <div className="text-left">
            <h4 className="text-sm font-semibold text-foreground">Email not received?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Check your spam folder or click resend below. The link expires in 24 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          onClick={onContinue}
          className="w-full"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Dashboard
        </Button>

        <Button
          variant="outline"
          onClick={onResendEmail}
          loading={resendLoading}
          className="w-full"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Resend Verification Email
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        <p>
          Need help? Contact our support team at{' '}
          <a href="mailto:support@sentimentscope.com" className="text-primary hover:underline">
            support@sentimentscope.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;