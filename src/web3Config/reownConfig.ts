import { arbitrum } from '@reown/appkit/networks';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

export const projectId = '02389d7b577faa031f008f9017390007';

export const wagmiAdapter = new WagmiAdapter({
  networks: [arbitrum],
  projectId,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

/**
 * TODO: Fix solana wallet adapter
 */
export const solanaWeb3JsAdapter = new SolanaAdapter({
  // wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});
export const metadata = {
  name: 'Grix',
  description: 'Grix',
  url: 'https://app.grix.finance',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};
