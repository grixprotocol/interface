export const mobySettleManagerABI = [
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_path',
        type: 'address[]',
      },
      {
        internalType: 'uint16',
        name: '_underlyingAssetIndex',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: '_optionTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_minOutWhenSwap',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_withdrawETH',
        type: 'bool',
      },
    ],
    name: 'settlePosition',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
