import { ChakraProvider } from '@chakra-ui/react';
import { AppComponent } from 'next/dist/next-server/lib/router/router';
import theme from '@/styles/theme';
import Fonts from '@/styles/fonts';
import Navbar from '@/components/Navbar';
import moment from 'moment';
import 'focus-visible/dist/focus-visible';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';

const App: AppComponent = ({ Component, pageProps }) => {
  moment.locale('pt-br');
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <GoogleAnalytics />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
};

export default App;
