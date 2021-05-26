import { RichTextBlock, RichText } from "prismic-reactjs";
import { Stack, Heading } from "@chakra-ui/react";
import Picture from "app/components/Picture";

const Pillar = ({
	image,
	heading,
	text,
}: {
	image: { url: string };
	heading: RichTextBlock[];
	text: RichTextBlock[];
}) => (
	<Stack spacing={4}>
		<Picture src={image.url} width={800} height={400} objectFit="contain" />
		<Heading as="h3" size="md" fontFamily="body" fontWeight="normal">
			{RichText.asText(heading)}
		</Heading>

		<RichText render={text} />
	</Stack>
);

export default Pillar;
