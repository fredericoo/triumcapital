import {
	Container,
	Box,
	Grid,
	GridItem,
	Stack,
	Heading,
	Button,
} from "@chakra-ui/react";
import { RichText, RichTextBlock } from "prismic-reactjs";
import { ArrowTopRight } from "app/components/Icon";
import { Document } from "prismic-javascript/types/documents";
import { gridProps } from "app/styles/constants";
import Pillar from "./Pillar";
import MemberCard from "./MemberCard";
import Number from "./Number";
import Stocks from "./Stocks";
import Posts from "./Posts";

type HomeScreenProps = { data: Document["data"]; posts: Document[] };

const HomeScreen: React.FC<HomeScreenProps> = ({ data, posts }) => {
	return (
		<>
			<Container maxW="container.lg">
				<Grid {...gridProps} minH="80vh" as="section">
					<GridItem
						as="header"
						alignSelf="center"
						gridColumn={{ base: "1 / -1", lg: "span 8" }}
					>
						<Stack spacing={8}>
							<Heading as="h1" size="2xl" letterSpacing="-0.02em">
								{RichText.asText(data.headline)}
							</Heading>

							<RichText render={data.content} />

							<Button alignSelf="flex-start" rightIcon={ArrowTopRight}>
								{data.cta}
							</Button>
						</Stack>
					</GridItem>
				</Grid>
			</Container>

			<Stocks />
			<Posts data={posts} />

			<Container maxW="container.lg">
				<Grid
					gap={gridProps.gridGap}
					templateColumns={{ base: "1fr", sm: "1fr 1fr 1fr" }}
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
					<GridItem gridColumn={{ base: "1 / -1", lg: "3 / span 8" }}>
						<Stack spacing={8}>
							<Heading
								as="h2"
								size="lg"
								textAlign="center"
								letterSpacing="-.02em"
							>
								{RichText.asText(data.headline2)}
							</Heading>
							<Button alignSelf="center" rightIcon={ArrowTopRight}>
								{data.cta2}
							</Button>
						</Stack>
					</GridItem>
				</Grid>

				<Grid {...gridProps} as="section" py={16}>
					<GridItem gridColumn={{ base: "1/-1", md: "span 6" }}>
						<Heading as="h2" size="lg" letterSpacing="-.02em" mb={4}>
							{RichText.asText(data.headline3)}
						</Heading>
						<Box ml={{ lg: 16 }}>
							<RichText render={data.content3} />
						</Box>
					</GridItem>
					<GridItem
						gridColumn={{ base: "1/-1", sm: "5/-1", md: "7/-1", lg: "9/-1" }}
					>
						<Stack spacing={8}>
							{data.numbers.map(
								(entry: {
									number_title: RichTextBlock[];
									number_content: RichTextBlock[];
								}) => (
									<Number
										key={RichText.asText(entry.number_title)}
										heading={entry.number_title}
										text={entry.number_content}
									/>
								)
							)}
						</Stack>
					</GridItem>
				</Grid>

				<Stack spacing={8} as="section">
					<Heading as="h2" size="2xl" letterSpacing="-.02em">
						{RichText.asText(data.headline4)}
					</Heading>
					<Grid
						gap={gridProps.gridGap}
						templateColumns={{
							base: "1fr 1fr",
							sm: "1fr 1fr 1fr",
							lg: "1fr 1fr 1fr 1fr",
						}}
					>
						{data.team.map(
							({ member }: { member?: any }) =>
								member.data && (
									<MemberCard key={member.uid} member={member.data} />
								)
						)}
					</Grid>
				</Stack>
			</Container>
		</>
	);
};

export default HomeScreen;
