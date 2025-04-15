const transactionsEnabledProtocols = ['premia', 'moby'];

export const isTransactionEnabled = (protocolName: string) => transactionsEnabledProtocols.includes(protocolName);
