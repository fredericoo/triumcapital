import { Document } from 'prismic-javascript/types/documents';
import { Container, HStack, Box, Button } from '@chakra-ui/react';
import DocLink from '@/components/DocLink';
import { ArrowTopRight } from '@/components/Icon';
import Logo from './Logo';
import { MenuProps } from './types';
import { hrefResolver } from '@/prismic-config';

const NavbarLarge: React.FC<MenuProps> = ({ menu, currentPath }) => (
  <Box as="nav" data-testid="navbar-large" position="sticky" top={0} bg="white" zIndex="sticky" boxShadow="sm">
    <Container maxW="container.lg">
      <HStack spacing={8}>
        <Box>
          <Logo />
        </Box>

        <HStack flexGrow={1} as="ul" spacing={4} fontSize="sm">
          {menu?.map(({ label, link }: { label: string; link: Document }) => (
            <DocLink key={label} doc={link} passHref>
              <Box
                py={3}
                as="a"
                color={hrefResolver(link) === currentPath ? 'black' : 'gray.500'}
                borderBottom="1px solid"
                borderBottomColor={hrefResolver(link) === currentPath ? 'gray.300' : 'transparent'}
                _hover={{ color: 'black' }}
              >
                {label}
              </Box>
            </DocLink>
          ))}
        </HStack>

        <Button variant="outline" size="sm" rightIcon={ArrowTopRight}>
          Invista
        </Button>
      </HStack>
    </Container>
  </Box>
);

export default NavbarLarge;
