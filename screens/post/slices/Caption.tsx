import { RichTextBlock, RichText } from "prismic-reactjs";
import { Container, Heading, Box } from "@chakra-ui/react";
import Picture from "app/components/Picture";
import Caption from "app/components/Caption";

export type CaptionProps = {
	content: {
		imagem: {
			url: string;
			dimensions: { width: string; height: string };
			alt: string;
		};
		caption: string;
		text: RichTextBlock[];
	};
};
const CaptionSlice: React.FC<CaptionProps> = ({ content }) => (
	<Container maxW="container.sm" as="section" fontSize="sm">
		<Box py={2} borderBlockStart="4px solid" borderBlockStartColor="brand.900">
			{content.imagem.url && (
				<Box mb={4} maxW="200px" as="figure">
					<Picture
						src={content.imagem.url}
						width={content.imagem.dimensions.width}
						height={content.imagem.dimensions.height}
						alt={content.imagem.alt}
						layout="responsive"
					/>
					{content.imagem.alt && <Caption py={2}>{content.imagem.alt}</Caption>}
				</Box>
			)}
			{content.caption && (
				<Heading as="h4" fontFamily="body" size="sm">
					{content.caption}
				</Heading>
			)}
			{content.text && <RichText render={content.text} />}
		</Box>
	</Container>
);

export default CaptionSlice;
