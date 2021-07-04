import { Stack, Text, Box, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Picture from '@/components/Picture';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { PrismicImage, PrismicDocument } from '@/utils/types';
import DocLink from '../DocLink';

export interface MemberData {
  image: PrismicImage;
  title: RichTextBlock[];
  content: RichTextBlock[];
}

type MemberCardProps = { member: PrismicDocument<MemberData> };

const MemberCard: React.FC<MemberCardProps> = ({ member }) => (
  <LinkBox>
    <Stack spacing={2}>
      <Picture src={member.data.image.url} width={800} height={800} objectFit="contain" bg="transparent" />
      <DocLink doc={member} passHref>
        <LinkOverlay _hover={{ textDecoration: 'underline', textUnderlineOffset: '.3em' }}>
          <Text as="h3" fontWeight="bold">
            {RichText.asText(member.data.title).replace(/\.$/, '')}.
          </Text>
        </LinkOverlay>
      </DocLink>
      <Box fontSize="sm" color="gray.500">
        <RichText render={member.data.content} />
      </Box>
    </Stack>
  </LinkBox>
);

export default MemberCard;
