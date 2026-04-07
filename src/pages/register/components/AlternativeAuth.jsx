import React from 'react';
import Button from '../../../components/ui/Button';


const AlternativeAuth = ({ onGoogleSignUp, onMicrosoftSignUp, loading }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={onGoogleSignUp}
          disabled={loading}
          className="w-full"
          iconName="Chrome"
          iconPosition="left"
          iconSize={18}
        >
          Google
        </Button>

        <Button
          variant="outline"
          onClick={onMicrosoftSignUp}
          disabled={loading}
          className="w-full"
          iconName="Windows"
          iconPosition="left"
          iconSize={18}
        >
          Microsoft
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          By signing up, you agree to our{' '}
          <a href="/terms" className="text-primary hover:underline font-medium">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary hover:underline font-medium">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AlternativeAuth;