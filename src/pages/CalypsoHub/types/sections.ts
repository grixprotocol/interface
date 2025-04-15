export enum Section {
  TRADE_AGENTS = 'trade-agents',
  MY_AGENTS = 'my-agents',
  PLAYBOOKS = 'playbooks',
  STRATEGIES = 'strategies',
  GUIDE = 'guide',
  PAID = 'paid',
  FEATURE_REQUESTS = 'feature-requests',
  TRADE_AGENTS_TEST = 'trade-agents-test',
}

export type SectionDescription = {
  title: string;
  description: string;
  icon: string;
  color: string;
  path: string;
  section: Section;
  ctaText: string;
};
