import { Container, HStack, Box, Button, Text } from '@chakra-ui/react';
import DocLink from '@/components/DocLink';
import { ArrowTopRight, Whatsapp } from '@/components/Icon';
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

        <HStack flexGrow={1} as="ul" spacing={6} fontSize="sm" alignSelf="stretch">
          {menu?.map(({ label, link }) => (
            <DocLink key={label} doc={link} passHref>
              <Box
                h="100%"
                as="a"
                fontSize="md"
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

        <HStack>
          <Button
            as="a"
            href="https://wa.me/5531994266130"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            px="1"
            variant="solid"
            colorScheme="whatsapp"
            leftIcon={Whatsapp}
            iconSpacing="0"
          />
          <Button
            as="a"
            href="https://cadastro.xpi.com.br/desktop/step/1?assessor=A69864"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            pr={2}
            pl={4}
            rightIcon={ArrowTopRight}
          >
            Invista
          </Button>
        </HStack>
      </HStack>
    </Container>
  </Box>
);

export default NavbarLarge;
