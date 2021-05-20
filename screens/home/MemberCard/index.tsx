import { Stack, Heading, Text } from "@chakra-ui/react";
import Picture from "app/components/Picture";
import { RichText } from "prismic-reactjs";

const MemberCard = ({ member }: { member: any }) => (
	<Stack spacing={2}>
		<Picture
			src={member.image.url}
			width={800}
			height={800}
			objectFit="contain"
		/>
		<Heading as="h3" size="md" fontFamily="body" fontWeight="normal">
			{RichText.asText(member.title).replace(/\.$/, "")}.
		</Heading>
		<Text fontSize="sm" color="gray.500">
			<RichText render={member.content} />
		</Text>
	</Stack>
);

export default MemberCard;
