import { CreateAgentFormData } from './types';

export type ValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof CreateAgentFormData, string>>;
};

export const validateForm = (data: CreateAgentFormData): ValidationResult => {
  const errors: Partial<Record<keyof CreateAgentFormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = 'Agent name is required';
  }

  if (!data.budget_usd || Number(data.budget_usd) <= 0) {
    errors.budget_usd = 'Budget must be greater than 0';
  }

  if (!data.assets.length) {
    errors.assets = 'Select at least one asset';
  }

  if (!data.protocols.length) {
    errors.protocols = 'Select at least one protocol';
  }

  if (!data.input_data.length) {
    errors.input_data = 'Select at least one data source';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
