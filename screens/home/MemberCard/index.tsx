import { Stack, Heading, Box } from '@chakra-ui/react';
import Picture from 'app/components/Picture';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { PrismicImage } from 'app/utils/types';

interface Member {
  image: PrismicImage;
  title: RichTextBlock[];
  content: RichTextBlock[];
}

type MemberCardProps = { member: Member };

const MemberCard: React.FC<MemberCardProps> = ({ member }) => (
  <Stack spacing={2}>
    <Picture src={member.image.url} width={800} height={800} objectFit="contain" bg="transparent" />
    <Heading as="h3" size="md" fontFamily="body" fontWeight="normal">
      {RichText.asText(member.title).replace(/\.$/, '')}.
    </Heading>
    <Box fontSize="sm" color="gray.500">
      <RichText render={member.content} />
    </Box>
  </Stack>
);

export default MemberCard;
