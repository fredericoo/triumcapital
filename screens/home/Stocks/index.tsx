import useSWR from 'swr';
import { Box } from '@chakra-ui/react';
import { Index, MarketAPIResponse } from 'app/pages/api/market';
import Timeline from './Timeline';

const fetcher = (): Promise<MarketAPIResponse> => fetch('/api/market').then(res => res.json());

const Stocks: React.FC = () => {
  const { data, error } = useSWR('market', fetcher);
  if (error) return null;
  return (
    <Box as="section" py={16}>
      {data?.indices?.map((index: Index) => (
        <Timeline key={index.symbol} index={index} />
      ))}
    </Box>
  );
};

export default Stocks;
