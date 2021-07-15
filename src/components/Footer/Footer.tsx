import useConfig from '@/utils/useConfig';
import { Box, Container, SimpleGrid, GridItem, Heading, VisuallyHidden, Text, Grid } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';

const Footer: React.FC = () => {
  const { config } = useConfig();

  return (
    <Box as="footer" py={16}>
      <VisuallyHidden>
        <Heading as="h2">Rodapé</Heading>
      </VisuallyHidden>
      <Container maxW="container.lg" fontSize="sm" borderTop="1px solid" borderColor="gray.200" pt={8}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <GridItem>
            {config?.data.heading && (
              <Text as="h3" fontWeight="bold" mb="1em">
                {RichText.asText(config?.data.heading)}
              </Text>
            )}
            {config?.data.address && (
              <Text as="div" color="gray.500" mb="1em">
                <RichText render={config?.data.address} />
              </Text>
            )}
            {config?.data.contacts.map(contact => (
              <Grid templateColumns={'1rem 1fr'} key={contact.label} ml={{ md: '-1rem' }}>
                <Text fontWeight="bold">{contact.label}</Text>
                <Text as="div">{contact.value && <RichText render={contact.value} />}</Text>
              </Grid>
            ))}
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }} fontSize="xs" color="gray.600">
            {config?.data.disclaimer && <RichText render={config?.data.disclaimer} />}
          </GridItem>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
