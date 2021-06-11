import { ChakraProvider } from '@chakra-ui/react';
import { AppComponent } from 'next/dist/next-server/lib/router/router';
import theme from 'app/styles/theme';
import Fonts from 'app/styles/fonts';
import Navbar from 'app/components/Navbar';
import moment from 'moment';

const App: AppComponent = ({ Component, pageProps }) => {
  moment.locale('pt-br');
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
