import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const GTAG = 'G-MM2LRFD4C2';

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (args: IArguments) => void;
  }
}

const GoogleAnalytics: React.FC = () => {
  const router = useRouter();

  const handleRouteChange = (url: URL): void => {
    gtag('config', GTAG, {
      page_path: url,
    });
  };

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = args => {
      if (typeof args === 'string') return;
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GTAG);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Head>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`}></script>
    </Head>
  );
};

export default GoogleAnalytics;
