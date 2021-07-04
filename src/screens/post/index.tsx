import { Container, Heading, Text, Link, Box } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import { Document } from 'prismic-javascript/types/documents';
import moment from 'moment';
import DocLink from '@/components/DocLink';
import Picture from '@/components/Picture';
import SEO from '@/components/SEO';
import Slices from './slices';
import Author from './Author';

type PostProps = { data: Document['data'] };

const PostScreen: React.FC<PostProps> = ({ data }) => {
  return (
    <>
      <SEO
        title={RichText.asText(data.title)}
        description={RichText.asText(data.excerpt)}
        pageType="article"
        image={data.cover.url && data.cover.url.replace(/w=\d+&h=\d+/, 'w=1200&h=627')}
      />
      <Container as="header" maxW="container.sm" py={8}>
        {data.published && (
          <Text fontSize="sm" mb={2}>
            {moment(data.published, 'YYYY-MM-DD').format('LL')}
          </Text>
        )}
        <Heading as="h1" size="xl" letterSpacing="tight" fontWeight="normal">
          {RichText.asText(data.title)}
        </Heading>
        {data.author?.data && (
          <Box color="gray.500">
            por{' '}
            <DocLink doc={data.author}>
              <Link color="gray.900">{RichText.asText(data.author.data.title)}</Link>
            </DocLink>
          </Box>
        )}
        {data.excerpt && (
          <Box mt={8} fontSize="lg">
            <RichText render={data.excerpt} />
          </Box>
        )}
      </Container>
      {data.cover.url && (
        <Picture src={data.cover.url} width={800} height={400} layout="responsive" objectFit="cover" />
      )}
      {data.body && <Slices body={data.body} />}
      {data.author.data && (
        <Box bg="gray.50" py={8}>
          <Container maxW="container.md">
            <Author member={data.author.data} />
          </Container>
        </Box>
      )}
    </>
  );
};

export default PostScreen;
