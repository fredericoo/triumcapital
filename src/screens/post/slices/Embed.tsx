import { Container } from '@chakra-ui/react';
import VideoEmbed from '@/components/VideoEmbed';
import Caption from '@/components/Caption';

export type EmbedProps = {
  content: {
    url: {
      title: string;
      html: string;
    };
  };
};

const EmbedSlice: React.FC<EmbedProps> = ({ content }) => {
  return (
    <Container maxW="container.md" as="section" gridColumn="main-start / main-end" py={8}>
      <VideoEmbed html={content.url.html} />
      {content.url.title && <Caption py={2}>{content.url.title}</Caption>}
    </Container>
  );
};

export default EmbedSlice;
