import { default as NextLink, LinkProps } from 'next/link';
import { hrefResolver } from '@/prismic-config';
import { Document } from 'prismic-javascript/types/documents';
import { Link } from 'prismic-reactjs';

type DocLinkProps = {
  doc: Document | Link;
  href?: string;
} & Omit<LinkProps, 'href'>;

const DocLink: React.FC<DocLinkProps> = ({ doc, ...props }) => {
  const href = hrefResolver(doc);
  return <NextLink href={href} {...props} />;
};

export default DocLink;
