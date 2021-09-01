import { client } from '@/utils/prismic';
import { Container, Link, Spinner, Text, VStack } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';

type VirtualCardRouteProps = {
  filePath: { url: string };
};

const VirtualCardRoute: React.VFC<VirtualCardRouteProps> = ({ filePath }) => {
  useEffect(() => {
    window?.open(filePath.url, '_Self');
  }, [filePath]);
  return (
    <Container maxW="container.lg" pt={8} textAlign="center">
      <VStack spacing={8}>
        <Spinner color="brand.900" speed="1.2s" />
        <Text>
          Seu download deverá ser iniciado em breve. Caso não ocorra,{' '}
          <Link color="brand.900" href={filePath.url}>
            clique aqui
          </Link>
          .
        </Text>
      </VStack>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await client.query('[at(document.type,"virtualcard")]', {
    fetch: ['post.uid'],
  });
  const paths = docs.results.map(doc => ({ params: { uid: doc.uid } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = typeof params?.uid === 'object' ? params?.uid[0] : params?.uid;
  if (!uid) return { props: { doc: {} } };
  const doc = await client.getByUID('virtualcard', uid, {
    fetch: ['virtualcard.file'],
  });
  return {
    props: {
      filePath: doc.data.file,
    },
    revalidate: 60,
  };
};

export default VirtualCardRoute;
