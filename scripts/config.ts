import { ethers } from "ethers";

type Network =
  | "mainnet"
  | "goerli"
  | "polygon"
  | "polygonMumbai"
  | "bsc"
  | "bscTestnet";

interface Config {
  ownerAddress: string;
  treasuryAddress: string;
  totalSupply: ethers.BigNumber;
  name: string;
  symbol: string;
}

const oneMillion = 10 ** 6; // 1000000
const oneBillion = 10 ** 9; // 1000000000
const numDecimals = 18;
// token has 18 decimal places
const decimals = ethers.BigNumber.from(10).pow(numDecimals);

export const config: { [network in Network]: Config } = {
  mainnet: {
    ownerAddress: "0xBF3039b0bB672B268e8384e30D81b1e6a8A43b2c",
    treasuryAddress: "0xBF3039b0bB672B268e8384e30D81b1e6a8A43b2c",
    totalSupply: ethers.BigNumber.from(oneBillion)
      .mul(15)
      .div(10)
      .mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  goerli: {
    ownerAddress: "0xD3b5134fef18b69e1ddB986338F2F80CD043a1AF",
    treasuryAddress: "0xc2cd62B57CBC991beDaC0D49AdCc12F10A9Dc7c0",
    totalSupply: ethers.BigNumber.from(oneBillion)
      .mul(15)
      .div(10)
      .mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  polygon: {
    ownerAddress: "0xBF3039b0bB672B268e8384e30D81b1e6a8A43b2c",
    treasuryAddress: "0xBF3039b0bB672B268e8384e30D81b1e6a8A43b2c",
    totalSupply: ethers.BigNumber.from(oneBillion)
      .mul(15)
      .div(10)
      .mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  polygonMumbai: {
    ownerAddress: "0xD3b5134fef18b69e1ddB986338F2F80CD043a1AF",
    treasuryAddress: "0xc2cd62B57CBC991beDaC0D49AdCc12F10A9Dc7c0",
    totalSupply: ethers.BigNumber.from(oneBillion)
      .mul(15)
      .div(10)
      .mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  bsc: {
    ownerAddress: "0xBF3039b0bB672B268e8384e30D81b1e6a8A43b2c",
    treasuryAddress: "0xBF3039b0bB672B268e8384e30D81b1e6a8A43b2c",
    totalSupply: ethers.BigNumber.from(oneBillion).mul(5).mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  bscTestnet: {
    ownerAddress: "0xD3b5134fef18b69e1ddB986338F2F80CD043a1AF",
    treasuryAddress: "0xc2cd62B57CBC991beDaC0D49AdCc12F10A9Dc7c0",
    totalSupply: ethers.BigNumber.from(oneBillion).mul(5).mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
};
