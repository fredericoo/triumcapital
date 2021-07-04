import { Container, VisuallyHidden, SimpleGrid, Heading, Grid } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import SEO from '@/components/SEO';
import { TeamProps } from '@/pages/equipe';
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
      <Grid templateColumns={{ base: '1fr', lg: '1fr 3fr' }} rowGap={16} gap={4} py={32}>
        <Heading as="h2" size="md" fontWeight="normal" letterSpacing="tight" maxW="33ch">
          <RichText render={doc.data.quote} />
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
          {doc.data.members?.map(({ member }) => (
            <MemberCard key={member.uid} member={member} />
          ))}
        </SimpleGrid>
      </Grid>
    </Container>
  );
};

export default TeamScreen;
