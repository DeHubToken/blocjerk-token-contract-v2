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
    ownerAddress: "",
    treasuryAddress: "",
    totalSupply: ethers.BigNumber.from(250).mul(oneMillion).mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  goerli: {
    ownerAddress: "0xD3b5134fef18b69e1ddB986338F2F80CD043a1AF",
    treasuryAddress: "0xc2cd62B57CBC991beDaC0D49AdCc12F10A9Dc7c0",
    totalSupply: ethers.BigNumber.from(250).mul(oneMillion).mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  polygon: {
    ownerAddress: "",
    treasuryAddress: "",
    totalSupply: ethers.BigNumber.from(250).mul(oneMillion).mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  polygonMumbai: {
    ownerAddress: "0xD3b5134fef18b69e1ddB986338F2F80CD043a1AF",
    treasuryAddress: "0xc2cd62B57CBC991beDaC0D49AdCc12F10A9Dc7c0",
    totalSupply: ethers.BigNumber.from(250).mul(oneMillion).mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  bsc: {
    ownerAddress: "",
    treasuryAddress: "",
    totalSupply: ethers.BigNumber.from(75)
      .mul(oneBillion)
      .div(10)
      .mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
  bscTestnet: {
    ownerAddress: "0xD3b5134fef18b69e1ddB986338F2F80CD043a1AF",
    treasuryAddress: "0xc2cd62B57CBC991beDaC0D49AdCc12F10A9Dc7c0",
    totalSupply: ethers.BigNumber.from(75)
      .mul(oneBillion)
      .div(10)
      .mul(decimals),
    name: "DeHub",
    symbol: "DHB",
  },
};
