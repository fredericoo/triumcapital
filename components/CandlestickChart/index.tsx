import useSWR from "swr";
import { Spinner, Flex, useToast } from "@chakra-ui/react";
import { DailyIndicator } from "app/pages/api/candlestick";
import { useEffect, useMemo } from "react";
import Candlestick from "./Candlestick";
import { motion } from "framer-motion";

const fetcher = async (endpoint: string) =>
	fetch(endpoint).then((res) => res.json());

const variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.02,
		},
	},
};

const Wrapper = motion(Flex);

const CandlestickChart: React.FC = () => {
	const { data, error } = useSWR<DailyIndicator[], any>(
		"/api/candlestick",
		fetcher
	);
	const toast = useToast();
	const indicators = useMemo(() => (data ? data.slice(0, 60).reverse() : []), [
		data,
	]);

	const max = indicators.reduce(
		(acc, value) =>
			Math.max(acc, value.high, value.low, value.open, value.close),
		0
	);
	const min = indicators.reduce(
		(acc, value) =>
			Math.min(acc, value.high, value.low, value.open, value.close),
		99999
	);

	useEffect(() => {
		if (error)
			toast({
				id: "candlestick",
				description: "Não foi possível receber dados para montar o gráfico",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
	}, [error]);

	if (error) return null;
	if (!data)
		return (
			<Flex height="100%" alignItems="center" justifyContent="center">
				<Spinner color="gray.200" />
			</Flex>
		);
	return (
		<Wrapper variants={variants} initial="hidden" animate="show" height="100%">
			{indicators.map((indicator) => (
				<Candlestick
					key={indicator.date}
					high={indicator.high}
					low={indicator.low}
					open={indicator.open}
					close={indicator.close}
					max={max}
					min={min}
					label={indicator.date}
				/>
			))}
		</Wrapper>
	);
};

export default CandlestickChart;
