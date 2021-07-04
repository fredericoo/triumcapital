import Head from 'next/head';
import { useRouter } from 'next/router';

type SEO = {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string | string[];
  pageType?: string;
};

const constants = {
  info: {
    title: 'Trium Capital',
    description: '',
    url: 'https://triumcapital.com.br',
  },
};

const SEO: React.FC<SEO> = props => {
  const { asPath } = useRouter();

  const tabTitle = (props.title ? `${props.title} — ` : '') + constants.info.title;
  const tabDesc = props.description || constants.info.description;

  return (
    <Head>
      <title>{tabTitle}</title>
      <meta name="og:site_name" content={constants.info.title} />
      <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0" />

      <meta property="og:title" content={tabTitle} />
      <meta property="og:description" content={tabDesc} />
      <meta name="description" content={tabDesc} />

      <link rel="canonical" href={`${constants.info.url}${asPath}`} />
      <meta property="og:url" content={`${constants.info.url}${asPath}`} />

      {props.keywords && (
        <meta name="keywords" content={Array.isArray(props.keywords) ? props.keywords.join(', ') : props.keywords} />
      )}

      <meta property="og:type" content={props.pageType || 'website'} />

      <meta property="og:image" content={props.image || '/img/fallback-seo.png'} />

      <link rel="icon" href="/img/favicon.svg" />
      <link rel="mask-icon" href="/img/favicon.svg" color="#000000" />
      <meta name="msapplication-TileImage" content="/img/favicon.png" />
      <link rel="apple-touch-icon" href="/img/favicon.png" sizes="512x512" />
      <link rel="icon" href="/favicon.png" sizes="512x512" />

      {/* WEB APP */}
      <meta name="theme-color" content="#f0f0f0" />
      <meta name="apple-mobile-web-app-capable" content="no" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        // content="default"
        content="black-translucent"
      />

      <meta name="copyright" content="Penumbra design et web" />
      <meta name="designer" content="Penumbra design et web" />
      <meta name="robots" content="index,follow" />
    </Head>
  );
};

export default SEO;
