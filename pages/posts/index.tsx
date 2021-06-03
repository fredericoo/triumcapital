import { GetStaticProps } from "next";
import { client } from "app/utils/prismic";
import useCookieToast from "app/utils/hooks/useCookieToast";
import PostsScreen from "app/screens/posts";
import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";

type PostsProps = { data: ApiSearchResponse };

const postsPerPage = 8;

const fetchPosts = async (after: string, perPage: number = 8) =>
	await client.query('[at(document.type,"post")]', {
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
		pageSize: perPage,
	});

const Posts: React.FC<PostsProps> = ({ data }) => {
	useCookieToast();
	if (!data) return null;
	return (
		<PostsScreen
			perPage={postsPerPage}
			posts={data.results}
			fetchMore={fetchPosts}
			totalCount={data.total_results_size}
		/>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const posts = await fetchPosts("", 7);

	return {
		props: {
			data: posts || [],
		},
		revalidate: 600,
	};
};

export default Posts;
