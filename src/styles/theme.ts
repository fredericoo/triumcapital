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
    sm: {
      px: 4,
      pt: 2,
      pb: 2.5,
    },
    md: {
      px: 6,
      pt: 4,
      pb: 5,
    },
  },
  variants: {
    primary: {
      bg: 'brand.900',
      color: 'white',
      _hover: {
        bg: 'brand.700',
        transform: 'scale(1.05)',
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
