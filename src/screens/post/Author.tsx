import { Box, Flex, Stack, Heading, Text } from '@chakra-ui/react';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import Picture from '@/components/Picture';

type AuthorProps = {
  member: {
    title: RichTextBlock[];
    image: { url: string; alt: string };
    content: RichTextBlock[];
  };
};

const Author: React.FC<AuthorProps> = ({ member }) => (
  <Flex direction={{ base: 'column', md: 'row' }}>
    {member.image?.url && (
      <Box maxW="200px">
        <Picture src={member.image.url} width={800} height={800} objectFit="contain" alt={member.image.alt} />
      </Box>
    )}
    <Stack ml={{ md: 4 }} spacing={2}>
      {member.title && (
        <Heading as="h3" size="md" fontFamily="body" fontWeight="normal">
          {RichText.asText(member.title).replace(/\.$/, '')}.
        </Heading>
      )}
      {member.content && (
        <Text as="div" fontSize="sm" color="gray.700">
          <RichText render={member.content} />
        </Text>
      )}
    </Stack>
  </Flex>
);
export default Author;
