import { Container, VisuallyHidden, SimpleGrid, Heading } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import SEO from '@/components/SEO';
import { TeamProps } from '@/pages/[equipe]';
import MemberCard from '@/components/MemberCard';

const TeamScreen: React.FC<TeamProps> = ({ doc }) => {
  if (!doc?.data) return null;
  return (
    <Container maxW="container.lg">
      <SEO
        title={doc.data.tabtitle || RichText.asText(doc.data.title)}
        description={doc.data.metadescription}
        image={doc.data.ogimage?.url}
      />
      <VisuallyHidden>
        <h1>{RichText.asText(doc.data.title)}</h1>
      </VisuallyHidden>
      <Heading as="h2" fontWeight="normal" py={32} letterSpacing="tight" maxW="33ch">
        <RichText render={doc.data.quote} />
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }}>
        {doc.data.members?.map(({ member }) => (
          <MemberCard key={member.uid} member={member.data} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default TeamScreen;
