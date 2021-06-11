import { Document } from 'prismic-javascript/types/documents';
import { Container, HStack, Box, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { client } from 'app/utils/prismic';
import DocLink from '../DocLink';
import Logo from './Logo';
import { ArrowTopRight } from '../Icon';

interface MenuItem {
  label: string;
  link: Document;
}

const fetcher = async (): Promise<Document> => await client.getSingle('config', {});

type MenuProps = {
  options: MenuItem[];
};

const Menu: React.FC<MenuProps> = ({ options }) => (
  <Box as="ul">
    {options.map(({ label, link }: { label: string; link: Document }) => (
      <li key={label}>
        <DocLink doc={link}>{label}</DocLink>
      </li>
    ))}
  </Box>
);

const Navbar: React.FC = () => {
  const { data: config, error } = useSWR('config', fetcher);

  return (
    <Box position="sticky" top={0} bg="white" zIndex="sticky" boxShadow="sm">
      <Container maxW="container.lg">
        <HStack spacing={4} py={3}>
          <Box>
            <Logo />
          </Box>

          <Box flexGrow={1}>
            {error ? <Box color="negative.900">!</Box> : config?.data && <Menu options={config?.data?.menu} />}
          </Box>

          <Button variant="outline" size="sm" rightIcon={ArrowTopRight}>
            Invista
          </Button>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
