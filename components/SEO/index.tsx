import Head from "next/head";
import constants from "app/theme/constants";
import { useRouter } from "next/router";

type SEO = {
	title?: string;
	description?: string;
	image?: string;
	keywords?: string | string[];
	pageType?: string;
};

const SEO: React.FC<SEO> = (props) => {
	const { asPath } = useRouter();

	const tabTitle =
		(props.title ? `${props.title} — ` : "") + constants.info.title;
	const tabDesc = props.description || constants.info.description;

	return (
		<Head>
			<title>{tabTitle}</title>
			<meta name="og:site_name" content={constants.info.title} />
			<meta
				name="viewport"
				content="viewport-fit=cover, width=device-width, initial-scale=1.0"
			/>

			<meta property="og:title" content={tabTitle} />
			<meta property="og:description" content={tabDesc} />

			<link rel="canonical" href={`${constants.info.url}${asPath}`} />
			<meta property="og:url" content={`${constants.info.url}${asPath}`} />

			{props.keywords && (
				<meta
					name="keywords"
					content={
						Array.isArray(props.keywords)
							? props.keywords.join(", ")
							: props.keywords
					}
				/>
			)}

			<meta property="og:type" content={props.pageType || "website"} />

			<meta property="og:image" content={props.image || "/favicon.png"} />

			<link rel="icon" href="/favicon.svg" />
			<link rel="mask-icon" href="/favicon.svg" color="#000000" />
			<meta name="msapplication-TileImage" content="/favicon.png" />
			<link
				rel="apple-touch-icon"
				href="/img/matula-web-app.png"
				sizes="512x512"
			/>
			<link rel="icon" href="/favicon.png" sizes="512x512" />

			{/* WEB APP */}
			<link rel="manifest" href="/manifest.json" />
			<meta name="theme-color" content="#f0f0f0" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
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
