import { RichTextBlock, RichText } from "prismic-reactjs";
import { Container, useTheme, WithCSSVar } from "@chakra-ui/react";
import styled from "@emotion/styled";

export type TextProps = {
	content: RichTextBlock[];
};

const TextContainer = styled(Container)`
	p {
		font-size: 1em;
		line-height: 1.618em;
		margin-bottom: 1.618em;
		a {
			background-color: ${({
				theme,
			}: {
				theme: WithCSSVar<Record<string, any>>;
			}) => theme.colors.gray["100"]};
			padding: 0.2em 0.3em;
			border-radius: 2px;
			transition: 0.15s ease-out;
			&:hover {
				background-color: ${({
					theme,
				}: {
					theme: WithCSSVar<Record<string, any>>;
				}) => theme.colors.brand["200"]};
			}
		}
	}
	li {
		margin-bottom: 0.618em;
		&:last-of-type {
			margin-bottom: 1.618em;
		}
	}
`;

const TextSlice: React.FC<TextProps> = ({ content }) => {
	const theme = useTheme();
	return (
		<TextContainer
			theme={theme}
			maxW="container.md"
			as="section"
			gridColumn="main-start / main-end"
			fontSize={{ base: "md", md: "lg" }}
		>
			<RichText render={content} />
		</TextContainer>
	);
};

export default TextSlice;
