import { signMessage } from 'wagmi/actions';

import { wagmiConfig } from '@/web3Config/reownConfig';

export const handlePositionSignMessage = async (
  totalPriceInUSD: string,
  quoteId: string,
  userAddress: string,
  signatureExpired: string,
  asset: string,
  expirationDate: number,
  strikePrice: string,
  optionType: string,
  amount: string
) => {
  const message = `
  I, the wallet owner with address ${userAddress}, authorize the following transaction:
  
  - Underlying Asset: ${asset}
  - Option Type: ${optionType.charAt(0).toUpperCase() + optionType.slice(1)}
  - Strike Price: ${Number(strikePrice).toFixed(0)} USD
  - Amount: ${amount} contracts
  - Price: ${totalPriceInUSD} USD
  - Expiration: ${new Date(expirationDate * 1000).toUTCString()}
  - Quote ID: ${quoteId}
  This signature will expire on: ${new Date(signatureExpired).toUTCString()}.
  
  By signing, I confirm that I am not a resident of any restricted country as outlined in the Grix Finance Terms of Use. I acknowledge that I have read, understood, and agree to comply with and be bound by the Grix Finance Terms of Use and Disclaimers available at: https://www.grix.finance/legal/terms-of-use.
`;

  const resultSign = await signMessage(wagmiConfig, {
    message: message.trim(),
  });
  return { userSignature: resultSign, signedMessage: message };
};
