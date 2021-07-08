import { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '@/utils/prismic';
import PostScreen from '@/screens/post';
import useCookieToast from '@/utils/hooks/useCookieToast';
import { RichTextBlock } from 'prismic-reactjs';
import { PrismicDocument, PrismicImage } from '@/utils/types';
import { MemberData } from '../equipe/[uid]';

export type PostData = {
  published: string;
  category: string;
  title: RichTextBlock[];
  author: PrismicDocument<MemberData>;
  cover: PrismicImage;
  excerpt: RichTextBlock[];
};

type PostProps = { doc: PrismicDocument<PostData> };

const Post: React.FC<PostProps> = ({ doc }) => {
  useCookieToast();
  const data = doc?.data;
  if (!data) return null;
  return <PostScreen data={data} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await client.query('[at(document.type,"post")]', {
    fetch: ['post.uid'],
  });
  const paths = docs.results.map(doc => ({ params: { uid: doc.uid } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = typeof params?.uid === 'object' ? params?.uid[0] : params?.uid;
  if (!uid) return { props: { doc: {} } };
  const doc = await client.getByUID('post', uid, {
    fetchLinks: ['membro.title', 'membro.content', 'membro.image'],
  });
  return {
    props: {
      doc,
    },
    revalidate: 600,
  };
};

export default Post;
