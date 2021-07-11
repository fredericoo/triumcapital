import { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '@/utils/prismic';
import { PrismicDocument, PrismicImage } from '@/utils/types';
import { RichTextBlock, Link } from 'prismic-reactjs';
import Prismic from '@prismicio/client';
import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse';
import { PostData } from '../posts/[uid]';
import { FetchedPosts } from '../posts';
import MemberScreen from '@/screens/member/Member';

export interface MemberData {
  image?: PrismicImage;
  title: RichTextBlock[];
  content: RichTextBlock[];
  linkedin?: Link;
}

type MemberProps = {
  doc: PrismicDocument<MemberData>;
  postsByMember: Omit<ApiSearchResponse, 'results'> & { results: PrismicDocument<PostData>[] };
};

const postsPerPage = 6;

const fetchPostsByMember = async (after: string, memberId: string): Promise<FetchedPosts> => {
  const query = await client.query(
    [Prismic.Predicates.at('document.type', 'post'), Prismic.Predicates.at('my.post.author', memberId)],
    {
      fetch: ['post.title', 'post.excerpt', 'post.author', 'post.published', 'post.cover', 'post.category'],
      fetchLinks: ['membro.title'],
      orderings: '[my.post.published desc]',
      after,
      pageSize: postsPerPage,
    }
  );
  return query;
};

const Member: React.FC<MemberProps> = ({ doc, postsByMember }) => {
  const fetchMore = async (after: string): Promise<FetchedPosts> =>
    await fetchPostsByMember(after.split(':')[1], doc.id);

  return (
    <MemberScreen
      memberDoc={doc}
      initialData={[postsByMember]}
      fetchMore={fetchMore}
      totalCount={postsByMember.total_results_size}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await client.query('[at(document.type,"membro")]', {
    fetch: ['membro.uid'],
  });
  const paths = docs.results.map(doc => ({ params: { uid: doc.uid } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = typeof params?.uid === 'object' ? params?.uid[0] : params?.uid;
  if (!uid) return { props: { doc: {} } };
  const doc = await client.getByUID('membro', uid, {});

  const postsByMember = doc.uid ? await fetchPostsByMember('beginning', doc.id) : {};

  return {
    props: {
      doc,
      postsByMember,
    },
    revalidate: 600,
  };
};

export default Member;
