import { Document } from 'prismic-javascript/types/documents';
import useSWR from 'swr';
import { client } from 'app/utils/prismic';
import { useMediaQuery } from '@chakra-ui/react';
import NavbarLarge from './NavbarLarge';
import NavbarSmall from './NavbarSmall';
import { useRouter } from 'next/router';

const fetcher = async (): Promise<Document> => await client.getSingle('config', {});

const Navbar: React.FC = () => {
  const [isLarge] = useMediaQuery('(min-width: 768px)');
  const { data: config } = useSWR('config', fetcher);
  const { asPath } = useRouter();

  const Component = isLarge ? NavbarLarge : NavbarSmall;

  return <Component menu={config?.data?.menu} currentPath={asPath} />;
};

export default Navbar;
