import { BoxProps, FlexProps } from '@chakra-ui/react';

export const configDesign = {
  OPTION_COLORS: ['#2ED3B7', '#f08d8d'],
  colorGreen: 'green',
  colorRed: 'red',
  textStyle: {
    color: '#98A2B3',
    fontSize: '12px',
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: '18px',
    wordWrap: 'break-word' as const,
  },

  activeStyle: {
    color: 'white',
    fontWeight: '550',
    letterSpacing: '0.7px',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  hoverStyle: {
    color: '#D9E9FF',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
export const menuButtonStyle = {
  color: 'white',
  variant: 'outline',
  borderColor: 'blue.300',
  backgroundColor: 'gray.800',
  _hover: {
    backgroundColor: 'blue.500',
    borderColor: 'blue.600',
  },
  _focus: {
    backgroundColor: 'blue.500',
    borderColor: 'blue.600',
  },
  _expanded: {
    backgroundColor: 'blue.500',
  },
};

export const menuItemStyle = {
  backgroundColor: 'gray.700',
  variant: 'outline',
  borderColor: 'blue.300',
  color: 'white',
  _hover: {
    backgroundColor: 'blue.500',
    color: 'gray.800',
  },
  _focus: {
    backgroundColor: 'blue.600',
    color: 'gray.800',
  },
};

export const widthValuesObject = {
  base: '75%',
  md: '45%',
  lg: '35%',
};

export const layoutConstants = {
  headerHeight: '64px',
  footerHeight: '64px',
  mainContentHeight: 'calc(100vh - 128px)',
};

export const getBadgeColor = (points: number): string => (points < 80 ? 'gray' : '#FDB022');

// const bg = useColorModeValue("black", "gray.800");
export const componentStyleVariants = {
  header: {
    headerFlexStyle: {
      h: layoutConstants.headerHeight,
      bg: 'rgba(0, 0, 0, 0.8)',
      borderBottom: '1px',
      justifyContent: 'space-between',
      top: 0,
    } as FlexProps,
  },
  footer: {
    boxStyle: {
      width: '100%',
      height: layoutConstants.footerHeight,
      display: 'flex',
      justifyContent: 'flex-end',
      bg: 'black',
      alignItems: 'center',
      borderTop: '1px',
      borderColor: 'gray.700',
      position: 'fixed',
      zIndex: 1,
      bottom: 0,
    } as BoxProps,
    copyrightTextStyle: {
      color: '#344054',
      fontSize: { base: 'sm', md: '12px' },
      fontFamily: 'Inter',
      fontWeight: '600',
      width: { base: '30vw', md: '15vw' },
      textAlign: { base: 'center', md: 'left' },
    } as BoxProps,
  },
};
