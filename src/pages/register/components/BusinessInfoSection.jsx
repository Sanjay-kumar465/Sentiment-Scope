import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BusinessInfoSection = ({ 
  formData, 
  errors, 
  onInputChange, 
  onSelectChange,
  showAdditionalFields 
}) => {
  const industryOptions = [
    { value: '', label: 'Select your industry' },
    { value: 'technology', label: 'Technology & Software' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'education', label: 'Education & Training' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'manufacturing', label: 'Manufacturing & Industrial' },
    { value: 'consulting', label: 'Consulting & Professional Services' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'nonprofit', label: 'Non-profit & Government' },
    { value: 'other', label: 'Other' }
  ];

  const teamSizeOptions = [
    { value: '', label: 'Select team size' },
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const roleOptions = [
    { value: '', label: 'Select your role' },
    { value: 'ceo', label: 'CEO/Founder' },
    { value: 'manager', label: 'Manager/Director' },
    { value: 'analyst', label: 'Business Analyst' },
    { value: 'marketing', label: 'Marketing Professional' },
    { value: 'researcher', label: 'Market Researcher' },
    { value: 'customer-service', label: 'Customer Service Manager' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'data-analyst', label: 'Data Analyst' },
    { value: 'other', label: 'Other' }
  ];

  const useCaseOptions = [
    { value: 'customer-feedback', label: 'Customer Feedback Analysis' },
    { value: 'social-media', label: 'Social Media Monitoring' },
    { value: 'product-reviews', label: 'Product Review Analysis' },
    { value: 'market-research', label: 'Market Research' },
    { value: 'brand-monitoring', label: 'Brand Sentiment Monitoring' },
    { value: 'employee-feedback', label: 'Employee Feedback Analysis' },
    { value: 'survey-analysis', label: 'Survey Response Analysis' },
    { value: 'other', label: 'Other Use Cases' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Business Information</h3>
      
      <Input
        label="Company Name"
        type="text"
        name="companyName"
        placeholder="Enter your company name"
        value={formData.companyName}
        onChange={onInputChange}
        error={errors.companyName}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Industry"
          options={industryOptions}
          value={formData.industry}
          onChange={(value) => onSelectChange('industry', value)}
          error={errors.industry}
          required
        />
        
        <Select
          label="Team Size"
          options={teamSizeOptions}
          value={formData.teamSize}
          onChange={(value) => onSelectChange('teamSize', value)}
          error={errors.teamSize}
          required
        />
      </div>

      {showAdditionalFields && (
        <div className="space-y-4 animate-slide-down">
          <Select
            label="Your Role"
            options={roleOptions}
            value={formData.role}
            onChange={(value) => onSelectChange('role', value)}
            error={errors.role}
            description="This helps us customize your experience"
          />

          <Select
            label="Primary Use Case"
            options={useCaseOptions}
            value={formData.useCase}
            onChange={(value) => onSelectChange('useCase', value)}
            error={errors.useCase}
            description="What will you primarily use SentimentScope for?"
            searchable
          />

          {formData.industry === 'other' && (
            <Input
              label="Specify Industry"
              type="text"
              name="customIndustry"
              placeholder="Please specify your industry"
              value={formData.customIndustry}
              onChange={onInputChange}
              error={errors.customIndustry}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessInfoSection;