import type { Document } from '@prismicio/client/types/documents';

import { Link, Heading } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import moment from 'moment';
import DocLink from '../DocLink';
import Caption from '../Caption';

type PostHeaderProps = {
  doc: Document;
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
};
const PostHeader: React.FC<PostHeaderProps> = ({ doc, size }) => {
  return (
    <>
      <Caption>
        {doc.data.category && `${doc.data.category} — `}
        {moment(doc.data.published, 'YYYY-MM-DD').format('DD-MM-YY')}
      </Caption>
      {doc.data.title && (
        <DocLink doc={doc} passHref>
          <Link>
            <Heading size={size} as="h3" fontFamily="body">
              {RichText.asText(doc.data.title)}
            </Heading>
          </Link>
        </DocLink>
      )}
      {doc.data.author.data && (
        <DocLink doc={doc.data.author} passHref>
          <Caption as="a" _hover={{ borderBlockEnd: '1px solid' }}>
            {RichText.asText(doc.data.author.data.title)}
          </Caption>
        </DocLink>
      )}
    </>
  );
};
export default PostHeader;
