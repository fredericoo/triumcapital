import { Box, styled, Tooltip, useTheme } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type CandlestickProps = {
  open: number;
  close: number;
  high: number;
  low: number;
  max: number;
  min: number;
  label: ReactNode;
};

const Candle = styled(Box, {
  baseStyle: { position: 'absolute', width: '50%', left: '25%' },
});

const Stick = styled(Box, {
  baseStyle: { position: 'absolute', width: '1px', left: 'calc(50% - .5px)' },
});

const Line = motion(Box);

const Candlestick: React.FC<CandlestickProps> = ({ open, close, high, low, max, min, label }) => {
  const theme = useTheme();

  const getPercent = (value: number): number => ((value - min) * 100) / (max - min);
  const fillColor = close < open ? 'positive' : 'negative';
  const variants = {
    hidden: {},
    show: {
      opacity: [0.25, 0.25, 0.25, 1],
      color: [theme.colors.gray['100'], theme.colors[fillColor], theme.colors.gray['100'], theme.colors.gray['100']],
    },
  };

  return (
    <Line
      sx={{ '--candlestick-color': 'red' }}
      height="100%"
      position="relative"
      flexGrow={1}
      color="gray.100"
      variants={variants}
    >
      <Stick
        bg="gray.300"
        bottom={`${getPercent(Math.min(high, low))}%`}
        height={`${getPercent(Math.abs(high - low) + min)}%`}
      />
      <Tooltip label={label}>
        <Candle
          bg="currentColor"
          _hover={{ bg: fillColor }}
          bottom={`${getPercent(Math.min(open, close))}%`}
          height={`${getPercent(Math.abs(close - open) + min)}%`}
        />
      </Tooltip>
    </Line>
  );
};

export default Candlestick;
