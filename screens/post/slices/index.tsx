import { Grid } from "@chakra-ui/react";
import TextSlice, { TextProps } from "./Text";
import CaptionSlice, { CaptionProps } from "./Caption";
import QuoteSlice, { QuoteProps } from "./Quote";
import ImageSlice, { ImageProps } from "./Image";
import EmbedSlice, { EmbedProps } from "./Embed";

type BaseSlice = { items: {}[]; primary: {}; slice_type: string };
type TextSlice = BaseSlice & {
	primary: { text: TextProps["content"] };
};
type CaptionSlice = BaseSlice & {
	primary: CaptionProps["content"];
};
type QuoteSlice = BaseSlice & {
	primary: QuoteProps["content"];
};
type ImageSlice = BaseSlice & {
	primary: ImageProps["content"];
};
type EmbedSlice = BaseSlice & {
	primary: { url: EmbedProps["content"] };
};

type Slice = TextSlice & CaptionSlice & QuoteSlice & ImageSlice & EmbedSlice;

type SlicesProps = {
	body: Slice[];
};

const Slices: React.FC<SlicesProps> = ({ body }) => {
	const renderSlice: Record<string, (slice: Slice) => JSX.Element> = {
		text: ({ primary }: TextSlice) => <TextSlice content={primary.text} />,
		caption: ({ primary }: CaptionSlice) => <CaptionSlice content={primary} />,
		quote: ({ primary }: QuoteSlice) => <QuoteSlice content={primary} />,
		image: ({ primary }: ImageSlice) => <ImageSlice content={primary} />,
		embed_de_video: ({ primary }: EmbedSlice) => (
			<EmbedSlice content={primary.url} />
		),
	};
	return (
		<Grid
			py={8}
			gridTemplateColumns={{
				base: "[screen-start main-start] 1fr [main-end screen-end]",
				lg:
					"[screen-start] .5fr [main-start] minmax(33ch, 66ch) [main-end] 1fr [screen-end]",
				xl:
					"[screen-start] 1fr [main-start] minmax(33ch, 77ch) [main-end] 1fr [screen-end]",
			}}
			rowGap={{ base: 8, md: 0 }}
		>
			{body.map(
				(slice: Slice) =>
					renderSlice[slice.slice_type] && renderSlice[slice.slice_type](slice)
			)}
		</Grid>
	);
};
export default Slices;
