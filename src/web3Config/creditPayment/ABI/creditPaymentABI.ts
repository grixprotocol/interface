export const creditPaymentABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'credit',
        type: 'uint256',
      },
    ],
    name: 'CreditPriceRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'credit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceInUsd',
        type: 'uint256',
      },
    ],
    name: 'CreditPriceUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'payer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountInWei',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'creditAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'apiKeyId',
        type: 'string',
      },
    ],
    name: 'PaymentReceived',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getAllCreditPrices',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'credit',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'priceInUsd',
            type: 'uint256',
          },
        ],
        internalType: 'struct CreditPayment.CreditPrice[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'credit',
        type: 'uint256',
      },
    ],
    name: 'getCreditPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'creditAmount',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'apiKeyId',
        type: 'string',
      },
    ],
    name: 'processPayment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'credit',
        type: 'uint256',
      },
    ],
    name: 'removeCreditPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'credit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'priceInUsd',
        type: 'uint256',
      },
    ],
    name: 'setCreditPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdrawTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
