import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';

interface TimeSlot {
  open: number;
  close: number;
}

type TradingHours = { [key: string]: TimeSlot };
export type Index = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
  open: number;
  previousClose: number;
  timestamp: number;
  tradingHours: TimeSlot;
};

export type MarketAPIResponse = { timestamp: string; indices: Index[] };

async function market(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const apiKey = process.env.FMP_KEY;
  const timestamp = moment().format();

  const symbols = ['^BVSP', '^GSPC', '^IXIC', '^FTSE'];

  const tradingHours: TradingHours = {
    '^BVSP': {
      open: moment().set({ hour: 14, minute: 0, second: 0, millisecond: 0 }).unix(),
      close: moment().set({ hour: 22, minute: 0, second: 0, millisecond: 0 }).unix(),
    },
    '^GSPC': {
      open: moment().set({ hour: 14, minute: 30, second: 0, millisecond: 0 }).unix(),
      close: moment().set({ hour: 21, minute: 30, second: 0, millisecond: 0 }).unix(),
    },
    '^IXIC': {
      open: moment().set({ hour: 14, minute: 30, second: 0, millisecond: 0 }).unix(),
      close: moment().set({ hour: 21, minute: 30, second: 0, millisecond: 0 }).unix(),
    },
    '^FTSE': {
      open: moment().set({ hour: 8, minute: 0, second: 0, millisecond: 0 }).unix(),
      close: moment().set({ hour: 16, minute: 30, second: 0, millisecond: 0 }).unix(),
    },
  };

  await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      res.json({
        timestamp,
        indices: data.map((index: Index) => ({
          ...index,
          tradingHours: tradingHours[index.symbol] || {},
        })),
      });
    })
    .catch(err => {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      res.json({ err });
    });
}

export default market;
