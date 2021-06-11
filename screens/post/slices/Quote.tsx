import { RichTextBlock, RichText } from 'prismic-reactjs';
import { Container, Box } from '@chakra-ui/react';

export type QuoteProps = {
  content: {
    text: RichTextBlock[];
    author: RichTextBlock[];
  };
};

const QuoteSlice: React.FC<QuoteProps> = ({ content }) => {
  return (
    <Container as="figure" maxW="container.lg" gridColumn="screen-start / screen-end" py={16}>
      <Box as="blockquote" fontSize="4xl" fontFamily="heading" letterSpacing="tight" lineHeight="shorter">
        <RichText render={content.text} />
      </Box>
      <Box as="figcaption" color="gray.600" fontSize="sm">
        <RichText render={content.author} />
      </Box>
    </Container>
  );
};

export default QuoteSlice;
