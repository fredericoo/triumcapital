import { RichTextBlock, RichText } from 'prismic-reactjs';
import { Container } from '@chakra-ui/react';
import styled from '@emotion/styled';

export type TextProps = {
  content: { text: RichTextBlock[] };
};

const BodyContainer = styled(Container)`
  p {
    font-size: 1em;
    line-height: 1.618em;
    &:not(:last-child) {
      margin-bottom: 1.618em;
    }
    b,
    strong {
      color: black;
    }
    a {
      color: var(--trium-colors-brand-900);
      &:hover {
        background-color: var(--trium-colors-gray-50);
      }
    }
  }
  .glossario {
    border-bottom: 8px solid;
    border-bottom-color: var(--trium-colors-brand-100);
  }
  li {
    margin-left: 2rem;
    margin-bottom: 0.618em;
    &:last-of-type {
      margin-bottom: 1.618em;
    }
  }
  h2 {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: calc(1.618em / 2);
  }
  h3 {
    font-weight: bold;
    margin-bottom: 1.618em;
  }
  h4,
  h5,
  h6 {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: bold;
    font-size: 0.8em;
    margin-bottom: calc(1.618em / 0.8);
  }
`;

const TextSlice: React.FC<TextProps> = ({ content }) => {
  if (!content.text) return null;
  return (
    <BodyContainer
      maxW="container.md"
      as="section"
      gridColumn="main-start / main-end"
      fontSize={{ base: 'md', md: 'lg' }}
    >
      <RichText render={content.text} />
    </BodyContainer>
  );
};

export default TextSlice;
