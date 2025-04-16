import { Button, ButtonGroup, ButtonGroupProps, ButtonProps, Tooltip } from '@chakra-ui/react';

type Option<T extends string> = {
  value: T;
  label: string;
  variant?: ButtonProps['variant'];
  colorScheme?: ButtonProps['colorScheme'];
  isDisabled?: boolean;
  color?: string;
  tooltip?: string;
};

export type OptionButtonTabProps<T extends string> = {
  value: Option<T>['value'];
  options: Option<T>[];
  onChange: (value: T) => void;
  buttonProps?: ButtonProps;
} & Pick<ButtonGroupProps, 'width' | 'size'>;

const ButtonWithTooltip = <T extends string>({
  option,
  isActive,
  index,
  buttonProps,
  onChange,
}: {
  option: Option<T>;
  isActive: boolean;
  index: number;
  buttonProps?: ButtonProps;
  onChange: (value: T) => void;
}) => {
  const button = (
    <Button
      width="100%"
      size="md"
      isActive={isActive}
      isDisabled={option.isDisabled ? true : false}
      colorScheme={option.colorScheme ?? 'blue'}
      variant={option.variant ?? getButtonVariant(index, isActive)}
      onClick={() => onChange(option.value)}
      {...buttonProps}
    >
      {option.label}
    </Button>
  );

  if (option.isDisabled) {
    return <Tooltip label={option.tooltip ?? 'Coming soon'}>{button}</Tooltip>;
  }

  return button;
};

export const OptionButtonTab = <T extends string>({ value, options, onChange, buttonProps, ...rest }: OptionButtonTabProps<T>) => (
  <ButtonGroup isAttached {...rest}>
    {options.map((option, index) => (
      <ButtonWithTooltip
        key={option.value}
        option={option}
        isActive={value === option.value}
        index={index}
        buttonProps={buttonProps}
        onChange={onChange}
      />
    ))}
  </ButtonGroup>
);

const getButtonVariant = (index: number, isActive: boolean) => {
  if (isActive) {
    return index === 0 ? 'primary' : 'error';
  }

  return 'secondary';
};
