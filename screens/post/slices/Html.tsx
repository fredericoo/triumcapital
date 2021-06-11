import { Container } from '@chakra-ui/react';
import styled from '@emotion/styled';

export type HtmlSliceProps = {
  content: {
    code: string;
  };
};

const Block = styled.div`
  td {
    padding: 0.5rem;
  }
`;

const HtmlSlice: React.FC<HtmlSliceProps> = ({ content }) => {
  return (
    <Container maxW="container.md" as="section" gridColumn="main-start / main-end" py={8}>
      <Block dangerouslySetInnerHTML={{ __html: content.code }} />
    </Container>
  );
};

export default HtmlSlice;
