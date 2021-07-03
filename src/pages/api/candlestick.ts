import { NextApiRequest, NextApiResponse } from 'next';

export type DailyIndicator = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema: number;
};

async function market(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const apiKey = process.env.FMP_KEY;

  await fetch(
    `https://financialmodelingprep.com/api/v3/historical-chart/1hour/${
      req.body.symbol || '^BVSP'
    }?period=1&type=ema&apikey=${apiKey}`
  )
    .then(res => res.json())
    .then((data: DailyIndicator[]) => {
      res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
      res.json(data);
    })
    .catch(err => {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      res.json({ err });
    });
}

export default market;
