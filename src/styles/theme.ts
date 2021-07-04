import { extendTheme, Theme } from '@chakra-ui/react';

const Button = {
  defaultProps: {
    variant: 'primary',
  },
  baseStyle: {
    borderRadius: '999px',
    padding: '.618em 1.618em',
  },
  sizes: {
    md: {
      px: 6,
      py: 4,
    },
  },
  variants: {
    primary: {
      bg: 'brand.100',
      color: 'black',
      _hover: {
        bg: 'gray.100',
        color: 'black',
      },
    },
  },
};

const Heading = {
  baseStyle: {
    color: 'gray.900',
  },
};

const Link = {
  baseStyle: {
    textUnderlineOffset: '.3em',
  },
};

export type TriumTheme = Theme & {
  colors: {
    brand: Record<string | number, string>;
    positive: string;
    negative: string;
  };
};

const theme = extendTheme({
  fonts: {
    heading: 'reckless, serif',
    body: 'roobert, sans-serif',
  },
  colors: {
    brand: {
      50: '#f6fbfe',
      100: '#ddedff',
      200: '#c8dcf3',
      399: '#b4cbeb',
      400: '#9fbbe3',
      500: '#8aacdb',
      600: '#749cd2',
      700: '#5c8eca',
      800: '#437fc1',
      900: '#2272ba',
    },
    positive: '#2272ba',
    negative: '#fa3817',
  },
  styles: {
    global: {
      body: {
        color: 'gray.700',
      },
    },
  },
  components: {
    Button,
    Heading,
    Link,
  },
  config: {
    cssVarPrefix: 'trium',
  },
});

export default theme;
