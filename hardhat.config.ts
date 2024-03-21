import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TESTNET_PRIVATE_KEY: string;
      MAINNET_PRIVATE_KEY: string;
      
      ETHERSCAN_API_KEY: string;
      POLYGONSCAN_API_KEY: string;
      BSCSCAN_API_KEY: string;
      ARBSCAN_API_KEY: string;
    }
  }
}

const config: HardhatUserConfig = {
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
  },
  mocha: {
    timeout: 50000,
  },
  networks: {
    mainnet: {
      url: `https://eth-mainnet.public.blastapi.io`,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/fa959ead3761429bafa6995a4b25397e`,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
    sepolia: {
      url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public", // `https://eth-sepolia.public.blastapi.io`,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
    polygon: {
      url: `https://polygon-rpc.com`, // `https://matic-mainnet.chainstacklabs.com`,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
      gasPrice: "auto",
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.infura.io/v3/97e75e0bbc6a4419a5dd7fe4a518b917`,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
    bsc: {
      url: `https://bsc-dataseed.binance.org`,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
    bscTestnet: {
      url: `https://bsc-testnet.public.blastapi.io`,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
    arb: {
      url: `https://rpc.chroniclelabs.io/arb1`,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
    arbTestnet: {
      url: `https://sepolia-rollup.arbitrum.io/rpc`,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      mainnet: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
    },
  },
};

export default config;
