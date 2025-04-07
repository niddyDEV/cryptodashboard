export interface Token {
    symbol: string;
    address: string;
    pairAddress?: string; // Адрес пары с USDT
    decimals?: number;
}

export interface Chain {
    name: string;
    chainId: number;
    rpcUrl: string;
    dex: {
        name: string;
        factoryAddress: string;
        routerAddress: string;
    };
    blockExplorer: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    tokens: Token[];
}

export const chains: Chain[] = [
    {
        name: 'Ethereum',
        chainId: 1,
        rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
        blockExplorer: 'https://etherscan.io',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        dex: {
            name: 'Uniswap V2',
            factoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
            routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
        },
        tokens: [
            { 
                symbol: 'ETH', 
                address: '0x0000000000000000000000000000000000000000',
                pairAddress: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
                decimals: 18
            },
            { 
                symbol: 'USDT', 
                address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                pairAddress: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
                decimals: 6
            },
            { 
                symbol: 'DAI', 
                address: '0x6b175474e89094c44da98b954eedeac495271d0f',
                pairAddress: '0xb20bd5d04be54f870d5c0d3ca85d82b34b836405',
                decimals: 18
            }
        ],
    },
    {
        name: 'Binance Smart Chain',
        chainId: 56,
        rpcUrl: 'https://bsc-dataseed.binance.org/',
        blockExplorer: 'https://bscscan.com',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        dex: {
            name: 'PancakeSwap V2',
            factoryAddress: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
            routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
        },
        tokens: [
            { 
                symbol: 'BNB', 
                address: '0x0000000000000000000000000000000000000000',
                pairAddress: '0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae',
                decimals: 18
            },
            { 
                symbol: 'BUSD', 
                address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
                pairAddress: '0x7efaef62fddcca950418312c6c91aef321375a00',
                decimals: 18
            },
            { 
                symbol: 'USDT', 
                address: '0x55d398326f99059ff775485246999027b3197955',
                pairAddress: '0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae',
                decimals: 18
            }
        ],
    },
    {
        name: 'Polygon',
        chainId: 137,
        rpcUrl: 'https://polygon-rpc.com',
        blockExplorer: 'https://polygonscan.com',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
        },
        dex: {
            name: 'QuickSwap',
            factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
            routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
        },
        tokens: [
            { 
                symbol: 'MATIC', 
                address: '0x0000000000000000000000000000000000001010',
                pairAddress: '0x604229c960e5cacf2aaeac8be68ac07ba9df81c3',
                decimals: 18
            },
            { 
                symbol: 'USDC', 
                address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
                pairAddress: '0x4b1f1e2435a9c96f7330faea190ef6a7c8d70001',
                decimals: 6
            },
            { 
                symbol: 'USDT', 
                address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
                pairAddress: '0x604229c960e5cacf2aaeac8be68ac07ba9df81c3',
                decimals: 6
            }
        ],
    }
];