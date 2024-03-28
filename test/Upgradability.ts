import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BlocjerkTokenV4, BlocjerkTokenV4UpgradeSafeWithCore__factory, BlocjerkTokenV4UpgradeSafe__factory, BlocjerkTokenV4__factory, BlocjerkTokenV4UpgradeUnsafe__factory, TestParent__factory, BlocjerkTokenV5__factory } from "../typechain";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

describe("Upgradeability", () => {
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
      "DHB",
    ])) as BlocjerkTokenV4;
    await blocjerkToken.deployed();

    await blocjerkToken.setTaxTo(taxTo.address);

    await blocjerkToken.mint(pool.address, ethers.utils.parseEther("30000"));
    await blocjerkToken.mint(user1.address, ethers.utils.parseEther("20000"));
    await blocjerkToken.mint(user2.address, ethers.utils.parseEther("10000"));

    // set some storage
    await blocjerkToken.setBuySellTaxRate(100, 200);
    await blocjerkToken.authorizeSnapshotter(user1.address);
    await blocjerkToken.authorizeSnapshotter(user2.address);
    await blocjerkToken.addPoolToTax(user1.address);
    await blocjerkToken.addPoolToTax(user2.address);
  });

  it("deploy TestParent", async () => {
    const TestParentFactory = new TestParent__factory(deployer);
    const testParent = await TestParentFactory.deploy();
    await testParent.deployTransaction.wait();
    expect(testParent.address.length).gt(0);
  });

  it("upgrade safe test", async () => {
    // Backup storage values before upgrade
    const poolBalance = await blocjerkToken.balanceOf(pool.address);
    const user1Balance = await blocjerkToken.balanceOf(user1.address);
    const user2Balance = await blocjerkToken.balanceOf(user2.address);

    const buySellTaxRate = await blocjerkToken.buyTaxRate();
    const poolUser1 = await blocjerkToken.poolsToTax(user1.address);
    const poolUser2 = await blocjerkToken.poolsToTax(user2.address);

    try {
      const BlocjerkTokenV4UpgradeSafeFactory = new BlocjerkTokenV4UpgradeSafe__factory(deployer);
      await upgrades.upgradeProxy(blocjerkToken, BlocjerkTokenV4UpgradeSafeFactory);
    } catch (err) {
      console.error(err);
      expect(false).to.be.true;
      return;
    }

    // Get storage values again after upgrade
    const poolBalanceAfter = await blocjerkToken.balanceOf(pool.address);
    const user1BalanceAfter = await blocjerkToken.balanceOf(user1.address);
    const user2BalanceAfter = await blocjerkToken.balanceOf(user2.address);

    const buySellTaxRateAfter = await blocjerkToken.buyTaxRate();
    const poolUser1After = await blocjerkToken.poolsToTax(user1.address);
    const poolUser2After = await blocjerkToken.poolsToTax(user2.address);

    expect(poolBalance).eq(poolBalanceAfter);
    expect(user1Balance).eq(user1BalanceAfter);
    expect(user2Balance).eq(user2BalanceAfter);
    expect(buySellTaxRate).eq(buySellTaxRateAfter);
    expect(poolUser1).eq(poolUser1After);
    expect(poolUser2).eq(poolUser2After);
  });

  it("upgrade safe test of v4 with core", async () => {
    // Backup storage values before upgrade
    const poolBalance = await blocjerkToken.balanceOf(pool.address);
    const user1Balance = await blocjerkToken.balanceOf(user1.address);
    const user2Balance = await blocjerkToken.balanceOf(user2.address);

    const buySellTaxRate = await blocjerkToken.buyTaxRate();
    const poolUser1 = await blocjerkToken.poolsToTax(user1.address);
    const poolUser2 = await blocjerkToken.poolsToTax(user2.address);

    try {
      const BlocjerkTokenV4UpgradeSafeWithCoreFactory = new BlocjerkTokenV4UpgradeSafeWithCore__factory(deployer);
      await upgrades.upgradeProxy(blocjerkToken, BlocjerkTokenV4UpgradeSafeWithCoreFactory);
    } catch (err) {
      console.error(err);
      expect(false).to.be.true;
      return;
    }

    // Get storage values again after upgrade
    const poolBalanceAfter = await blocjerkToken.balanceOf(pool.address);
    const user1BalanceAfter = await blocjerkToken.balanceOf(user1.address);
    const user2BalanceAfter = await blocjerkToken.balanceOf(user2.address);

    const buySellTaxRateAfter = await blocjerkToken.buyTaxRate();
    const poolUser1After = await blocjerkToken.poolsToTax(user1.address);
    const poolUser2After = await blocjerkToken.poolsToTax(user2.address);

    expect(poolBalance).eq(poolBalanceAfter);
    expect(user1Balance).eq(user1BalanceAfter);
    expect(user2Balance).eq(user2BalanceAfter);
    expect(buySellTaxRate).eq(buySellTaxRateAfter);
    expect(poolUser1).eq(poolUser1After);
    expect(poolUser2).eq(poolUser2After);
  });

  it("upgrade safe test with v5", async () => {
    // Backup storage values before upgrade
    const poolBalance = await blocjerkToken.balanceOf(pool.address);
    const user1Balance = await blocjerkToken.balanceOf(user1.address);
    const user2Balance = await blocjerkToken.balanceOf(user2.address);

    const buySellTaxRate = await blocjerkToken.buyTaxRate();
    const poolUser1 = await blocjerkToken.poolsToTax(user1.address);
    const poolUser2 = await blocjerkToken.poolsToTax(user2.address);

    try {
      const BlocjerkTokenV5Factory = new BlocjerkTokenV5__factory(deployer);
      await upgrades.upgradeProxy(blocjerkToken, BlocjerkTokenV5Factory);
    } catch (err) {
      console.error(err);
      expect(false).to.be.true;
      return;
    }

    // Get storage values again after upgrade
    const poolBalanceAfter = await blocjerkToken.balanceOf(pool.address);
    const user1BalanceAfter = await blocjerkToken.balanceOf(user1.address);
    const user2BalanceAfter = await blocjerkToken.balanceOf(user2.address);

    const buySellTaxRateAfter = await blocjerkToken.buyTaxRate();
    const poolUser1After = await blocjerkToken.poolsToTax(user1.address);
    const poolUser2After = await blocjerkToken.poolsToTax(user2.address);

    expect(poolBalance).eq(poolBalanceAfter);
    expect(user1Balance).eq(user1BalanceAfter);
    expect(user2Balance).eq(user2BalanceAfter);
    expect(buySellTaxRate).eq(buySellTaxRateAfter);
    expect(poolUser1).eq(poolUser1After);
    expect(poolUser2).eq(poolUser2After);
  });

  it("upgrade unsafe test", async () => {
    const BlocjerkTokenV4UpgradeUnsafeFactory = new BlocjerkTokenV4UpgradeUnsafe__factory(deployer);
    try {
      await upgrades.upgradeProxy(blocjerkToken, BlocjerkTokenV4UpgradeUnsafeFactory);
    } catch (err) {
      console.error(err);
      expect(false).to.be.true;
    }
  });
});
