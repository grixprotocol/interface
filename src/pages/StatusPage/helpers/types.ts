import { SupportedAsset } from '@/api';

export type NetworkProps = {
  width: number;
  height: number;
};

export type CustomNode = {
  x: number;
  y: number;
  layer: number;
  name?: string;
  status?: string;
  logo?: string;
  mostRecentUpdate?: Date;
};

export type CustomLink = {
  source: CustomNode;
  target: CustomNode;
  status?: LinkStatus;
};

export type GraphData = {
  nodes: CustomNode[];
  links: CustomLink[];
  angleOffset: number;
};

export type Protocol = {
  name: string;
  iconRef?: string;
  status?: LinkStatus;
  markets?: Market[];
  logo?: string;
  mostRecentUpdate?: Date;
};

export type Market = {
  name?: string;
  asset: string;
  status: LinkStatus;
  logo?: string;
  latest_update: Date;
};

export enum LinkStatus {
  active = 'active',
  paused = 'paused',
  offline = 'offline',
}

export type MarketStatus = {
  market_name: string;
  asset_display_name: SupportedAsset;
  latest_update: Date;
  status: LinkStatus;
};

export type MarketStatusGetResponse = {
  marketStatus: MarketStatus[];
};
