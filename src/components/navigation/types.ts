import { IconType } from 'react-icons';

export type SubNavigationItem = {
  label: string;
  path: string;
  isExternal?: boolean;
  icon?: IconType;
  badge?: number;
};

export type NavigationItem = {
  label: string;
  path: string;
  isExternal?: boolean;
  subItems?: SubNavigationItem[];
  badge?: number;
};

export type NavigationConfig = {
  mainNav: NavigationItem[];
};
