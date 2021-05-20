import { GetStaticProps } from "next";
import { Client, WithDoc } from "app/utils/prismic";
import HomeScreen from "app/screens/home";

const Home: React.FC<WithDoc> = ({ doc }) => {
	if (!doc?.data) return null;
	return <HomeScreen data={doc.data} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const client = Client();
	const doc = await client.getSingle("home", {
		lang: locale || "*",
		fetchLinks: ["membro.title", "membro.image", "membro.content"],
	});

	return {
		props: {
			doc: doc || {},
		},
	};
};

export default Home;
