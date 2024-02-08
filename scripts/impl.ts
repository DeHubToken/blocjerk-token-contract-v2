import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import { DeHubTokenV4__factory } from "../typechain";
import { verifyContract } from "./helpers";

const main = async () => {
  const signers = await ethers.getSigners();
  if (signers.length < 1) {
    throw new Error(`Not found deployer`);
  }

  const deployer: SignerWithAddress = signers[0];
  console.log(`Using deployer address ${deployer.address}`);

  if (
    network.name === "mainnet" ||
    network.name === "goerli" ||
    network.name === "sepolia" ||
    network.name === "polygon" ||
    network.name === "polygonMumbai" ||
    network.name === "bsc" ||
    network.name === "bscTestnet"
  ) {
    const DeHubTokenFactory = new DeHubTokenV4__factory(deployer);
    const dehubToken = await DeHubTokenFactory.deploy();
    await dehubToken.deployed();

    console.log(`DeHubToken deployed at ${dehubToken.address}`);
    await verifyContract(dehubToken.address);
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
