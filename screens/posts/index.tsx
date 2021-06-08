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
import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import { useSWRInfinite } from "swr";
import PostThumb from "app/components/PostThumb";
import PostSkeleton from "./PostSkeleton";
import { useMemo } from "react";
import SEO from "app/components/SEO";

type PostsProps = {
	posts: Document[];
	totalCount: number;
	perPage: number;
	fetchMore: (after: string) => Promise<ApiSearchResponse>;
};

const PostsScreen: React.FC<PostsProps> = ({
	fetchMore,
	perPage,
	posts,
	totalCount,
}) => {
	const getKey = (
		_pageIndex: number,
		previousPageData: ApiSearchResponse | null
	) => {
		if (previousPageData && !previousPageData.results.length) return null;
		const lastId = previousPageData?.results
			? [...previousPageData?.results].pop()?.id
			: [...posts].pop()?.id;
		return lastId || "beginning";
	};
	const { data, size, setSize } = useSWRInfinite(getKey, fetchMore, {
		initialSize: 0,
	});
	const postCount = Math.min(posts.length + size * perPage, totalCount);
	const showingCount = useMemo(() => {
		const dataLength = Array.isArray(data)
			? data.reduce(
					(a: number, b: ApiSearchResponse) => a + b.results.length,
					0
			  )
			: 0;
		return posts.length + dataLength;
	}, [data, posts]);

	const skeletons = new Array(postCount - showingCount).fill(0);

	return (
		<Container maxW="container.lg" pt={8}>
			<SEO title="Posts" />
			<Grid
				templateColumns={{
					base: "1fr",
					md: "1fr 1fr",
					lg: "1fr 1fr 1fr 1fr",
				}}
				gridGap={6}
			>
				{posts?.map((doc: Document, index) => (
					<GridItem
						key={doc.uid}
						gridColumn={{ lg: index === 0 ? "span 2" : "initial" }}
					>
						<PostThumb
							doc={doc}
							withThumb
							withExcerpt
							headingSize={index === 0 ? "lg" : "md"}
						/>
					</GridItem>
				))}
				{data?.map(({ results }: ApiSearchResponse) =>
					results.map((doc: Document) => (
						<PostThumb key={doc.uid} doc={doc} withThumb headingSize="md" />
					))
				)}
				{skeletons.map((_, index) => (
					<PostSkeleton key={index} />
				))}
			</Grid>

			<VStack spacing={4} py={8}>
				<Text
					textAlign="center"
					fontSize="xs"
					letterSpacing="wider"
					color="gray.700"
				>
					Mostrando {showingCount} de {totalCount} posts
				</Text>
				<Progress
					value={showingCount}
					max={totalCount}
					size="md"
					width={36}
					height={1}
				/>
				{postCount < totalCount && (
					<Button
						onClick={() => setSize(size + 1)}
						size="sm"
						px={6}
						py={4}
						variant="outline"
					>
						Carregar mais
					</Button>
				)}
			</VStack>
		</Container>
	);
};

export default PostsScreen;
