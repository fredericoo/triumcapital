import { extendTheme } from "@chakra-ui/react";

const buttonProps = {
	defaultProps: {
		variant: "primary",
	},
	baseStyle: {
		borderRadius: "999px",
		padding: ".618em 1.618em",
	},
	sizes: {
		md: {
			px: 6,
			py: 4,
		},
	},
	variants: {
		primary: {
			bg: "brand.100",
			color: "black",
			_hover: {
				bg: "gray.100",
				color: "black",
			},
		},
	},
};

const Heading = {
	baseStyle: {
		color: "gray.900",
	},
};

const theme = extendTheme({
	fonts: {
		heading: "reckless",
		body: "roobert",
	},
	colors: {
		brand: {
			50: "#f6fbfe",
			100: "#ddedff",
			200: "#c8dcf3",
			399: "#b4cbeb",
			400: "#9fbbe3",
			500: "#8aacdb",
			600: "#749cd2",
			700: "#5c8eca",
			800: "#437fc1",
			900: "#2272ba",
		},
		positive: "#2272ba",
		negative: "#fa3817",
	},
	styles: {
		global: {
			body: {
				color: "gray.700",
			},
		},
	},
	components: {
		Button: buttonProps,
		Heading,
	},
});

export default theme;
