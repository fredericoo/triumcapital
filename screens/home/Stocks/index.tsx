import useSWR from "swr";
import Timeline from "./Timeline";
import { Box } from "@chakra-ui/react";
import { Index } from "app/pages/api/market";

const fetcher = () => fetch("/api/market").then((res) => res.json());

const Stocks = () => {
	const { data, error } = useSWR("market", fetcher);
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
