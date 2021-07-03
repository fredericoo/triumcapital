import { Document } from 'prismic-javascript/types/documents';
import { Container, HStack, Box, Button } from '@chakra-ui/react';
import DocLink from '@/components/DocLink';
import { ArrowTopRight } from '@/components/Icon';
import Logo from './Logo';
import { MenuProps } from './types';

const NavbarLarge: React.FC<MenuProps> = ({ menu }) => (
  <Box as="nav" data-testid="navbar-large" position="sticky" top={0} bg="white" zIndex="sticky" boxShadow="sm">
    <Container maxW="container.lg">
      <HStack spacing={4} py={3}>
        <Box>
          <Logo />
        </Box>

        <Box flexGrow={1} as="ul">
          {menu?.map(({ label, link }: { label: string; link: Document }) => (
            <li key={label}>
              <DocLink doc={link}>{label}</DocLink>
            </li>
          ))}
        </Box>

        <Button variant="outline" size="sm" rightIcon={ArrowTopRight}>
          Invista
        </Button>
      </HStack>
    </Container>
  </Box>
);

export default NavbarLarge;
