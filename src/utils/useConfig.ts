import { Link, RichTextBlock } from 'prismic-reactjs';
import useSWR from 'swr';
import { client } from './prismic';
import { PrismicDocument } from './types';

export interface MenuItem {
  label: string;
  link: PrismicDocument | Link;
}
interface Contact {
  label: string;
  value: RichTextBlock[];
}
type ConfigData = {
  menu: MenuItem[];
  heading: RichTextBlock[];
  address: RichTextBlock[];
  contacts: Contact[];
  disclaimer: RichTextBlock[];
};

const fetcher = async (): Promise<PrismicDocument<ConfigData>> => await client.getSingle('config', {});

const useConfig = (): { config?: PrismicDocument<ConfigData>; error?: string } => {
  const { data, error } = useSWR<PrismicDocument<ConfigData>, string>('config', fetcher, { revalidateOnFocus: false });
  return { config: data, error };
};

export default useConfig;
