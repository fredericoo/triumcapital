import Image, { ImageProps } from "next/image";
import { useState, SyntheticEvent } from "react";
import styled from "@emotion/styled";

type Picture = {
	bg?: string;
};

type LazyLoadPicture = {
	hasLoaded: boolean;
};

const Wrapper = styled.div<LazyLoadPicture & Picture>`
	transition: background-color 1s ease-out;
	background-color: ${({ hasLoaded, bg }) => (hasLoaded ? "transparent" : bg)};
`;

const StyledImage = styled(Image)<LazyLoadPicture>`
	transition: opacity 1s ease-out;
	opacity: ${({ hasLoaded }: LazyLoadPicture) => (hasLoaded ? 1 : 0)};
`;

const Picture: React.FC<ImageProps & Picture> = (props) => {
	if (!props.src) return null;
	const [hasLoaded, setLoaded] = useState<boolean>(false);
	const fixImageSrc = (src: string) => src.replace("auto=compress,format", "");

	const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>): void => {
		if (
			(event.target as HTMLImageElement).src.indexOf("data:image/gif;base64") <
			0
		) {
			setLoaded(true);
		}
	};

	return (
		<Wrapper hasLoaded={hasLoaded} bg={props.bg} className={props.className}>
			<StyledImage
				hasLoaded={hasLoaded}
				{...{
					...props,
					className: undefined,
					src: fixImageSrc(props.src),
					quality: props.quality || 90,
					onLoad: handleLoad,
				}}
			/>
		</Wrapper>
	);
};

export default Picture;
