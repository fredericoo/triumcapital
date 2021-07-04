import { Document } from 'prismic-javascript/types/documents';

interface BaseImage {
  url: string;
  dimensions: {
    width: number;
    height: number;
  };
  alt?: string;
}

export type PrismicImage = BaseImage & Record<string, BaseImage>;

interface SEOData {
  tabtitle?: string;
  metadescription?: string;
  ogimage?: PrismicImage;
}
export type PrismicDocument<T = Record<string, unknown>> = Omit<Document, 'data'> & { data: T & SEOData };

export type LinkField = {
  url: string;
  target?: '_blank' | '_self';
};
