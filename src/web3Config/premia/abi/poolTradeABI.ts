/* eslint-disable max-lines */

export const PoolTradeABI = [
  {
    type: 'function',
    name: '_takerFeeLowLevel',
    inputs: [
      {
        name: 'taker',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'premium',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'isPremiumNormalized',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'isOrderbook',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'strike',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'isCallPool',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'accountsByToken',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'annihilate',
    inputs: [
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'annihilateFor',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'balanceOfBatch',
    inputs: [
      {
        name: 'accounts',
        type: 'address[]',
        internalType: 'address[]',
      },
      {
        name: 'ids',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'cancelQuotesOB',
    inputs: [
      {
        name: 'hashes',
        type: 'bytes32[]',
        internalType: 'bytes32[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'claim',
    inputs: [
      {
        name: 'p',
        type: 'tuple',
        internalType: 'struct Position.Key',
        components: [
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'operator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'lower',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'upper',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'orderType',
            type: 'uint8',
            internalType: 'enum Position.OrderType',
          },
        ],
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      {
        name: 'p',
        type: 'tuple',
        internalType: 'struct Position.Key',
        components: [
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'operator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'lower',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'upper',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'orderType',
            type: 'uint8',
            internalType: 'enum Position.OrderType',
          },
        ],
      },
      {
        name: 'belowLower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'belowUpper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'minMarketPrice',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'maxMarketPrice',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    outputs: [
      {
        name: 'delta',
        type: 'tuple',
        internalType: 'struct Position.Delta',
        components: [
          {
            name: 'collateral',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'longs',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'shorts',
            type: 'int256',
            internalType: 'SD59x18',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      {
        name: 'p',
        type: 'tuple',
        internalType: 'struct Position.Key',
        components: [
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'operator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'lower',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'upper',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'orderType',
            type: 'uint8',
            internalType: 'enum Position.OrderType',
          },
        ],
      },
      {
        name: 'belowLower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'belowUpper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'minMarketPrice',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'maxMarketPrice',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'isBidIfStrandedMarketPrice',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [
      {
        name: 'delta',
        type: 'tuple',
        internalType: 'struct Position.Delta',
        components: [
          {
            name: 'collateral',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'longs',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'shorts',
            type: 'int256',
            internalType: 'SD59x18',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'exercise',
    inputs: [],
    outputs: [
      {
        name: 'exerciseValue',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'exerciseFee',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'exerciseFor',
    inputs: [
      {
        name: 'holders',
        type: 'address[]',
        internalType: 'address[]',
      },
      {
        name: 'costPerHolder',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'exerciseValues',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'exerciseFees',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'fillQuoteOB',
    inputs: [
      {
        name: 'quoteOB',
        type: 'tuple',
        internalType: 'struct IPoolInternal.QuoteOB',
        components: [
          {
            name: 'provider',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'taker',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'price',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'size',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'isBuy',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'deadline',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'salt',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'signature',
        type: 'tuple',
        internalType: 'struct IPoolInternal.Signature',
        components: [
          {
            name: 'v',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'r',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 's',
            type: 'bytes32',
            internalType: 'bytes32',
          },
        ],
      },
      {
        name: 'referrer',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'premiumTaker',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'delta',
        type: 'tuple',
        internalType: 'struct Position.Delta',
        components: [
          {
            name: 'collateral',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'longs',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'shorts',
            type: 'int256',
            internalType: 'SD59x18',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'flashFee',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'flashLoan',
    inputs: [
      {
        name: 'receiver',
        type: 'address',
        internalType: 'contract IERC3156FlashBorrower',
      },
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getClaimableFees',
    inputs: [
      {
        name: 'p',
        type: 'tuple',
        internalType: 'struct Position.Key',
        components: [
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'operator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'lower',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'upper',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'orderType',
            type: 'uint8',
            internalType: 'enum Position.OrderType',
          },
        ],
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getNearestTicksBelow',
    inputs: [
      {
        name: 'lower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'upper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    outputs: [
      {
        name: 'nearestBelowLower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'nearestBelowUpper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPoolSettings',
    inputs: [],
    outputs: [
      {
        name: 'base',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'quote',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'oracleAdapter',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'strike',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'maturity',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'isCallPool',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getQuoteAMM',
    inputs: [
      {
        name: 'taker',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'isBuy',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [
      {
        name: 'premiumNet',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'takerFee',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getQuoteOBFilledAmount',
    inputs: [
      {
        name: 'provider',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'quoteOBHash',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getSettlementPrice',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getStrandedArea',
    inputs: [],
    outputs: [
      {
        name: 'lower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'upper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTokenIds',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isQuoteOBValid',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'quoteOB',
        type: 'tuple',
        internalType: 'struct IPoolInternal.QuoteOB',
        components: [
          {
            name: 'provider',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'taker',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'price',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'size',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'isBuy',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'deadline',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'salt',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'sig',
        type: 'tuple',
        internalType: 'struct IPoolInternal.Signature',
        components: [
          {
            name: 'v',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'r',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 's',
            type: 'bytes32',
            internalType: 'bytes32',
          },
        ],
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: '',
        type: 'uint8',
        internalType: 'enum IPoolInternal.InvalidQuoteOBError',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'marketPrice',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxFlashLoan',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'multicall',
    inputs: [
      {
        name: 'data',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    outputs: [
      {
        name: 'results',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'safeBatchTransferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'ids',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'amounts',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'status',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'settle',
    inputs: [],
    outputs: [
      {
        name: 'collateral',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'settleFor',
    inputs: [
      {
        name: 'holders',
        type: 'address[]',
        internalType: 'address[]',
      },
      {
        name: 'costPerHolder',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'settlePosition',
    inputs: [
      {
        name: 'p',
        type: 'tuple',
        internalType: 'struct Position.Key',
        components: [
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'operator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'lower',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'upper',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'orderType',
            type: 'uint8',
            internalType: 'enum Position.OrderType',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'collateral',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'settlePositionFor',
    inputs: [
      {
        name: 'p',
        type: 'tuple[]',
        internalType: 'struct Position.Key[]',
        components: [
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'operator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'lower',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'upper',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'orderType',
            type: 'uint8',
            internalType: 'enum Position.OrderType',
          },
        ],
      },
      {
        name: 'costPerHolder',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceId',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'takerFee',
    inputs: [
      {
        name: 'taker',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'premium',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'isPremiumNormalized',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'isOrderbook',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ticks',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct IPoolInternal.TickWithRates[]',
        components: [
          {
            name: 'tick',
            type: 'tuple',
            internalType: 'struct IPoolInternal.Tick',
            components: [
              {
                name: 'delta',
                type: 'int256',
                internalType: 'SD49x28',
              },
              {
                name: 'externalFeeRate',
                type: 'uint256',
                internalType: 'UD50x28',
              },
              {
                name: 'longDelta',
                type: 'int256',
                internalType: 'SD49x28',
              },
              {
                name: 'shortDelta',
                type: 'int256',
                internalType: 'SD49x28',
              },
              {
                name: 'counter',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'price',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'longRate',
            type: 'uint256',
            internalType: 'UD50x28',
          },
          {
            name: 'shortRate',
            type: 'uint256',
            internalType: 'UD50x28',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokensByAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalHolders',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'trade',
    inputs: [
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'isBuy',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'premiumLimit',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'referrer',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'totalPremium',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'delta',
        type: 'tuple',
        internalType: 'struct Position.Delta',
        components: [
          {
            name: 'collateral',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'longs',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'shorts',
            type: 'int256',
            internalType: 'SD59x18',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferPosition',
    inputs: [
      {
        name: 'srcP',
        type: 'tuple',
        internalType: 'struct Position.Key',
        components: [
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'operator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'lower',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'upper',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'orderType',
            type: 'uint8',
            internalType: 'enum Position.OrderType',
          },
        ],
      },
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'newOperator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'tryCacheSettlementPrice',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [
      {
        name: 'p',
        type: 'tuple',
        internalType: 'struct Position.Key',
        components: [
          {
            name: 'owner',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'operator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'lower',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'upper',
            type: 'uint256',
            internalType: 'UD60x18',
          },
          {
            name: 'orderType',
            type: 'uint8',
            internalType: 'enum Position.OrderType',
          },
        ],
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'minMarketPrice',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'maxMarketPrice',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
    outputs: [
      {
        name: 'delta',
        type: 'tuple',
        internalType: 'struct Position.Delta',
        components: [
          {
            name: 'collateral',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'longs',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'shorts',
            type: 'int256',
            internalType: 'SD59x18',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'writeFrom',
    inputs: [
      {
        name: 'underwriter',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'longReceiver',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'referrer',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Annihilate',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'fee',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        name: 'account',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CancelQuoteOB',
    inputs: [
      {
        name: 'provider',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'quoteOBHash',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ClaimFees',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'feesClaimed',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'lastFeeRate',
        type: 'int256',
        indexed: false,
        internalType: 'SD59x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ClaimProtocolFees',
    inputs: [
      {
        name: 'feeReceiver',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'feesClaimed',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Deposit',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'collateral',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'longs',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'shorts',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'lastFeeRate',
        type: 'int256',
        indexed: false,
        internalType: 'SD59x18',
      },
      {
        name: 'claimableFees',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'marketPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'liquidityRate',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'currentTick',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Exercise',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'holder',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'exerciseValue',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'settlementPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'fee',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'operatorCost',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FillQuoteOB',
    inputs: [
      {
        name: 'quoteOBHash',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'provider',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'deltaMaker',
        type: 'tuple',
        indexed: false,
        internalType: 'struct Position.Delta',
        components: [
          {
            name: 'collateral',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'longs',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'shorts',
            type: 'int256',
            internalType: 'SD59x18',
          },
        ],
      },
      {
        name: 'deltaTaker',
        type: 'tuple',
        indexed: false,
        internalType: 'struct Position.Delta',
        components: [
          {
            name: 'collateral',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'longs',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'shorts',
            type: 'int256',
            internalType: 'SD59x18',
          },
        ],
      },
      {
        name: 'premium',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'protocolFee',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'totalReferralRebate',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'isBuy',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FlashLoan',
    inputs: [
      {
        name: 'initiator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'fee',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Settle',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'holder',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'exerciseValue',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'settlementPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'fee',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'operatorCost',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SettlePosition',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'collateral',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'exerciseValue',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'feesClaimed',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'settlementPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'fee',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'operatorCost',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SettlementPriceCached',
    inputs: [
      {
        name: 'settlementPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Trade',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'delta',
        type: 'tuple',
        indexed: false,
        internalType: 'struct Position.Delta',
        components: [
          {
            name: 'collateral',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'longs',
            type: 'int256',
            internalType: 'SD59x18',
          },
          {
            name: 'shorts',
            type: 'int256',
            internalType: 'SD59x18',
          },
        ],
      },
      {
        name: 'premium',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'takerFee',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'protocolFee',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'marketPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'liquidityRate',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'currentTick',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'totalReferralRebate',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'isBuy',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransferBatch',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'ids',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'values',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransferPosition',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'srcTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'destTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransferSingle',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UpdateTick',
    inputs: [
      {
        name: 'tick',
        type: 'uint256',
        indexed: true,
        internalType: 'UD60x18',
      },
      {
        name: 'prev',
        type: 'uint256',
        indexed: true,
        internalType: 'UD60x18',
      },
      {
        name: 'next',
        type: 'uint256',
        indexed: true,
        internalType: 'UD60x18',
      },
      {
        name: 'delta',
        type: 'int256',
        indexed: false,
        internalType: 'SD59x18',
      },
      {
        name: 'externalFeeRate',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'longDelta',
        type: 'int256',
        indexed: false,
        internalType: 'SD59x18',
      },
      {
        name: 'shortDelta',
        type: 'int256',
        indexed: false,
        internalType: 'SD59x18',
      },
      {
        name: 'counter',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Withdrawal',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'collateral',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'longs',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'shorts',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'lastFeeRate',
        type: 'int256',
        indexed: false,
        internalType: 'SD59x18',
      },
      {
        name: 'claimableFees',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'marketPrice',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'liquidityRate',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'currentTick',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'WriteFrom',
    inputs: [
      {
        name: 'underwriter',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'longReceiver',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'taker',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'contractSize',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'collateral',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
      {
        name: 'protocolFee',
        type: 'uint256',
        indexed: false,
        internalType: 'UD60x18',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'ERC1155Base__ArrayLengthMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__BalanceQueryZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__BurnExceedsBalance',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__BurnFromZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__ERC1155ReceiverNotImplemented',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__ERC1155ReceiverRejected',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__MintToZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__NotOwnerOrApproved',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__SelfApproval',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__TransferExceedsBalance',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC1155Base__TransferToZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__AboveMaxSlippage',
    inputs: [
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'minimum',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'maximum',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__AboveQuoteSize',
    inputs: [
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'quoteSize',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__ActionNotAuthorized',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'action',
        type: 'uint8',
        internalType: 'enum IUserSettings.Action',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__CostExceedsPayout',
    inputs: [
      {
        name: 'cost',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'payout',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__CostNotAuthorized',
    inputs: [
      {
        name: 'costInWrappedNative',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'authorizedCostInWrappedNative',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__DifferenceOfSizeAndContractDeltaTooLarge',
    inputs: [
      {
        name: 'diff',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__FlashLoanCallbackFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__FlashLoanNotRepayed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__InsufficientAskLiquidity',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__InsufficientBidLiquidity',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__InsufficientFunds',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__InsufficientLiquidity',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__InvalidAssetUpdate',
    inputs: [
      {
        name: 'deltaLongs',
        type: 'int256',
        internalType: 'SD59x18',
      },
      {
        name: 'deltaShorts',
        type: 'int256',
        internalType: 'SD59x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__InvalidBelowPrice',
    inputs: [
      {
        name: 'price',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'priceBelow',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__InvalidMonth',
    inputs: [
      {
        name: 'month',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__InvalidPositionState',
    inputs: [
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'lastDeposit',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__InvalidQuoteOBSignature',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__InvalidQuoteOBTaker',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__InvalidRange',
    inputs: [
      {
        name: 'lower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'upper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__InvalidReconciliation',
    inputs: [
      {
        name: 'crossings',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__InvalidSize',
    inputs: [
      {
        name: 'lower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'upper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'depositSize',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__InvalidTickPrice',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__InvalidTickUpdate',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__InvalidTransfer',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__NotEnoughTokens',
    inputs: [
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__NotPoolToken',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__NotWrappedNativeTokenPool',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__OperatorNotAuthorized',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__OptionExpired',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__OptionNotExpired',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__OutOfBoundsPrice',
    inputs: [
      {
        name: 'price',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__PositionCantHoldLongAndShort',
    inputs: [
      {
        name: 'longs',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'shorts',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__PositionDoesNotExist',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__QuoteOBCancelled',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__QuoteOBExpired',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__QuoteOBOverfilled',
    inputs: [
      {
        name: 'filledAmount',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'size',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'quoteOBSize',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__SettlementFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__SettlementPriceAlreadyCached',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__TickDeltaNotZero',
    inputs: [
      {
        name: 'tickDelta',
        type: 'int256',
        internalType: 'SD59x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__TickNotFound',
    inputs: [
      {
        name: 'price',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__TickOutOfRange',
    inputs: [
      {
        name: 'price',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__TickWidthInvalid',
    inputs: [
      {
        name: 'price',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__UseTransferPositionToTransferLPTokens',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pool__WithdrawalDelayNotElapsed',
    inputs: [
      {
        name: 'unlockTime',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pool__ZeroSize',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Position__InvalidOrderType',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Position__InvalidPositionUpdate',
    inputs: [
      {
        name: 'currentBalance',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'amount',
        type: 'int256',
        internalType: 'SD59x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Position__LowerGreaterOrEqualUpper',
    inputs: [
      {
        name: 'lower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'upper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pricing__PriceCannotBeComputedWithinTickRange',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Pricing__PriceOutOfRange',
    inputs: [
      {
        name: 'lower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'upper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'marketPrice',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
  {
    type: 'error',
    name: 'Pricing__UpperNotGreaterThanLower',
    inputs: [
      {
        name: 'lower',
        type: 'uint256',
        internalType: 'UD60x18',
      },
      {
        name: 'upper',
        type: 'uint256',
        internalType: 'UD60x18',
      },
    ],
  },
];
