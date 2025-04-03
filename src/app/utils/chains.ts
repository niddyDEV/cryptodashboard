export interface Chain {
    name: string;
    chainId: number;
    rpcUrl: string;
    tokens: {symbol: string, address: string}[];
}

export const chains: Chain[] = [
    {
        name: 'Ethereum',
        chainId: 1,
        rpcUrl: 'https://mainnet.infura.io', 
        tokens: [
            { symbol: 'ETH', address: '0x0000000000000000000000000000000000000000' },
            { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
            { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
        ],
    },
    {
        name: 'Binance Smart Chain',
        chainId: 56,
        rpcUrl: 'https://bsc-dataseed.binance.org/', 
        tokens: [
            { symbol: 'BNB', address: '0x0000000000000000000000000000000000000000' },
            { symbol: 'BUSD', address: '0x4fabb145d64652a948d72533023f6e7a623c7c53' },
            { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
        ],
    },
    {
        name: 'Polygon',
        chainId: 137,
        rpcUrl: 'https://polygon-rpc.com', 
        tokens: [
            { symbol: 'MATIC', address: '0x0000000000000000000000000000000000001010' },
            { symbol: 'USDC', address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' },
            { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
        ],
    }
];