import { Flex, Square, Box, Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import moment, { Moment } from "moment";
import { Index } from "app/pages/api/market";

const Line = styled(Flex)`
	position: relative;
	&:before {
		height: 1px;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 50%;
		left: 0;
		content: "";
		display: block;
		z-index: -1;
	}
`;

const BottomCaption: React.FC = ({ children }) => (
	<Box
		position="absolute"
		fontSize="xs"
		whiteSpace="nowrap"
		transform="translateX(-50%)"
	>
		{children}
	</Box>
);

type CaptionProps = {
	direction: "left" | "right";
};

const TopCaption: React.FC<CaptionProps> = ({ children, direction }) => {
	const positionProps = { [direction]: 2, textAlign: direction };
	return (
		<Box
			position="absolute"
			fontSize="xs"
			bottom={2}
			whiteSpace="nowrap"
			{...positionProps}
		>
			{children}
		</Box>
	);
};

const Current = ({ index }: { index: Index }) => {
	const timeFormat = "HH:mm";
	const hoursOpen = index.tradingHours?.open
		.split(":")
		.map((i) => +i)
		.reduce((acc, cur) => +acc + cur / 60);
	const hoursClose = index.tradingHours?.close
		.split(":")
		.map((i) => +i)
		.reduce((acc, cur) => +acc + cur / 60);

	const tradingHours = {
		open: moment().startOf("day").add(hoursOpen, "hours"),
		close: moment().startOf("day").add(hoursClose, "hours"),
	};
	const indexTime: Moment = moment.min([
		moment.unix(index.timestamp),
		tradingHours.close,
	]);

	const percentageOfDay = (time: Moment) =>
		(moment.duration(time.diff(moment().startOf("day"))).asMinutes() * 100) /
		(24 * 60);

	return (
		<>
			<Box
				width={`${
					Math.ceil(percentageOfDay(tradingHours.close)) -
					Math.ceil(percentageOfDay(tradingHours.open))
				}%`}
				height="1px"
				left={`${Math.ceil(percentageOfDay(tradingHours.open))}%`}
				bg="gray.500"
				position="absolute"
				top="50%"
			/>
			<Box position="relative" flexGrow={1}>
				{!!index.open && (
					<Box
						position="absolute"
						left={`${Math.ceil(percentageOfDay(tradingHours.open))}%`}
						transform="translateX(-50%)"
					>
						<TopCaption direction="right">
							<Heading as="h4" size="xs" color="gray.300" fontFamily="body">
								Abertura
							</Heading>
							<Text letterSpacing="0.03em">{index.open}</Text>
						</TopCaption>

						<Square size={2} bg="gray.300" transform="translateY(-50%)" />
						<BottomCaption>
							<Text color="gray.400">
								{tradingHours.open.format(timeFormat)}
							</Text>
						</BottomCaption>
					</Box>
				)}
				<Box
					position="absolute"
					left={`${Math.ceil(percentageOfDay(tradingHours.close))}%`}
					transform="translateX(-50%)"
				>
					<Square size={2} bg="gray.300" transform="translateY(-50%)" />
					<BottomCaption>{tradingHours.close.format(timeFormat)}</BottomCaption>
				</Box>

				<Box
					position="absolute"
					left={`${Math.ceil(percentageOfDay(indexTime))}%`}
					transform="translateX(-50%)"
				>
					<TopCaption
						direction={percentageOfDay(indexTime) > 50 ? "right" : "left"}
					>
						<Heading as="h3" lineHeight="1" color="gray.200">
							{index.symbol}
						</Heading>
						<Text
							fontWeight="bold"
							letterSpacing="0.03em"
							color={index.change > 0 ? "positive" : "negative"}
						>
							{index.price} ({index.changesPercentage}%)
						</Text>
					</TopCaption>
					<Square
						size={2}
						bg={index.change > 0 ? "positive" : "negative"}
						transform="translateY(-50%)"
					/>
					<BottomCaption>{indexTime.format(timeFormat)}</BottomCaption>
				</Box>
			</Box>
		</>
	);
};

const Timeline = ({ index }: { index: Index }): JSX.Element => (
	<Line py={16} justifyContent="space-between" alignItems="center">
		<Current index={index} />
	</Line>
);

export default Timeline;
