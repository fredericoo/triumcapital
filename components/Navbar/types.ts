import { Document } from 'prismic-javascript/types/documents';

export interface MenuItem {
  label: string;
  link: Document;
}

export type MenuProps = {
  currentPath: string;
  menu: MenuItem[];
};
