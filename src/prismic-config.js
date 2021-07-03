export const apiEndpoint = 'https://trium.cdn.prismic.io/api/v2';

export const hrefResolver = doc => {
  if (doc.link_type == 'Web') return doc.url;
  switch (doc.type) {
    case 'home':
      return `/`;
    case 'membro':
      return `/equipe/${doc.uid}`;
    case 'post':
      return `/posts/${doc.uid}`;
    default:
      return `/${doc.uid}`;
  }
};
