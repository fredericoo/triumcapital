import { Document } from '@prismicio/client/types/documents';
import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import DocLink from '@/components/DocLink';
import Picture from '@/components/Picture';
import Caption from '@/components/Caption';

type PostProps = {
  doc: Document;
  headingSize: 'sm' | 'md' | 'lg';
  withThumb?: boolean;
  thumbFormat?: 'rectangle' | 'square';
  withExcerpt?: boolean;
};

const PostThumb: React.FC<PostProps> = ({ doc, withExcerpt, withThumb, thumbFormat = 'square', headingSize }) => {
  if (!doc.data) return null;

  const thumbnailUrl =
    thumbFormat === 'rectangle' ? doc.data.cover.url : doc.data.cover.Pequeno.url || '/img/icone-positivo.svg';
  return (
    <LinkBox
      transition="all .3s ease-out"
      _hover={{ bg: 'gray.100', boxShadow: '0 0 0 1rem var(--trium-colors-gray-100)' }}
    >
      {withThumb && (
        <DocLink doc={doc}>
          <a>
            <Picture
              src={thumbnailUrl}
              width={thumbFormat === 'rectangle' ? 1600 : 800}
              height={800}
              objectFit="cover"
            />
          </a>
        </DocLink>
      )}

      <Caption>{doc.data.category}</Caption>
      {doc.data.title && (
        <DocLink doc={doc} passHref>
          <LinkOverlay>
            <Heading size={headingSize} as="h3" fontFamily="body">
              {RichText.asText(doc.data.title)}
            </Heading>
          </LinkOverlay>
        </DocLink>
      )}
      {doc.data.author.data && (
        <Box color="gray.500">
          por{' '}
          <DocLink doc={doc.data.author} passHref>
            <Box color="gray.900" as="a" _hover={{ borderBlockEnd: '1px solid' }}>
              {RichText.asText(doc.data.author.data.title)}
            </Box>
          </DocLink>
        </Box>
      )}

      {withExcerpt && doc.data.excerpt && (
        <Box mt={3} noOfLines={4} color="gray.600" maxW="66ch">
          <RichText render={doc.data.excerpt} />
        </Box>
      )}
    </LinkBox>
  );
};

export default PostThumb;
