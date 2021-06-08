import { Stack, Skeleton, SkeletonText } from "@chakra-ui/react";

const PostSkeleton: React.FC = () => (
	<Stack>
		<Skeleton width="100%" height="0" paddingBlockEnd="100%" />
		<Skeleton height=".6em" />
		<Skeleton height="1.2em" />
		<SkeletonText mt="4" noOfLines={4} spacing="4" />
	</Stack>
);

export default PostSkeleton;
