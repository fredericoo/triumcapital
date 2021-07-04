import { Box, Container, SimpleGrid, Heading, VisuallyHidden, Text, List, ListItem } from '@chakra-ui/react';

const columns = new Array(4).fill(0).map((_, index) => ({
  label: `Column ${index}`,
  links: new Array(5).fill(0).map((_, index) => ({ label: `Link ${index}`, url: 'https://google.com' })),
}));
const Footer: React.FC = () => {
  return (
    <Box as="footer" py={16}>
      <VisuallyHidden>
        <Heading as="h2">Rodapé</Heading>
      </VisuallyHidden>
      <Container maxW="container.lg">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          {columns.map(column => (
            <FooterColumn key={column.label} label={column.label} links={column.links} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;

const FooterColumn: React.FC<{ label: string; links: { label: string; url: string }[] }> = ({ label, links }) => {
  return (
    <Box key={label}>
      <Text as="h3" color="black" pb={2} mb={2} borderBottom="1px solid" borderBottomColor="gray.200">
        {label}
      </Text>
      <List color="gray.600">
        {links.map(link => (
          <ListItem key={link.label}>{link.label}</ListItem>
        ))}
      </List>
    </Box>
  );
};
