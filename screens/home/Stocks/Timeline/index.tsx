import { Flex, Square, Box, Heading, Text, styled as chakraStyled } from '@chakra-ui/react';
import styled from '@emotion/styled';
import moment, { Moment } from 'moment';
import { Index } from 'app/pages/api/market';

const Line = styled(Flex)`
  position: relative;
  &:before {
    height: 1px;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 0;
    content: '';
    display: block;
    z-index: -1;
  }
`;

const BottomCaption = chakraStyled(Box, {
  baseStyle: {
    position: 'absolute',
    fontSize: 'xs',
    whiteSpace: 'nowrap',
    transform: 'translateX(-50%)',
  },
});

const formatDecimal = (number: number): string => new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(number);

type CaptionProps = {
  direction: 'left' | 'right';
};

const TopCaption: React.FC<CaptionProps> = ({ children, direction }) => {
  const positionProps = { [direction]: 2, textAlign: direction };
  return (
    <Box position="absolute" fontSize="xs" bottom={2} whiteSpace="nowrap" {...positionProps}>
      {children}
    </Box>
  );
};

type ContentProps = { index: Index };
const Content: React.FC<ContentProps> = ({ index }) => {
  const timeFormat = 'HH:mm';

  const tradingHours = {
    open: moment.unix(index.tradingHours.open),
    close: moment.unix(index.tradingHours.close),
  };
  const indexTime: Moment = moment.min([moment.unix(index.timestamp), tradingHours.close]);

  const getPercentage = (time: Moment): number =>
    (moment.duration(time.diff(moment().startOf('day'))).asMinutes() * 100) / (24 * 60);

  const currentColor =
    getPercentage(indexTime) > getPercentage(tradingHours.open)
      ? index.change > 0
        ? 'positive'
        : 'negative'
      : 'gray.600';

  return (
    <>
      <Box
        width={`${Math.ceil(getPercentage(tradingHours.close)) - Math.ceil(getPercentage(tradingHours.open))}%`}
        height="1px"
        left={`${Math.ceil(getPercentage(tradingHours.open))}%`}
        bg="gray.500"
        position="absolute"
        top="50%"
      />
      <Box position="relative" flexGrow={1}>
        {!!index.open && (
          <Box
            position="absolute"
            left={`${Math.ceil(getPercentage(tradingHours.open))}%`}
            transform="translateX(-50%)"
          >
            <TopCaption direction="right">
              <Heading as="h4" size="xs" color="gray.300" fontFamily="body">
                Abertura
              </Heading>
              <Text letterSpacing="0.03em">{formatDecimal(index.open)}</Text>
            </TopCaption>

            <Square size={2} bg="gray.300" transform="translateY(-50%)" />
            <BottomCaption>
              <Text color="gray.400">{tradingHours.open.format(timeFormat)}</Text>
            </BottomCaption>
          </Box>
        )}
        <Box
          position="absolute"
          left={`${Math.ceil(getPercentage(tradingHours.close))}%`}
          transform="translateX(-50%)"
          transition=".6s ease-out"
        >
          <Square size={2} bg="gray.300" transform="translateY(-50%)" />
          <BottomCaption>
            <Text color="gray.400">{tradingHours.close.format(timeFormat)}</Text>
          </BottomCaption>
        </Box>

        <Box position="absolute" left={`${Math.ceil(getPercentage(indexTime))}%`} transform="translateX(-50%)">
          <TopCaption
            direction={
              getPercentage(indexTime) >
              getPercentage(tradingHours.open) +
                (getPercentage(tradingHours.close) - getPercentage(tradingHours.open)) / 2
                ? 'right'
                : 'left'
            }
          >
            <Heading as="h3" lineHeight="1" color="gray.100">
              {index.symbol}
            </Heading>
            <Heading as="h4" size="sm" fontFamily="body">
              {index.name}
            </Heading>

            <Text fontWeight="bold" letterSpacing="0.03em" color={currentColor}>
              {getPercentage(indexTime) > getPercentage(tradingHours.open)
                ? `${formatDecimal(index.price)} (${index.changesPercentage}%)`
                : `abre em ${Math.ceil(moment.duration(tradingHours.open.diff(indexTime)).asHours())}h`}
            </Text>
          </TopCaption>
          <Square size={2} bg={currentColor} transform="translateY(-50%)" />
          <BottomCaption bg="white">{indexTime.format(timeFormat)}</BottomCaption>
        </Box>
      </Box>
    </>
  );
};

const Timeline = ({ index }: { index: Index }): JSX.Element => (
  <Line py={16} justifyContent="space-between" alignItems="center">
    <Content index={index} />
  </Line>
);

export default Timeline;
