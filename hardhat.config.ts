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
      url: `https://eth-mainnet.alchemyapi.io/v2/-nhhIZg46QlTmzPozXF07vyxpK5BGukx`,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/fa959ead3761429bafa6995a4b25397e`,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/uf5UrDryIg7umF1vd3utMXw1uI5p54sr`,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/_anjj3tgTgu1Zqx9Lj_x5fQnDM2bAdrI`,
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
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY,
      mainnet: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
    },
  },
};

export default config;
