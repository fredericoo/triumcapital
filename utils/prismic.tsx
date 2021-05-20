import Prismic from "prismic-javascript";
import { apiEndpoint, accessToken } from "../prismic-config";
import { Document } from "prismic-javascript/types/documents";

export const Client = (req = null) =>
	Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

const createClientOptions = (req = null, prismicAccessToken: string) => {
	const reqOption = req ? { req } : {};
	const accessTokenOption = prismicAccessToken
		? { accessToken: prismicAccessToken }
		: {};
	return {
		...reqOption,
		...accessTokenOption,
	};
};

export type WithDoc = {
	doc: Document;
};
