/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export const hasWalletPermission = (address: any, permittedWallets: any): boolean => {
  if (!address || typeof address !== 'string') {
    console.error('User needs to connect wallet.');
    return false;
  }
  console.log(permittedWallets);

  const lowerCaseAddress = address.trim().toLowerCase();
  const lowerCasedPermittedWallets = permittedWallets.map((addr: any) => addr.trim().toLowerCase());

  if (lowerCasedPermittedWallets.includes(lowerCaseAddress)) {
    console.log('Address is permitted.');
    return true;
  } else {
    console.log('Address is not permitted.');
    return false;
  }
};
