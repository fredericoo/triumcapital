import { RichTextBlock, RichText } from 'prismic-reactjs';
import { Container } from '@chakra-ui/react';

export type TextProps = {
  content: { text: RichTextBlock[] };
};

const containerChildrenStyles = {
  p: {
    fontSize: '1em',
    lineHeight: '1.618em',
    marginBottom: '1.618em',
    'b, strong': {
      color: 'black',
    },
    a: {
      borderBottom: '8px solid',
      borderBottomColor: 'var(--trium-colors-brand-100)',
      transition: '.15s ease-out',
      '&:hover': {
        borderBottomWidth: '0',
        backgroundColor: 'var(--trium-colors-brand-100)',
      },
    },
    '.glossario': {
      borderBottom: '2px dotted',
    },
  },
  li: {
    marginBottom: '0.618em',
    '&:last-of-type': {
      marginBottom: '1.618em',
    },
  },
};

const TextSlice: React.FC<TextProps> = ({ content }) => {
  if (!content.text) return null;
  return (
    <Container
      css={containerChildrenStyles}
      maxW="container.md"
      as="section"
      gridColumn="main-start / main-end"
      fontSize={{ base: 'md', md: 'lg' }}
    >
      <RichText render={content.text} />
    </Container>
  );
};

export default TextSlice;
