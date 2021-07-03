import { Document } from '@prismicio/client/types/documents';
import { Box } from '@chakra-ui/react';
import DocLink from '@/components/DocLink';
import { RichText } from 'prismic-reactjs';
import Picture from '@/components/Picture';
import PostHeader from './PostHeader';

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
    <Box>
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
      <PostHeader doc={doc} size={headingSize} />
      {withExcerpt && doc.data.excerpt && (
        <Box noOfLines={4} fontSize="sm" color="gray.600">
          <RichText render={doc.data.excerpt} />
        </Box>
      )}
    </Box>
  );
};

export default PostThumb;
