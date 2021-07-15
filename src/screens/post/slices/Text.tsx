import { RichTextBlock, RichText } from 'prismic-reactjs';
import { Container } from '@chakra-ui/react';

export type TextProps = {
  content: { text: RichTextBlock[] };
};

const containerChildrenStyles = {
  p: {
    fontSize: '1em',
    lineHeight: '1.618em',
    '&:not(:last-child)': { marginBottom: '1.618em' },
    'b, strong': {
      color: 'black',
    },
    a: {
      color: 'var(--trium-colors-brand-900)',
      '&:hover': {
        backgroundColor: 'var(--trium-colors-gray-50)',
      },
    },
    '.glossario': {
      borderBottom: '8px solid',
      borderBottomColor: 'var(--trium-colors-brand-100)',
    },
  },
  li: {
    marginLeft: '2rem',
    marginBottom: '0.618em',
    '&:last-of-type': {
      marginBottom: '1.618em',
    },
  },
  h3: {
    fontWeight: 700,
    marginBottom: '1.618em',
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
