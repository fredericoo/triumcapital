import { RichTextBlock, RichText } from 'prismic-reactjs';
import { Grid, GridItem, Heading, Box } from '@chakra-ui/react';
import Picture from '@/components/Picture';
import { PrismicImage } from '@/utils/types';

type NumberProps = { heading: RichTextBlock[]; text: RichTextBlock[]; image?: PrismicImage };

const Number: React.FC<NumberProps> = ({ image, heading, text }) => (
  <Grid templateColumns="repeat(4, 1fr)">
    <GridItem gridColumn="1/-1">
      {image?.url ? (
        <Box maxW="6rem" mb={2}>
          <Picture
            src={image.url}
            width={image.dimensions.width}
            height={image.dimensions.height}
            alt={image.alt}
            layout="responsive"
          />
        </Box>
      ) : (
        <Heading as="h3" size="3xl" fontFamily="body">
          {RichText.asText(heading)}
        </Heading>
      )}
    </GridItem>
    <GridItem gridColumn="2/-1" color="gray.500" fontSize="sm">
      <RichText render={text} />
    </GridItem>
  </Grid>
);

export default Number;
