import { GetStaticProps } from 'next';
import { WithDoc, client } from '@/utils/prismic';
import ServicesScreen from '@/screens/services';

export type ServicesProps = WithDoc;
const Services: React.FC<ServicesProps> = ({ doc }) => {
  if (!doc?.data) return null;
  return <ServicesScreen doc={doc} />;
};

export const getStaticProps: GetStaticProps<ServicesProps> = async ({ locale }) => {
  const doc = await client.getSingle('servicos', {
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
