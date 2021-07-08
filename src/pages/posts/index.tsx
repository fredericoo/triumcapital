import { GetStaticProps } from 'next';
import { client } from '@/utils/prismic';
import useCookieToast from '@/utils/hooks/useCookieToast';
import PostsScreen from '@/screens/posts';
import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse';
import { PrismicDocument } from '@/utils/types';
import { PostData } from './[uid]';

type PostsProps = { data: Omit<ApiSearchResponse, 'results'> & { results: PrismicDocument<PostData>[] } };

const postsPerPage = 6;

export type FetchedPosts = PostsProps['data'];
const fetchPosts = async (after: string): Promise<FetchedPosts> => {
  const query = await client.query('[at(document.type,"post")]', {
    fetch: ['post.title', 'post.excerpt', 'post.author', 'post.published', 'post.cover', 'post.category'],
    fetchLinks: ['membro.title'],
    orderings: '[my.post.published desc]',
    after,
    pageSize: postsPerPage,
  });
  return query;
};

const Posts: React.FC<PostsProps> = ({ data }) => {
  useCookieToast();
  if (!data) return null;
  return <PostsScreen initialData={[data]} fetchMore={fetchPosts} totalCount={data.total_results_size} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchPosts('');

  return {
    props: {
      data: posts || [],
    },
    revalidate: 600,
  };
};

export default Posts;
