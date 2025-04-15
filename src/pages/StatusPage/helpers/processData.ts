import { capitalizeFirstLetter } from '@/utils/stringUtil';

import { logos } from '../logos';
import { LinkStatus, Market, MarketStatus, Protocol } from './types';

//************ Group data by protocol ************//

const groupDataByProtocol = (data: MarketStatus[]): Protocol[] => {
  const protocolMap = new Map<string, Protocol>();

  data.forEach((responseMarket) => {
    if (!protocolMap.has(responseMarket.market_name)) {
      protocolMap.set(responseMarket.market_name, { name: responseMarket.market_name, markets: [] });
    }

    const protocol = protocolMap.get(responseMarket.market_name);
    protocol?.markets?.push({
      asset: responseMarket.asset_display_name,
      status: responseMarket.status,
      latest_update: responseMarket.latest_update,
    });
  });

  return Array.from(protocolMap.values());
};

//************ Add logos to protocols and markets ************//

const addLogosToProtocol = (protocols: Protocol[]): Protocol[] =>
  protocols.map((protocol) => ({
    ...protocol,
    name: capitalizeFirstLetter(protocol.name),
    logo: logos[capitalizeFirstLetter(protocol.name) as keyof typeof logos],
    markets: addMarketLogos(protocol.markets),
  }));

const addMarketLogos = (markets?: Market[]): Market[] => {
  if (!markets) return [];
  return markets.map((market) => ({
    ...market,
    logo: logos[market.asset as keyof typeof logos],
  }));
};

//************ Map status to protocol ************//

const mapStatusToProtocol = (protocols: Protocol[]): Protocol[] =>
  protocols.map((protocol) => {
    const status = protocol.markets?.some((market) => market.status === LinkStatus.active)
      ? LinkStatus.active
      : LinkStatus.paused;
    const mostRecentlyUpdatedMarket = protocol.markets?.sort(
      (a, b) => new Date(b.latest_update).getTime() - new Date(a.latest_update).getTime()
    )[0];
    const mostRecentUpdate = mostRecentlyUpdatedMarket?.latest_update;

    const newProtocol = {
      ...protocol,
      status,
      mostRecentUpdate,
    };
    return newProtocol;
  });

const filterInactive = (protocols: Protocol[]): Protocol[] =>
  protocols.filter((protocol) => !protocol?.markets?.every((market) => market.status === LinkStatus.offline));

//************ Main processing function ************//
export const processData = (data: MarketStatus[]): Protocol[] => {
  const groupedProtocols = groupDataByProtocol(data);
  const mappedLogos = addLogosToProtocol(groupedProtocols);
  const mappedStatus = mapStatusToProtocol(mappedLogos);
  const filteredInactive = filterInactive(mappedStatus);

  return filteredInactive;
};
