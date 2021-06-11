import { GetStaticProps } from 'next';
import { WithDoc, client } from 'app/utils/prismic';
import HomeScreen from 'app/screens/home';
import useCookieToast from 'app/utils/hooks/useCookieToast';
import { Document } from 'prismic-javascript/types/documents';

type HomeProps = WithDoc & { posts?: Document[] };
const Home: React.FC<HomeProps> = ({ doc, posts }) => {
  useCookieToast();
  if (!doc?.data) return null;
  return <HomeScreen data={doc.data} posts={posts} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const doc = await client.getSingle('home', {
    lang: locale || '*',
    fetchLinks: ['membro.title', 'membro.image', 'membro.content'],
  });

  const posts = await client.query('[at(document.type,"post")]', {
    fetch: ['post.title', 'post.excerpt', 'post.author', 'post.published', 'post.cover', 'post.category'],
    fetchLinks: ['membro.title'],
    orderings: '[my.post.published desc]',
    pageSize: 7,
  });

  return {
    props: {
      doc: doc || {},
      posts: posts.results || [],
    },
    revalidate: 600,
  };
};

export default Home;
