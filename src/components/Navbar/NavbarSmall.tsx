import {
  Container,
  HStack,
  Box,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  CloseButton,
} from '@chakra-ui/react';
import DocLink from '@/components/DocLink';
import Logo from './Logo';
import { MenuProps } from './types';
import { useEffect } from 'react';
import { Whatsapp } from '../Icon';

const NavbarSmall: React.FC<MenuProps> = ({ menu, currentPath }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => onClose(), [currentPath, onClose]);

  return (
    <Box as="nav" data-testid="navbar-small" position="sticky" top={0} bg="white" zIndex="sticky" boxShadow="sm">
      <Container maxW="container.lg">
        <HStack spacing={4} py={3}>
          <Box flex="1">
            <Button data-testid="toggle-menu" variant="outline" size="sm" onClick={onOpen}>
              Menu
            </Button>
          </Box>
          <Box>
            <Logo />
          </Box>
          <HStack flex="1" spacing="1" justifyContent="flex-end">
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
            >
              Invista
            </Button>
          </HStack>
        </HStack>
      </Container>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader p={3}>
            <CloseButton onClick={onClose} />
          </DrawerHeader>
          <DrawerBody p={3}>
            <Box borderRadius="md" overflow="hidden">
              {menu?.map(({ label, link }) => (
                <DocLink key={label} doc={link} passHref>
                  <Box display="block" as="a" p={3} bg="gray.100" mb="1px">
                    {label}
                  </Box>
                </DocLink>
              ))}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default NavbarSmall;
