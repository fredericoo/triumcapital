import { GetStaticProps, GetStaticPaths } from 'next';
import { client } from '@/utils/prismic';
import { PrismicDocument, PrismicImage } from '@/utils/types';
import { RichTextBlock } from 'prismic-reactjs';

export interface MemberData {
  image: PrismicImage;
  title: RichTextBlock[];
  content: RichTextBlock[];
}

type MemberProps = { doc: PrismicDocument<MemberData> };

const Member: React.FC<MemberProps> = ({ doc }) => {
  const data = doc?.data;
  if (!data) return null;
  return <div />;
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
  return {
    props: {
      doc,
    },
    revalidate: 600,
  };
};

export default Member;
