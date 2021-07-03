import Prismic from '@prismicio/client';
import { Document } from 'prismic-javascript/types/documents';
import { apiEndpoint } from '../prismic-config';

export const client = Prismic.client(apiEndpoint);

export type WithDoc = {
  doc?: Document;
};
