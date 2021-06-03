import { Document } from "@prismicio/client/types/documents";
import { Box, Link, Heading } from "@chakra-ui/react";
import DocLink from "app/components/DocLink";
import { RichText } from "prismic-reactjs";
import moment from "moment";
import Caption from "app/components/Caption";
import Picture from "app/components/Picture";
import styled from "@emotion/styled";

type PostProps = {
	doc: Document;
	size: "sm" | "md" | "lg";
};

type PostHeaderProps = {
	doc: Document;
	size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
};
const PostHeader: React.FC<PostHeaderProps> = ({ doc, size }) => {
	return (
		<>
			<Caption>
				{doc.data.category && `${doc.data.category} — `}
				{moment(doc.data.published, "YYYY-MM-DD").format("DD-MM-YY")}
			</Caption>
			{doc.data.title && (
				<DocLink doc={doc} passHref>
					<Link>
						<Heading size={size} as="h3" fontFamily="body">
							{RichText.asText(doc.data.title)}
						</Heading>
					</Link>
				</DocLink>
			)}
			{doc.data.author.data && (
				<DocLink doc={doc.data.author} passHref>
					<Caption as="a" _hover={{ borderBlockEnd: "1px solid" }}>
						{RichText.asText(doc.data.author.data.title)}
					</Caption>
				</DocLink>
			)}
		</>
	);
};

const NewestBox = styled(Box)`
	position: relative;
	&:before,
	&:after {
		position: absolute;
		height: 100%;
		width: 1px;
		background: currentColor;
		content: "";
		display: block;
		opacity: 0.1;
		top: 0;
	}
	&:before {
		right: -0.75rem;
	}
	&:after {
		left: -0.75rem;
	}
`;

const PostThumb: React.FC<PostProps> = ({ doc, size }) => {
	if (!doc.data) return null;
	const image = size != "sm" ? doc.data.cover.Pequeno : null;
	const PostBox = size === "lg" ? NewestBox : Box;
	return (
		<PostBox>
			{image?.url && (
				<DocLink doc={doc}>
					<a>
						<Picture
							src={image.url}
							width={image.dimensions.width}
							height={image.dimensions.height}
							objectFit="cover"
						/>
					</a>
				</DocLink>
			)}
			<PostHeader doc={doc} size={size === "lg" ? "xl" : "md"} />
			{size !== "sm" && doc.data.excerpt && (
				<Box fontSize="sm" color="gray.600">
					<RichText render={doc.data.excerpt} />
				</Box>
			)}
		</PostBox>
	);
};

export default PostThumb;
