import { Document } from 'prismic-javascript/types/documents';
import useSWR from 'swr';
import { client } from '@/utils/prismic';
import { useMediaQuery } from '@chakra-ui/react';
import NavbarLarge from './NavbarLarge';
import NavbarSmall from './NavbarSmall';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const fetcher = async (): Promise<Document> => await client.getSingle('config', {});

const Navbar: React.FC = () => {
  const [matchesMediaQuery] = useMediaQuery('(min-width: 768px)');
  const { data: config } = useSWR('config', fetcher, { revalidateOnFocus: false });
  const { asPath } = useRouter();

  const [isLarge, setIsLarge] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    setIsLarge(matchesMediaQuery);
  }, [setIsLarge, matchesMediaQuery]);

  const navbarProps = { menu: config?.data?.menu, currentPath: asPath };
  if (typeof isLarge !== 'boolean') return null;
  return isLarge ? <NavbarLarge {...navbarProps} /> : <NavbarSmall {...navbarProps} />;
};

export default Navbar;
