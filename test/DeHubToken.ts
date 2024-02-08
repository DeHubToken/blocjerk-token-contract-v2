import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { DeHubTokenV4, DeHubTokenV4__factory } from "../typechain";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

describe("DeHubToken", () => {
  let deployer: SignerWithAddress,
    pool: SignerWithAddress,
    taxTo: SignerWithAddress,
    user1: SignerWithAddress,
    user2: SignerWithAddress;

  let deHubToken: DeHubTokenV4;

  beforeEach("initial setup", async () => {
    [deployer, pool, taxTo, user1, user2] = await ethers.getSigners();

    const deHubTokenFactory = new DeHubTokenV4__factory(deployer);
    deHubToken = (await upgrades.deployProxy(deHubTokenFactory, [
      "DeHub",
      "DHB",
    ])) as DeHubTokenV4;
    await deHubToken.deployed();

    await deHubToken.setTaxTo(taxTo.address);

    await deHubToken.mint(pool.address, ethers.utils.parseEther("30000"));
    await deHubToken.mint(user1.address, ethers.utils.parseEther("20000"));
    await deHubToken.mint(user2.address, ethers.utils.parseEther("10000"));
  });

  it("should transfer tokens", async () => {
    const amount = ethers.utils.parseEther("500");
    const balancerBefore1 = await deHubToken.balanceOf(user1.address);
    const balancerBefore2 = await deHubToken.balanceOf(user2.address);

    await deHubToken.connect(user1).transfer(user2.address, amount);
    const balancerAfter1 = await deHubToken.balanceOf(user1.address);
    const balancerAfter2 = await deHubToken.balanceOf(user2.address);

    expect(balancerBefore1.sub(balancerAfter1)).eq(amount);
    expect(balancerAfter2.sub(balancerBefore2)).eq(amount);
  });

  it("should buy tokens except tax", async () => {
    await deHubToken.connect(deployer).setBuySellTaxRate(400, 2000);
    await deHubToken.connect(deployer).addPoolToTax(pool.address);

    const amount = ethers.utils.parseEther("500");
    const balancerBeforePool = await deHubToken.balanceOf(pool.address);
    const balancerBefore1 = await deHubToken.balanceOf(user1.address);

    await deHubToken.connect(pool).transfer(user1.address, amount);
    const balancerAfterPool = await deHubToken.balanceOf(pool.address);
    const balancerAfter1 = await deHubToken.balanceOf(user1.address);

    expect(balancerBeforePool.sub(balancerAfterPool)).eq(amount);
    expect(balancerAfter1.sub(balancerBefore1)).eq(
      amount.mul(10000 - 400).div(10000)
    );
  });

  it("should sell tokens except tax", async () => {
    await deHubToken.connect(deployer).setBuySellTaxRate(400, 2000);
    await deHubToken.connect(deployer).addPoolToTax(pool.address);

    const amount = ethers.utils.parseEther("500");
    const balancerBefore1 = await deHubToken.balanceOf(user1.address);
    const balancerBeforePool = await deHubToken.balanceOf(pool.address);

    await deHubToken.connect(user1).transfer(pool.address, amount);
    const balancerAfter1 = await deHubToken.balanceOf(user1.address);
    const balancerAfterPool = await deHubToken.balanceOf(pool.address);

    expect(balancerBefore1.sub(balancerAfter1)).eq(amount);
    expect(balancerAfterPool.sub(balancerBeforePool)).eq(
      amount.mul(10000 - 2000).div(10000)
    );
  });
});
