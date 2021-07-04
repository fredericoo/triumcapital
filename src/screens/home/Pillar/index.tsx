import { RichTextBlock, RichText } from 'prismic-reactjs';
import { Stack, Text, Box } from '@chakra-ui/react';
import Picture from '@/components/Picture';

type PillarProps = {
  image: { url: string };
  heading: RichTextBlock[];
  text: RichTextBlock[];
};

const Pillar: React.FC<PillarProps> = ({ image, heading, text }) => (
  <Stack spacing={4}>
    <Picture src={image.url} width={800} height={400} objectFit="contain" />
    <Text as="h3" color="black" fontWeight="bold">
      {RichText.asText(heading)}
    </Text>
    <Box color="gray.600">
      <RichText render={text} />
    </Box>
  </Stack>
);

export default Pillar;
