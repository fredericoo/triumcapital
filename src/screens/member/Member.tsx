import { useSWRInfinite } from 'swr';
import { Container, Box, Text, SimpleGrid, VStack, Progress, Button } from '@chakra-ui/react';
import { RichText } from 'prismic-reactjs';
import { useEffect, useState, useMemo } from 'react';
import PostThumb from '@/components/PostThumb';
import { FetchedPosts } from '@/pages/posts';
import { MemberData } from '@/pages/equipe/[uid]';
import Picture from '@/components/Picture';
import Link from 'next/link';
import SEO from '@/components/SEO';

type MemberScreenProps = {
  memberData: MemberData;
  initialData: FetchedPosts[];
  fetchMore: (after: string, memberId: string) => Promise<FetchedPosts>;
  totalCount: number;
};

const getKey = (_pageIndex: number, previousPageData: FetchedPosts | null): string => {
  if (!previousPageData?.results) return 'member: beginning';
  return previousPageData.results[previousPageData.results.length - 1].id;
};

const MemberScreen: React.FC<MemberScreenProps> = ({ memberData, initialData, fetchMore, totalCount }) => {
  const { data, size, setSize } = useSWRInfinite<FetchedPosts>(getKey, fetchMore, {
    initialData,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setIsLoading(false), [data]);

  const posts = useMemo(() => {
    const results = data?.map(response => response.results);
    if (!results) return [];
    return results.flat();
  }, [data]);

  const postCount = posts?.length ? Math.min(posts?.length, totalCount) : 0;

  return (
    <Container maxW="container.lg">
      <SEO
        title={RichText.asText(memberData.title)}
        description={RichText.asText(memberData.content)}
        image={memberData.image?.url}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} py={16}>
        <Box maxW="300px">
          {memberData.image && (
            <Picture
              src={memberData.image.url}
              height={memberData.image.dimensions.height}
              width={memberData.image.dimensions.width}
              alt={memberData.image.alt}
            />
          )}
        </Box>
        <Box>
          <Text as="h1" fontSize="3xl">
            {RichText.asText(memberData.title)}
          </Text>
          {memberData.linkedin?.url && (
            <Link href={memberData.linkedin.url} passHref>
              <Box as="a" target="_blank" display="inline-block" w="1em" _hover={{ color: 'brand.900' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
                </svg>
              </Box>
            </Link>
          )}
          <RichText render={memberData.content} />
        </Box>
      </SimpleGrid>
      {totalCount > 0 && (
        <Box>
          <Text as="h2" mb={8} textAlign="center" color="gray.600">
            Artigos escritos por {RichText.asText(memberData.title)}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            {posts.map(doc => (
              <PostThumb key={doc.uid} doc={doc} headingSize="md" />
            ))}
          </SimpleGrid>
          <VStack spacing={4} py={8}>
            <Text textAlign="center" fontSize="xs" letterSpacing="wider" color="gray.700">
              Mostrando {postCount} de {totalCount} posts
            </Text>
            <Progress value={postCount} max={totalCount} size="md" width={36} height={1} />
            {postCount < totalCount && (
              <Button
                onClick={() => (setIsLoading(true), setSize(size + 1))}
                size="sm"
                px={6}
                py={4}
                variant="outline"
                isLoading={isLoading}
              >
                Carregar mais
              </Button>
            )}
          </VStack>
        </Box>
      )}
    </Container>
  );
};

export default MemberScreen;
