import { GetStaticProps } from 'next';
import { client } from '@/utils/prismic';
import { PrismicDocument } from '@/utils/types';
import { RichTextBlock } from 'prismic-reactjs';
import ContactScreen from '@/screens/contact';

interface ContactDocument {
  title: RichTextBlock[];
  text: RichTextBlock[];
  info: { heading: string; content: RichTextBlock[] }[];
}
export type ContactProps = { doc: PrismicDocument<ContactDocument> };

const Services: React.FC<ContactProps> = ({ doc }) => {
  if (!doc?.data) return null;
  return <ContactScreen doc={doc} />;
};

export const getStaticProps: GetStaticProps<ContactProps> = async ({ locale }) => {
  const doc = await client.getSingle('contato', {
    lang: locale || '*',
  });

  return {
    props: {
      doc: doc || {},
    },
    revalidate: 600,
  };
};

export default Services;
