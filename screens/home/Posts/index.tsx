import { Document } from "@prismicio/client/types/documents";
import { Container, Grid, Box, GridItem } from "@chakra-ui/react";
import PostThumb from "app/components/PostThumb";

type PostsProps = { data: Document[] };

const Posts: React.FC<PostsProps> = ({ data }) => {
	return (
		<Box>
			<Container maxW="container.lg">
				<Grid
					gridTemplate={{
						base: `"newest" "second" / 1fr`,
						md: `". newest second" / 1fr 2fr 1fr`,
					}}
					gridGap={6}
				>
					{!!data.length &&
						data.map((post, index) => (
							<GridItem
								gridArea={
									index === 0 ? "newest" : index === 1 ? "second" : "initial"
								}
								gridRow={{ md: index <= 1 ? "1 / 6" : "auto" }}
							>
								<PostThumb
									key={post.uid}
									doc={post}
									withExcerpt={index <= 1}
									withThumb={index <= 1}
									headingSize={index === 0 ? "lg" : "md"}
								/>
							</GridItem>
						))}
				</Grid>
			</Container>
		</Box>
	);
};
export default Posts;
