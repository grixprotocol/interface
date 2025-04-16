import { FormControl, FormErrorMessage, FormLabel, HStack, NumberInput, NumberInputField, Text } from '@chakra-ui/react';

import { formControlStyles } from './theme';

type FormNumberInputProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  unit?: string;
  error?: string;
  showError?: boolean;
  isRequired?: boolean;
};

export const FormNumberInput: React.FC<FormNumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  unit,
  error,
  showError = false,
  isRequired = false,
}) => (
  <FormControl isInvalid={showError && !!error} isRequired={isRequired}>
    <FormLabel color={formControlStyles.label.color}>{label}</FormLabel>
    <HStack>
      <NumberInput value={value} onChange={onChange} min={min} max={max}>
        <NumberInputField {...formControlStyles.input} color={formControlStyles.label.color} />
      </NumberInput>
      {unit && <Text color={formControlStyles.subText.color}>{unit}</Text>}
    </HStack>
    {showError && error && <FormErrorMessage color={formControlStyles.error.color}>{error}</FormErrorMessage>}
  </FormControl>
);
