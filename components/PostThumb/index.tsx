import { Document } from "@prismicio/client/types/documents";
import { Box } from "@chakra-ui/react";
import DocLink from "app/components/DocLink";
import { RichText } from "prismic-reactjs";
import Picture from "app/components/Picture";
import styled from "@emotion/styled";
import PostHeader from "./PostHeader";

type PostProps = {
	doc: Document;
	headingSize: "sm" | "md" | "lg";
	withThumb?: boolean;
	withExcerpt?: boolean;
};

const PostThumb: React.FC<PostProps> = ({
	doc,
	withExcerpt,
	withThumb,
	headingSize,
}) => {
	if (!doc.data) return null;
	const thumbnailUrl = doc.data.cover.Pequeno.url || "/img/icone-positivo.svg";
	return (
		<Box>
			{withThumb && (
				<DocLink doc={doc}>
					<a>
						<Picture
							src={thumbnailUrl}
							width={800}
							height={800}
							objectFit="cover"
						/>
					</a>
				</DocLink>
			)}
			<PostHeader doc={doc} size={headingSize} />
			{withExcerpt && doc.data.excerpt && (
				<Box noOfLines={4} fontSize="sm" color="gray.600">
					<RichText render={doc.data.excerpt} />
				</Box>
			)}
		</Box>
	);
};

export default PostThumb;
