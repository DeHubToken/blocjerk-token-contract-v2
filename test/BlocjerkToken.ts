import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BlocjerkTokenV4, BlocjerkTokenV4__factory } from "../typechain";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

describe("BlocjerkToken", () => {
  let deployer: SignerWithAddress,
    pool: SignerWithAddress,
    taxTo: SignerWithAddress,
    user1: SignerWithAddress,
    user2: SignerWithAddress;

  let blocjerkToken: BlocjerkTokenV4;

  beforeEach("initial setup", async () => {
    [deployer, pool, taxTo, user1, user2] = await ethers.getSigners();

    const blocjerkTokenFactory = new BlocjerkTokenV4__factory(deployer);
    blocjerkToken = (await upgrades.deployProxy(blocjerkTokenFactory, [
      "Blocjerk",
      "BJ",
    ])) as BlocjerkTokenV4;
    await blocjerkToken.deployed();

    await blocjerkToken.setTaxTo(taxTo.address);

    await blocjerkToken.mint(pool.address, ethers.utils.parseEther("30000"));
    await blocjerkToken.mint(user1.address, ethers.utils.parseEther("20000"));
    await blocjerkToken.mint(user2.address, ethers.utils.parseEther("10000"));
  });

  it("should transfer tokens", async () => {
    const amount = ethers.utils.parseEther("500");
    const balancerBefore1 = await blocjerkToken.balanceOf(user1.address);
    const balancerBefore2 = await blocjerkToken.balanceOf(user2.address);

    await blocjerkToken.connect(user1).transfer(user2.address, amount);
    const balancerAfter1 = await blocjerkToken.balanceOf(user1.address);
    const balancerAfter2 = await blocjerkToken.balanceOf(user2.address);

    expect(balancerBefore1.sub(balancerAfter1)).eq(amount);
    expect(balancerAfter2.sub(balancerBefore2)).eq(amount);
  });

  it("should buy tokens except tax", async () => {
    await blocjerkToken.connect(deployer).setBuySellTaxRate(400, 2000);
    await blocjerkToken.connect(deployer).addPoolToTax(pool.address);

    const amount = ethers.utils.parseEther("500");
    const balancerBeforePool = await blocjerkToken.balanceOf(pool.address);
    const balancerBefore1 = await blocjerkToken.balanceOf(user1.address);

    await blocjerkToken.connect(pool).transfer(user1.address, amount);
    const balancerAfterPool = await blocjerkToken.balanceOf(pool.address);
    const balancerAfter1 = await blocjerkToken.balanceOf(user1.address);

    expect(balancerBeforePool.sub(balancerAfterPool)).eq(amount);
    expect(balancerAfter1.sub(balancerBefore1)).eq(
      amount.mul(10000 - 400).div(10000)
    );
  });

  it("should sell tokens except tax", async () => {
    await blocjerkToken.connect(deployer).setBuySellTaxRate(400, 2000);
    await blocjerkToken.connect(deployer).addPoolToTax(pool.address);

    const amount = ethers.utils.parseEther("500");
    const balancerBefore1 = await blocjerkToken.balanceOf(user1.address);
    const balancerBeforePool = await blocjerkToken.balanceOf(pool.address);

    await blocjerkToken.connect(user1).transfer(pool.address, amount);
    const balancerAfter1 = await blocjerkToken.balanceOf(user1.address);
    const balancerAfterPool = await blocjerkToken.balanceOf(pool.address);

    expect(balancerBefore1.sub(balancerAfter1)).eq(amount);
    expect(balancerAfterPool.sub(balancerBeforePool)).eq(
      amount.mul(10000 - 2000).div(10000)
    );
  });
});
