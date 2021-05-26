import Image, { ImageProps } from "next/image";
import { useState, SyntheticEvent } from "react";
import { Box } from "@chakra-ui/react";

type PictureProps = {
	bg?: string;
};

const Picture: React.FC<ImageProps & PictureProps> = ({
	bg = "gray.100",
	...props
}) => {
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
		<Box
			transition="background-color 1s ease-out"
			bg={hasLoaded ? "transparent" : bg}
			className={props.className}
		>
			<Box transition="opacity 1s ease-out" opacity={hasLoaded ? 1 : 0}>
				<Image
					{...{
						...props,
						className: undefined,
						src: fixImageSrc(props.src),
						quality: props.quality || 90,
						onLoad: handleLoad,
					}}
				/>
			</Box>
		</Box>
	);
};

export default Picture;
