import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

import { formControlStyles } from './theme';

type FormTextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  showError?: boolean;
  isRequired?: boolean;
};

export const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  showError = false,
  isRequired = false,
}) => (
  <FormControl isInvalid={showError && !!error} isRequired={isRequired}>
    <FormLabel color={formControlStyles.label.color}>{label}</FormLabel>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      {...formControlStyles.input}
      color={formControlStyles.label.color}
    />
    {showError && error && <FormErrorMessage color={formControlStyles.error.color}>{error}</FormErrorMessage>}
  </FormControl>
);
