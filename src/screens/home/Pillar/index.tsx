import { RichTextBlock, RichText } from 'prismic-reactjs';
import { Stack, Heading } from '@chakra-ui/react';
import Picture from '@/components/Picture';

type PillarProps = {
  image: { url: string };
  heading: RichTextBlock[];
  text: RichTextBlock[];
};

const Pillar: React.FC<PillarProps> = ({ image, heading, text }) => (
  <Stack spacing={4}>
    <Picture src={image.url} width={800} height={400} objectFit="contain" />
    <Heading as="h3" size="md" fontFamily="body" fontWeight="normal">
      {RichText.asText(heading)}
    </Heading>

    <RichText render={text} />
  </Stack>
);

export default Pillar;
