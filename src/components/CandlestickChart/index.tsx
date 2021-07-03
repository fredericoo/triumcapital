import useSWR from 'swr';
import { Spinner, Flex, useToast, Text, Box } from '@chakra-ui/react';
import { DailyIndicator } from '@/pages/api/candlestick';
import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Candlestick from './Candlestick';
import moment from 'moment';

const fetcher = async (endpoint: string): Promise<DailyIndicator[]> => fetch(endpoint).then(res => res.json());

const variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const Wrapper = motion(Flex);

const CandlestickChart: React.FC = () => {
  const { data, error } = useSWR<DailyIndicator[], string>('/api/candlestick', fetcher);
  const toast = useToast();
  const indicators = useMemo(() => (Array.isArray(data) ? data?.slice(0, 42).reverse() : []), [data]);

  const max = indicators.reduce((acc, value) => Math.max(acc, value.high, value.low, value.open, value.close), 0);
  const min = indicators.reduce(
    (acc, value) => Math.min(acc, value.high, value.low, value.open, value.close),
    999999999
  );

  useEffect(() => {
    if (error)
      toast({
        id: 'candlestick',
        description: 'Não foi possível receber dados para montar o gráfico',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
  }, [error, toast]);

  if (error) return null;
  if (!data)
    return (
      <Flex height="100%" alignItems="center" justifyContent="center">
        <Spinner color="gray.200" />
      </Flex>
    );
  return (
    <Box position="relative" height="100%">
      <Wrapper variants={variants} initial="hidden" animate="show" height="100%">
        {indicators.map(indicator => (
          <Candlestick
            key={indicator.date}
            high={indicator.high}
            low={indicator.low}
            open={indicator.open}
            close={indicator.close}
            max={max}
            min={min}
            label={
              <>
                <Text fontSize="xs">{moment(indicator.date, 'YYYY-MM-DD hh:mm:ss').format('DD MMM hh:mm')}</Text>
                <Text>{new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(indicator.close)}</Text>
              </>
            }
          />
        ))}
      </Wrapper>
      <Text
        position="absolute"
        bottom="0"
        right="0"
        fontSize="xs"
        p={4}
        letterSpacing="wide"
        color={{ base: 'gray.300', md: 'gray.500' }}
      >
        IBOVESPA, por hora
      </Text>
    </Box>
  );
};

export default CandlestickChart;
