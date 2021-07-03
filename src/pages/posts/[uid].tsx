import { GetStaticProps, GetStaticPaths } from 'next';
import { WithDoc, client } from '@/utils/prismic';
import PostScreen from '@/screens/post';
import useCookieToast from '@/utils/hooks/useCookieToast';

const Post: React.FC<WithDoc> = ({ doc }) => {
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
