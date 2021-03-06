import { Container, HStack, Box, Button, Text } from '@chakra-ui/react';
import DocLink from '@/components/DocLink';
import { ArrowTopRight } from '@/components/Icon';
import Logo from './Logo';
import { MenuProps } from './types';
import { hrefResolver } from '@/prismic-config';

const NavbarLarge: React.FC<MenuProps> = ({ menu, currentPath }) => (
  <Box as="nav" data-testid="navbar-large" position="sticky" top={0} bg="white" zIndex="sticky" boxShadow="sm">
    <Container maxW="container.lg">
      <HStack spacing={8}>
        <Box py={4}>
          <Logo />
        </Box>

        <HStack flexGrow={1} as="ul" spacing={4} fontSize="sm" alignSelf="stretch">
          {menu?.map(({ label, link }) => (
            <DocLink key={label} doc={link} passHref>
              <Box
                h="100%"
                as="a"
                color={hrefResolver(link) === currentPath ? 'black' : 'gray.500'}
                borderBottom="1px solid"
                borderBottomColor={hrefResolver(link) === currentPath ? 'gray.300' : 'transparent'}
                _hover={{ color: 'black' }}
                display="flex"
                alignItems="center"
              >
                <Text>{label}</Text>
              </Box>
            </DocLink>
          ))}
        </HStack>

        <Button
          as="a"
          href="https://cadastro.xpi.com.br/desktop/step/1?assessor=A69864"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="sm"
          rightIcon={ArrowTopRight}
        >
          Invista
        </Button>
      </HStack>
    </Container>
  </Box>
);

export default NavbarLarge;
