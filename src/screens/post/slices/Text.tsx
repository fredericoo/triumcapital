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
    a: {
      backgroundColor: 'var(--trium-colors-gray-100)',
      padding: '.2em .3em',
      borderRadius: '2px',
      transition: '.15s ease-out',
      '&:hover': {
        backgroundColor: 'var(--trium-colors-brand-200)',
      },
    },
    '.glossario': {
      color: 'var(--trium-colors-brand-900)',
      borderTop: '2px dotted',
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
