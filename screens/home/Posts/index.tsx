import { Document } from "@prismicio/client/types/documents";
import { Container, Grid, Box } from "@chakra-ui/react";
import Post from "./Post";

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
							<Post
								key={post.uid}
								doc={post}
								size={index === 0 ? "lg" : index === 1 ? "md" : "sm"}
							/>
						))}
				</Grid>
			</Container>
		</Box>
	);
};
export default Posts;
