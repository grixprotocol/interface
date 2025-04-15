import Grix from '../logos/GrixLogo.svg';
import { CustomLink, CustomNode, GraphData, Protocol } from './types';

export const generateGraphComponents = (
  graphWidth: number,
  graphHeight: number,
  angleOffset: number,
  protocols: Protocol[]
): GraphData => {
  const centerX = 0.5 * graphWidth;
  const centerY = 0.5 * graphHeight;
  const layer1Radius = Math.min(graphWidth, graphHeight) * 0.3;
  const layer2Radius = layer1Radius * 1.3;
  const nodes: CustomNode[] = [{ x: centerX, y: centerY, layer: 0, name: 'GRIX', logo: Grix }];

  const angleStep = (2 * Math.PI) / protocols.length;
  protocols.forEach((protocol, index) => {
    const layer1Angle = index * angleStep + angleOffset;
    const x = centerX + layer1Radius * Math.cos(layer1Angle);
    const y = centerY + layer1Radius * Math.sin(layer1Angle);
    const node: CustomNode = {
      x,
      y,
      layer: 1,
      name: protocol.name,
      status: protocol.status,
      logo: protocol.logo,
      mostRecentUpdate: protocol.mostRecentUpdate,
    };
    nodes.push(node);

    const markets = protocol.markets ?? [];
    markets.forEach((market, marketIndex) => {
      let layer2Angle = layer1Angle;
      const spreadAngle = (10 / Math.sqrt(markets.length)) * (Math.PI / 180);
      layer2Angle += (marketIndex - (markets.length - 1) / 2) * spreadAngle;
      const x = centerX + layer2Radius * Math.cos(layer2Angle);
      const y = centerY + layer2Radius * Math.sin(layer2Angle);
      const marketNode: CustomNode = { x, y, layer: 2, logo: market.logo };
      nodes.push(marketNode);
    });
  });
  const sortedNodes = nodes.sort((a, b) => b.layer - a.layer);

  const links: CustomLink[] = generateLinks(nodes);
  const graphData: GraphData = { nodes: sortedNodes, links, angleOffset };
  return graphData;
};
const generateLinks = (nodes: CustomNode[]): CustomLink[] => {
  const links: CustomLink[] = [];
  const centerNode = nodes.find((node) => node.layer === 0);
  if (!centerNode) return links;

  nodes.forEach((node) => {
    if (node.layer === 1) {
      const link: CustomLink = {
        source: centerNode,
        target: node,
      };
      links.push(link);
    }
  });
  return links;
};
