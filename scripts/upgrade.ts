import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network, upgrades } from "hardhat";
import {
  BlocjerkToken,
  BlocjerkTokenV5__factory,
} from "../typechain";
import { config } from "./config";
import { verifyContract } from "./helpers";
import * as manifestMainnet from "../.openzeppelin/mainnet.json";
import * as manifestSepolia from "../.openzeppelin/unknown-11155111.json";

const main = async () => {
  const signers = await ethers.getSigners();
  if (signers.length < 1) {
    throw new Error(`Not found deployer`);
  }

  const deployer: SignerWithAddress = signers[0];
  console.log(`Using deployer address ${deployer.address}`);

  if (
    network.name === "mainnet" ||
    // network.name === "goerli" ||
    network.name === "sepolia" ||
    // network.name === "polygon" ||
    // network.name === "polygonMumbai" ||
    // network.name === "bsc" ||
    // network.name === "bscTestnet"
    false
  ) {
    const proxyAddr = 
      network.name === "mainnet" ?
        manifestMainnet.proxies[0].address :
        manifestSepolia.proxies[0].address;

    console.log("Proxy Address", proxyAddr);

    const BlocjerkTokenFactory = new BlocjerkTokenV5__factory(deployer);
    // await upgrades.forceImport(proxyAddr, BlocjerkTokenFactory);
    const dehubToken = (await upgrades.upgradeProxy(
      proxyAddr,
      BlocjerkTokenFactory)) as BlocjerkToken;

    console.log(`BlocjerkToken upgraded at ${dehubToken.address}`);

    const blocjerkTokenImpl = await upgrades.erc1967.getImplementationAddress(
      dehubToken.address
    );
    console.log(`BlocjerkToken implementation at ${blocjerkTokenImpl}`);
    await verifyContract(blocjerkTokenImpl);

    console.table([
      {
        Label: "Deployer",
        Info: deployer.address,
      },
      {
        Label: "BlocjerkToken",
        Info: dehubToken.address,
      },
      {
        Label: "BlocjerkToken impl",
        Info: blocjerkTokenImpl,
      },
    ]);
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
