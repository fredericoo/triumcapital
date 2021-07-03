import { styled, Container, Box } from '@chakra-ui/react';
import Picture from '@/components/Picture';
import Caption from '@/components/Caption';

export type ImageProps = {
  content: {
    size: 'pequena' | 'grande' | 'fullscreen';
    image: {
      url: string;
      alt: string;
      dimensions: { height: string; width: string };
    };
  };
};

const SmallWrapper = styled(Container, {
  baseStyle: {
    maxW: 'container.sm',
    margin: 'auto',
    gridColumn: 'main-start / main-end',
  },
});
const LargeWrapper = styled(Container, {
  baseStyle: {
    maxW: 'container.md',
    margin: 'auto',
    gridColumn: 'main-start / main-end',
  },
});
const FullScreenWrapper = styled(Box, {
  baseStyle: { gridColumn: 'screen-start / screen-end' },
});

const ImageSlice: React.FC<ImageProps> = ({ content }) => {
  if (!content.image.url) return null;
  const Wrapper =
    content.size === 'fullscreen' ? FullScreenWrapper : content.size === 'grande' ? LargeWrapper : SmallWrapper;
  return (
    <Wrapper py={8} as="figure">
      <Picture
        src={content.image.url}
        width={content.image.dimensions.width}
        height={content.image.dimensions.height}
        alt={content.image.alt}
      />
      {content.image.alt && (
        <Container maxW="container.md" as="figcaption">
          <Caption>{content.image.alt}</Caption>
        </Container>
      )}
    </Wrapper>
  );
};

export default ImageSlice;
