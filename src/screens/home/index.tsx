import { Container, Box, Grid, GridItem, Stack, Heading, Button, Text } from '@chakra-ui/react';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { ArrowTopRight } from '@/components/Icon';
import { Document } from 'prismic-javascript/types/documents';
import { gridProps } from '@/styles/constants';
import CandlestickChart from '@/components/CandlestickChart';
import SEO from '@/components/SEO';
import MemberCard from '@/components/MemberCard';
import Pillar from './Pillar';
import Number from './Number';
// import Stocks from './Stocks';
import Posts from './Posts';
import { hrefResolver } from '@/prismic-config';
import { PrismicImage } from '@/utils/types';
import Link from 'next/link';

type HomeScreenProps = { data?: Document['data']; posts?: Document[] };

const HomeScreen: React.FC<HomeScreenProps> = ({ data, posts }) => {
  if (!data) return null;
  return (
    <>
      <SEO
        title={data.tabtitle}
        description={data.metadescription || RichText.asText(data.headline)}
        image={data.ogimage?.url}
      />
      <Grid minH="80vh" as="section">
        <GridItem as="header" gridColumn="1" gridRow="1" zIndex={2} pointerEvents={{ base: 'all', md: 'none' }}>
          <Container maxW="container.lg">
            <Grid {...gridProps} minH="80vh" as="section">
              <Stack
                alignSelf="center"
                gridColumn={{ base: '1 / -1', lg: '1/span 8' }}
                gridRow="1"
                zIndex={2}
                spacing={8}
              >
                <Heading as="h1" size="xl" letterSpacing="-0.02em" fontWeight="normal">
                  {RichText.asText(data.headline)}
                </Heading>

                <RichText render={data.content} />

                <Button
                  href={hrefResolver(data.link)}
                  as="a"
                  pointerEvents="all"
                  alignSelf="flex-start"
                  rightIcon={ArrowTopRight}
                >
                  {data.cta}
                </Button>
              </Stack>
            </Grid>
          </Container>
        </GridItem>
        <GridItem gridColumn="1/-1" gridRow="1" zIndex={1} pointerEvents={{ base: 'none', md: 'all' }}>
          <CandlestickChart />
        </GridItem>
      </Grid>

      {posts && <Posts data={posts} />}

      {/* <Stocks /> */}

      <Container maxW="container.lg">
        <Grid
          gap={gridProps.gridGap}
          templateColumns={{ base: '1fr', sm: '1fr 1fr 1fr' }}
          rowGap={16}
          as="section"
          py={16}
        >
          {data.pillars.map(
            (entry: {
              pillar_title: RichTextBlock[];
              pillar_content: RichTextBlock[];
              pillar_img: { url: string };
            }) => (
              <Pillar
                key={RichText.asText(entry.pillar_title)}
                heading={entry.pillar_title}
                text={entry.pillar_content}
                image={entry.pillar_img}
              />
            )
          )}
        </Grid>

        <Grid {...gridProps} as="section" py={16}>
          <GridItem gridColumn={{ base: '1 / -1', lg: '3 / span 8' }}>
            <Stack spacing={8}>
              <Heading as="h2" size="lg" textAlign="center" letterSpacing="-.02em">
                {RichText.asText(data.headline2)}
              </Heading>
              <Link href={hrefResolver(data.link2)} passHref>
                <Button alignSelf="center" rightIcon={ArrowTopRight}>
                  {data.cta2}
                </Button>
              </Link>
            </Stack>
          </GridItem>
        </Grid>

        <Grid {...gridProps} as="section" py={16}>
          <GridItem gridColumn={{ base: '1/-1', md: 'span 6' }}>
            <Text as="h2" fontSize="xl" fontWeight="bold" mb={4}>
              {RichText.asText(data.headline3)}
            </Text>
            <Box color="gray.600">
              <RichText render={data.content3} />
            </Box>
          </GridItem>
          <GridItem gridColumn={{ base: '1/-1', sm: '5/-1', md: '7/-1', lg: '9/-1' }}>
            <Stack spacing={8}>
              {data.numbers.map(
                (entry: {
                  number_title: RichTextBlock[];
                  number_content: RichTextBlock[];
                  number_image: PrismicImage;
                }) => (
                  <Number
                    key={RichText.asText(entry.number_title)}
                    heading={entry.number_title}
                    text={entry.number_content}
                    image={entry.number_image}
                  />
                )
              )}
            </Stack>
          </GridItem>
        </Grid>

        <Stack spacing={8} as="section">
          <Heading as="h2" size="xl" letterSpacing="-.02em" fontWeight="normal">
            {RichText.asText(data.headline4)}
          </Heading>
          <Grid
            gap={gridProps.gridGap}
            templateColumns={{
              base: '1fr 1fr',
              sm: '1fr 1fr 1fr',
              lg: '1fr 1fr 1fr 1fr',
            }}
          >
            {data.team.map(
              ({ member }: { member?: Document }) => member?.data && <MemberCard key={member.uid} member={member} />
            )}
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default HomeScreen;
