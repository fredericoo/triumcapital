import Prismic from "@prismicio/client";
import { apiEndpoint } from "../prismic-config";
import { Document } from "prismic-javascript/types/documents";

export const client = Prismic.client(apiEndpoint);

export type WithDoc = {
	doc?: Document;
};
