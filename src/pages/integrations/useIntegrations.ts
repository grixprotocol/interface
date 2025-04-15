import { useQuery } from '@tanstack/react-query';

import { parseMarkdownTable } from './mdParser';

export const useIntegrations = () =>
  useQuery({
    queryKey: ['integrations'],
    queryFn: async () => {
      const res = await fetch('https://raw.githubusercontent.com/grixprotocol/defi-options-adapters/main/README.md');
      const markdown = await res.text();
      const tableMarkDown = markdown.split('<!-- INTEGRATIONS_TABLE_SECTION -->')[1];

      return parseMarkdownTable(tableMarkDown);
    },
  });
