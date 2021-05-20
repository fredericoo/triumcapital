import { ChakraProvider } from "@chakra-ui/react";
import { AppComponent } from "next/dist/next-server/lib/router/router";
import theme from "app/styles/theme";
import Fonts from "app/styles/fonts";
import Navbar from "app/components/Navbar";

const App: AppComponent = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<Fonts />
			<Navbar />
			<Component {...pageProps} />
		</ChakraProvider>
	);
};

export default App;
