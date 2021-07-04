import { ServicesProps } from '@/pages/servicos';
import { Container, SimpleGrid, VStack, Heading, Box, Text, VisuallyHidden } from '@chakra-ui/react';
import { RichTextBlock, RichText } from 'prismic-reactjs';
import Picture from '@/components/Picture';
import { PrismicImage } from '@/utils/types';

const ServicesScreen: React.FC<ServicesProps> = ({ doc }) => {
  if (!doc?.data) return null;
  return (
    <Box position="relative">
      <Box
        display={{ base: 'none', md: 'block' }}
        bg="gray.50"
        w="50%"
        h="100%"
        left="50%"
        position="absolute"
        zIndex="-1"
      />
      <Container maxW="container.lg" px={0}>
        <VisuallyHidden>
          <Heading as="h1">Serviços</Heading>
        </VisuallyHidden>
        <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={32}>
          {doc?.data['for-you'] && <ServicesColumn label="Para você" items={doc?.data['for-you']} />}
          {doc?.data['for-business'] && (
            <ServicesColumn bg="gray.50" label="Para empresas" items={doc?.data['for-business']} />
          )}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

type ServicesColumnProps = {
  bg?: string;
  label: string;
  items: { icon: PrismicImage; name: RichTextBlock[]; text: RichTextBlock[] }[];
};
const ServicesColumn: React.FC<ServicesColumnProps> = ({ bg, label, items }) => (
  <VStack spacing={16} alignSelf="start" bg={bg} py={16} px={4}>
    <Heading as="h2" fontWeight="normal" letterSpacing="tight">
      {label}
    </Heading>
    {items.map((item, key) => (
      <Box key={key}>
        {item.icon.url && (
          <Picture
            src={item.icon.url}
            width={item.icon.dimensions.width}
            height={item.icon.dimensions.height}
            alt={item.icon.alt}
            quality={100}
            layout="responsive"
            bg="transparent"
          />
        )}
        <Text mt={4} as="h3" color="black" fontWeight="bold">
          {RichText.asText(item.name)}
        </Text>
        <Box color="gray.600">
          <RichText render={item.text} />
        </Box>
      </Box>
    ))}
  </VStack>
);

export default ServicesScreen;
