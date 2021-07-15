import { useMediaQuery } from '@chakra-ui/react';
import NavbarLarge from './NavbarLarge';
import NavbarSmall from './NavbarSmall';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useConfig from '@/utils/useConfig';

const Navbar: React.FC = () => {
  const [matchesMediaQuery] = useMediaQuery('(min-width: 768px)');
  const { config } = useConfig();
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
