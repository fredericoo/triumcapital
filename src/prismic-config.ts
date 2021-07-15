import { Link } from 'prismic-reactjs';
import { PrismicDocument } from './utils/types';

export const apiEndpoint = 'https://trium.cdn.prismic.io/api/v2';

export const hrefResolver = (input: PrismicDocument | Link): string => {
  if ('link_type' in input && input.link_type == 'Web' && input.url) return input.url;
  switch (input.type) {
    case 'home':
      return `/`;
    case 'membro':
      return `/equipe/${input.uid}`;
    case 'post':
      return `/posts/${input.uid}`;
    default:
      return `/${input.uid}`;
  }
};
