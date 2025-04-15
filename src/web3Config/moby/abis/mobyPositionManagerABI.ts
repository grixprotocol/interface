export const mobyPositionManagerABI = [
  {
    inputs: [
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
        name: '_size',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: '_path',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: '_minAmountOut',
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
    name: 'createClosePosition',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
];
