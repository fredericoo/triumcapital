import { Grid } from '@chakra-ui/react';
import TextSlice, { TextProps } from './Text';
import CaptionSlice, { CaptionProps } from './Caption';
import QuoteSlice, { QuoteProps } from './Quote';
import ImageSlice, { ImageProps } from './Image';
import EmbedSlice, { EmbedProps } from './Embed';
import HtmlSlice, { HtmlSliceProps } from './Html';

type TextSlice = { slice_type: 'text'; primary: TextProps['content'] };
type CaptionSlice = { slice_type: 'caption'; primary: CaptionProps['content'] };
type QuoteSlice = { slice_type: 'quote'; primary: QuoteProps['content'] };
type ImageSlice = { slice_type: 'image'; primary: ImageProps['content'] };
type EmbedSlice = { slice_type: 'embed_de_video'; primary: EmbedProps['content'] };
type HtmlSlice = { slice_type: 'html'; primary: HtmlSliceProps['content'] };

type Slice = TextSlice | CaptionSlice | QuoteSlice | ImageSlice | EmbedSlice | HtmlSlice;

type SlicesProps = {
  body: Slice[];
};

const Slice: React.FC<{ data: Slice }> = ({ data }) => {
  switch (data.slice_type) {
    case 'text':
      return <TextSlice content={data.primary} />;
    case 'caption':
      return <CaptionSlice content={data.primary} />;
    case 'quote':
      return <QuoteSlice content={data.primary} />;
    case 'image':
      return <ImageSlice content={data.primary} />;
    case 'embed_de_video':
      return <EmbedSlice content={data.primary} />;
    case 'html':
      return <HtmlSlice content={data.primary} />;
    default:
      return null;
  }
};

const Slices: React.FC<SlicesProps> = ({ body }) => {
  return (
    <Grid
      py={8}
      gridTemplateColumns={{
        base: '[screen-start main-start] 1fr [main-end screen-end]',
        lg: '[screen-start] .5fr [main-start] minmax(33ch, 66ch) [main-end] 1fr [screen-end]',
        xl: '[screen-start] 1fr [main-start] minmax(33ch, 77ch) [main-end] 1fr [screen-end]',
      }}
      rowGap="1.618em"
    >
      {body.map((slice, key) => (
        <Slice data={slice} key={key} />
      ))}
    </Grid>
  );
};
export default Slices;
