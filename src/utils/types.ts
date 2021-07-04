interface BaseImage {
  url: string;
  dimensions: {
    width: number;
    height: number;
  };
  alt?: string;
}

export type PrismicImage = BaseImage & Record<string, BaseImage>;

export type LinkField = {
  url: string;
  target?: '_blank' | '_self';
};
