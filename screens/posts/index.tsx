import { Document } from "prismic-javascript/types/documents";
import {
	Text,
	VStack,
	Progress,
	Button,
	Grid,
	GridItem,
	Container,
} from "@chakra-ui/react";
import { useSWRInfinite } from "swr";
import PostThumb from "app/components/PostThumb";
import { useMemo, useState, useEffect } from "react";
import SEO from "app/components/SEO";
import { FetchedPosts } from "app/pages/posts";

type PostsProps = {
	initialData: FetchedPosts[];
	totalCount: number;
	fetchMore: (after: string) => Promise<FetchedPosts>;
};

const getKey = (_pageIndex: number, previousPageData: FetchedPosts | null) => {
	if (!previousPageData?.results) return "beginning";
	return previousPageData.results[previousPageData.results.length - 1].id;
};

const PostsScreen: React.FC<PostsProps> = ({
	initialData,
	fetchMore,
	totalCount = 999,
}) => {
	const { data, size, setSize } = useSWRInfinite<FetchedPosts>(
		getKey,
		fetchMore,
		{
			initialData,
		}
	);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => setIsLoading(false), [data]);

	const posts = useMemo<Document[] | undefined>(() => {
		const results = data?.map((response) => response.results);
		if (!results) return [];
		return results.flat();
	}, [data, size]);

	const postCount = posts?.length ? Math.min(posts?.length, totalCount) : 0;

	return (
		<Container maxW="container.lg" pt={8}>
			<SEO title="Posts" />
			<Grid
				templateColumns={{
					base: "1fr",
					md: "1fr 1fr",
					lg: "1fr 1fr 1fr",
				}}
				columnGap={6}
				rowGap={12}
			>
				{posts?.map((doc: Document, index: number) => (
					<GridItem
						key={doc.uid}
						gridColumn={{
							lg: index === 0 ? "span 3" : index === 1 ? "span 2" : "initial",
						}}
					>
						<PostThumb
							doc={doc}
							withThumb
							thumbFormat={index < 2 ? "rectangle" : "square"}
							withExcerpt={index <= 1}
							headingSize={index === 0 ? "lg" : "md"}
						/>
					</GridItem>
				))}
			</Grid>

			<VStack spacing={4} py={8}>
				<Text
					textAlign="center"
					fontSize="xs"
					letterSpacing="wider"
					color="gray.700"
				>
					Mostrando {postCount} de {totalCount} posts
				</Text>
				<Progress
					value={postCount}
					max={totalCount}
					size="md"
					width={36}
					height={1}
				/>
				{postCount < totalCount && (
					<Button
						onClick={() => (setIsLoading(true), setSize(size + 1))}
						size="sm"
						px={6}
						py={4}
						variant="outline"
						isLoading={isLoading}
					>
						Carregar mais
					</Button>
				)}
			</VStack>
		</Container>
	);
};

export default PostsScreen;
