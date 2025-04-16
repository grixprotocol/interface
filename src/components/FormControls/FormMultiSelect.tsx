import { Box, Button, FormControl, FormLabel, HStack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { formControlStyles } from './theme';

type Option = {
  value: string;
  label: string;
  icon?: ReactElement;
  iconUrl?: string;
};

type FormMultiSelectProps = {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  error?: string;
  showError?: boolean;
  isRequired?: boolean;
};

export const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  error,
  showError = false,
  isRequired = false,
}) => {
  const handleToggle = (value: string) => {
    const newValues = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <FormControl isInvalid={showError && !!error} isRequired={isRequired}>
      <HStack justify="start">
        <FormLabel color={formControlStyles.label.color} mb={0}>
          {label}
        </FormLabel>
        {showError && error && <Text color={formControlStyles.error.color}>{error}</Text>}
      </HStack>
      <HStack spacing={2} wrap="wrap" mt={2}>
        {options.map(({ value, label: optionLabel, icon, iconUrl }) => {
          const isSelected = selectedValues.includes(value);
          const buttonStyles = isSelected ? formControlStyles.button.selected : formControlStyles.button.unselected;

          return (
            <Button
              key={value}
              size="sm"
              variant="solid"
              {...buttonStyles}
              color={formControlStyles.label.color}
              borderWidth={0}
              onClick={() => handleToggle(value)}
              leftIcon={iconUrl ? <Box as="img" src={iconUrl} alt={optionLabel} width="16px" height="16px" /> : icon || undefined}
            >
              {optionLabel}
            </Button>
          );
        })}
      </HStack>
    </FormControl>
  );
};
