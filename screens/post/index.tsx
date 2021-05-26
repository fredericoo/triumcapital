import { Container, Heading, Text, Link, Box } from "@chakra-ui/react";
import { RichText } from "prismic-reactjs";
import { Document } from "prismic-javascript/types/documents";
import moment from "moment";
import DocLink from "app/components/DocLink";
import Picture from "app/components/Picture";
import Slices from "./slices";
import Author from "./Author";

type PostProps = { data: Document["data"] };

const PostScreen: React.FC<PostProps> = ({ data }) => {
	return (
		<>
			<Container as="header" maxW="container.sm" py={8}>
				{data.published && (
					<Text textTransform="uppercase" fontSize="xs" letterSpacing="wider">
						{moment(data.published, "YYYY-MM-DD").format("LL")}
					</Text>
				)}
				<Heading as="h1" size="2xl" letterSpacing="tight">
					{RichText.asText(data.title)}
				</Heading>
				{data.author && (
					<DocLink doc={data.author}>
						<Link>{RichText.asText(data.author.data.title)}</Link>
					</DocLink>
				)}
			</Container>
			{data.cover.url && (
				<Container maxW="container.lg">
					<Picture
						src={data.cover.url}
						width={800}
						height={400}
						layout="responsive"
						objectFit="cover"
					/>
				</Container>
			)}
			{data.body && <Slices body={data.body} />}
			<Box bg="gray.100" py={8}>
				<Container maxW="container.md">
					<Author member={data.author.data} />
				</Container>
			</Box>
		</>
	);
};

export default PostScreen;
