import { RichTextBlock, RichText } from "prismic-reactjs";
import { Grid, GridItem, Heading, Box } from "@chakra-ui/react";

const Number = ({
	heading,
	text,
}: {
	heading: RichTextBlock[];
	text: RichTextBlock[];
}) => (
	<Grid templateColumns="repeat(4, 1fr)">
		<GridItem gridColumn="1/-1">
			<Heading as="h3" size="4xl" fontFamily="body">
				{RichText.asText(heading)}
			</Heading>
		</GridItem>
		<GridItem gridColumn="2/-1">
			<Box color="gray.500">
				<RichText render={text} />
			</Box>
		</GridItem>
	</Grid>
);

export default Number;
