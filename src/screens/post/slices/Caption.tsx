import { RichTextBlock, RichText } from 'prismic-reactjs';
import { Container, Text, Box } from '@chakra-ui/react';
import Picture from '@/components/Picture';
import Caption from '@/components/Caption';
import styled from '@emotion/styled';

export type CaptionProps = {
  content: {
    imagem: {
      url: string;
      dimensions: { width: string; height: string };
      alt: string;
    };
    caption: string;
    text: RichTextBlock[];
  };
};

const BodyText = styled(Box)`
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1rem;
  }
  h3 {
    font-weight: bold;
  }
  .block-img {
    max-width: 200px;
  }
  p:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const CaptionSlice: React.FC<CaptionProps> = ({ content }) => (
  <Container maxW="container.sm" as="section" fontSize="sm">
    <Box py={2} px={{ xl: 6 }}>
      {content.imagem.url && (
        <Box mb={4} maxW="200px" as="figure">
          <Picture
            src={content.imagem.url}
            width={content.imagem.dimensions.width}
            height={content.imagem.dimensions.height}
            alt={content.imagem.alt}
            layout="responsive"
          />
          {content.imagem.alt && <Caption py={2}>{content.imagem.alt}</Caption>}
        </Box>
      )}
      {content.caption && (
        <Text as="h4" color="black">
          {content.caption}
        </Text>
      )}
      <BodyText color="gray.600">{content.text && <RichText render={content.text} />}</BodyText>
    </Box>
  </Container>
);

export default CaptionSlice;
