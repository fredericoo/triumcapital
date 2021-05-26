import { Container } from "@chakra-ui/react";
import VideoEmbed from "app/components/VideoEmbed";
import Caption from "app/components/Caption";

export type EmbedProps = {
	content: {
		title: string;
		html: string;
	};
};

const EmbedSlice: React.FC<EmbedProps> = ({ content }) => {
	return (
		<Container
			maxW="container.md"
			as="section"
			gridColumn="main-start / main-end"
			py={8}
		>
			<VideoEmbed html={content.html} />
			{content.title && <Caption py={2}>{content.title}</Caption>}
		</Container>
	);
};

export default EmbedSlice;
