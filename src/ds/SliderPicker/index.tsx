import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, ButtonProps, Flex, IconButton, Spinner, Tooltip } from '@chakra-ui/react';
import { useRef } from 'react';

type Option<T extends string> = {
  value: T;
  label: string;
  tooltip?: string;
};

export type SliderPickerProps<T extends string> = {
  options: Option<T>[];
  onChange: (value: T) => void;
  value?: Option<T>['value'];
  isLoading?: boolean;
  variant?: ButtonProps['variant'];
};

export const SliderPicker = <T extends string>({ options, value, onChange, isLoading, variant }: SliderPickerProps<T>) => {
  const buttonGroupRef = useRef<HTMLDivElement>(null);

  const handleRightScroll = () => {
    if (buttonGroupRef.current) {
      buttonGroupRef.current.scrollTo({
        left: buttonGroupRef.current.scrollLeft + 160,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return <Spinner size="lg" color="primary.200" style={{ marginLeft: 4 }} />;
  }

  return (
    <Flex justify="center" data-component="SliderPicker" w="full">
      <ButtonGroup
        isAttached
        ref={buttonGroupRef}
        overflowX="scroll"
        position="relative"
        borderWidth={1}
        borderColor="gray.700"
        borderRadius="6px"
        borderRightRadius={0}
        borderRightWidth={0}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {options.map((option, index) => (
          <Tooltip key={option.value} label={option.tooltip} aria-label={option.tooltip}>
            <Button
              size="md"
              variant={variant ?? 'buttonGroupBase'}
              minWidth="fit-content"
              key={option.value}
              isActive={option.value === value}
              onClick={() => onChange(option.value)}
              borderRightRadius={index === options.length - 1 ? 0 : undefined}
              fontSize="sm"
            >
              {option.label}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>
      <IconButton
        size="md"
        borderLeftRadius={0}
        position="sticky"
        right="0%"
        top="50%"
        variant="secondary"
        aria-label="Right Label"
        height="42px"
        icon={<ChevronRightIcon />}
        onClick={handleRightScroll}
      />
    </Flex>
  );
};
