import { ContactProps } from '@/pages/contato';
import { Container, Box, Text, SimpleGrid } from '@chakra-ui/react';
import SEO from '@/components/SEO';
import { RichText, RichTextBlock } from 'prismic-reactjs';

const ContactScreen: React.FC<ContactProps> = ({ doc }) => {
  if (!doc.data) return null;
  return (
    <Container maxW="container.lg">
      <SEO
        title={doc.data.tabtitle || RichText.asText(doc.data.title)}
        description={doc.data.metadescription}
        image={doc.data.ogimage?.url}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} py={16} gap={8}>
        <RichText render={doc.data.text} />
        <Box>
          {doc.data.info?.map(entry => (
            <InfoSection key={entry.heading} heading={entry.heading} content={entry.content} />
          ))}
        </Box>
      </SimpleGrid>
    </Container>
  );
};

type InfoSectionProps = {
  heading: string;
  content: RichTextBlock[];
};
const InfoSection: React.FC<InfoSectionProps> = ({ heading, content }) => (
  <Box mb={4}>
    <Text color="black" fontWeight="bold">
      {heading}
    </Text>
    <RichText render={content} />
  </Box>
);

export default ContactScreen;
