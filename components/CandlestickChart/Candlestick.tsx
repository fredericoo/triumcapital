import { Box, styled, Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";

type CandlestickProps = {
	open: number;
	close: number;
	high: number;
	low: number;
	max: number;
	min: number;
	label: string;
};

const Candle = styled(Box, {
	baseStyle: { position: "absolute", width: "50%", left: "25%" },
});

const Stick = styled(Box, {
	baseStyle: { position: "absolute", width: "1px", left: "calc(50% - .5px)" },
});

const variants = {
	hidden: { scale: 0 },
	show: { scale: 1 },
};
const Line = motion(Box);

const Candlestick: React.FC<CandlestickProps> = ({
	open,
	close,
	high,
	low,
	max,
	min,
	label,
}) => {
	const getPercent = (value: number) => ((value - min) * 100) / (max - min);
	const fillColor = close < open ? "positive" : "negative";

	return (
		<Line
			height="100%"
			position="relative"
			flexGrow={1}
			color="gray.100"
			_hover={{ color: fillColor }}
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
					bottom={`${getPercent(Math.min(open, close))}%`}
					height={`${getPercent(Math.abs(close - open) + min)}%`}
				/>
			</Tooltip>
		</Line>
	);
};

export default Candlestick;
