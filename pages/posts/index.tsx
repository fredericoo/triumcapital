import type { Document } from "prismic-javascript/types/documents";
import { GetStaticProps } from "next";
import { client } from "app/utils/prismic";
import useCookieToast from "app/utils/hooks/useCookieToast";
import PostsScreen from "app/screens/posts";
import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";

type PostsProps = { data: ApiSearchResponse };

const postsPerPage = 6;

export type FetchedPosts = ApiSearchResponse;
const fetchPosts = async (after: string): Promise<FetchedPosts> => {
	const query = await client.query('[at(document.type,"post")]', {
		fetch: [
			"post.title",
			"post.excerpt",
			"post.author",
			"post.published",
			"post.cover",
			"post.category",
		],
		fetchLinks: ["membro.title"],
		orderings: "[my.post.published desc]",
		after,
		pageSize: postsPerPage,
	});
	return query;
};

const Posts: React.FC<PostsProps> = ({ data }) => {
	useCookieToast();
	if (!data) return null;
	return (
		<PostsScreen
			initialData={[data]}
			fetchMore={fetchPosts}
			totalCount={data.total_results_size}
		/>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const posts = await fetchPosts("");

	return {
		props: {
			data: posts || [],
		},
		revalidate: 600,
	};
};

export default Posts;
