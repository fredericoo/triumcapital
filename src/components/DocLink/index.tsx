import { default as NextLink, LinkProps } from 'next/link';
import { hrefResolver } from '@/prismic-config';
import { Document } from 'prismic-javascript/types/documents';

type DocLinkProps = {
  doc: Document;
  href?: string | null;
} & Omit<LinkProps, 'href'>;

const DocLink: React.FC<DocLinkProps> = ({ doc, ...props }) => <NextLink href={hrefResolver(doc)} {...props} />;

export default DocLink;
