import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

interface TimeSlot {
	open: string;
	close: string;
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
	tradingHours?: TimeSlot;
};

async function market(req: NextApiRequest, res: NextApiResponse) {
	const apiKey = process.env.FMP_KEY;
	const timestamp = moment().format();

	const symbols = ["^FTSE", "^BVSP", "^STOXX50E"];

	const tradingHours: TradingHours = {
		"^FTSE": { open: "06:00:00", close: "14:55:00" },
		"^BVSP": { open: "10:00:00", close: "17:55:00" },
		"^STOXX50E": { open: "06:00:00", close: "17:55:00" },
	};

	await fetch(
		`https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${apiKey}`
	)
		.then((res) => res.json())
		.then((data) => {
			res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
			res.json({
				timestamp,
				indices: data.map((index: Index) => ({
					...index,
					tradingHours: tradingHours[index.symbol] || {},
				})),
			});
		})
		.catch((err) => {
			res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
			res.json({ err });
		});
}

export default market;
