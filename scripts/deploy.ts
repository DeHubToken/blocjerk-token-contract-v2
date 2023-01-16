import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network, upgrades } from "hardhat";
import { DeHubToken, DeHubToken__factory } from "../typechain";
import { config } from "./config";
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
    network.name === "polygon" ||
    network.name === "polygonMumbai" ||
    network.name === "bsc" ||
    network.name === "bscTestnet"
  ) {
    const DeHubTokenFactory = new DeHubToken__factory(deployer);
    const dehubToken = (await upgrades.deployProxy(DeHubTokenFactory, [
      config[network.name].name,
      config[network.name].symbol,
    ])) as DeHubToken;
    await dehubToken.deployed();

    console.log(`DeHubToken deployed at ${dehubToken.address}`);

    const dehubTokenImpl = await upgrades.erc1967.getImplementationAddress(
      dehubToken.address
    );
    await verifyContract(dehubTokenImpl);

    console.log(`Minting tokens...`);
    const tx = await dehubToken.mint(
      config[network.name].treasuryAddress,
      config[network.name].totalSupply
    );
    console.log(`Waiting to finish...`);
    await tx.wait();
    console.log(`Finished minting`);

    console.log(
      `Transferring token ownership to ${config[network.name].ownerAddress}`
    );
    await dehubToken.transferOwnership(config[network.name].ownerAddress);

    console.log(
      `Transferring proxy admin ownership to ${
        config[network.name].ownerAddress
      }`
    );
    await upgrades.admin.transferProxyAdminOwnership(
      config[network.name].ownerAddress
    );

    console.table([
      {
        Label: "Deployer",
        Info: deployer.address,
      },
      {
        Label: "DeHubToken",
        Info: dehubToken.address,
      },
      {
        Label: "DeHubToken impl",
        Info: dehubTokenImpl,
      },
      {
        Label: "Owner address",
        Info: config[network.name].ownerAddress,
      },
      {
        Label: "Treasury address",
        Info: config[network.name].treasuryAddress,
      },
      {
        Label: "Total supply",
        Info: ethers.utils
          .formatEther(config[network.name].totalSupply)
          .toString(),
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
