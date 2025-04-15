export const formControlStyles = {
  input: {
    bg: 'whiteAlpha.50',
    borderColor: 'whiteAlpha.200',
    _hover: { borderColor: 'whiteAlpha.400' },
    _focus: { borderColor: 'blue.400', boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)' },
  },
  button: {
    selected: {
      bg: 'blue.500',
      _hover: { bg: 'blue.600' },
      _active: { bg: 'blue.700' },
    },
    unselected: {
      bg: 'whiteAlpha.50',
      _hover: { bg: 'whiteAlpha.200' },
      _active: { bg: 'whiteAlpha.300' },
    },
  },
  label: {
    color: 'white',
  },
  subText: {
    color: 'whiteAlpha.700',
  },
  error: {
    color: 'red.300',
  },
} as const;
