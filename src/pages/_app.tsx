import { ChakraProvider } from '@chakra-ui/react';
import { AppComponent } from 'next/dist/next-server/lib/router/router';
import theme from '@/styles/theme';
import Fonts from '@/styles/fonts';
import Navbar from '@/components/Navbar';
import moment from 'moment';
import 'focus-visible/dist/focus-visible';

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
