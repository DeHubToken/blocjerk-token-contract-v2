// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {SafeMathUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "../oz/ERC20Upgradeable.sol";

contract TestParent is OwnableUpgradeable, ERC20Upgradeable {
  using SafeMathUpgradeable for uint256;

  /* ---------------------------------- Fees ---------------------------------- */

  uint256 public tFeeTotal;

  // Will be redistributed amongst holders
  uint256 public taxFee;
  // Used to cache fee when removing fee temporarily.
  uint256 public previousTaxFee;
  // Will be used for liquidity
  uint256 public liquidityFee;
  // Used to cache fee when removing fee temporarily.
  uint256 public previousLiquidityFee;
  // Will keep tabs on the amount which should be taken from wallet for liquidity.
  uint256 public accumulatedForLiquidity;
  // Will be used for expenses (dev, licensing, marketing)
  uint256 public expensesFee;
  // Used to cache fee when removing fee temporarily.
  uint256 public previousExpensesFee;
  // Will keep tabs on the amount which should be taken from wallet for expenses.
  uint256 public accumulatedForExpenses;
  // Will be used for buyback
  uint256 public buybackFee;
  // Used to cache fee when removing fee temporarily.
  uint256 public previousBuybackFee;
  // Will keep tabs on the amount which should be taken from wallet for buyback.
  uint256 public accumulatedForBuyback;
  // Will be sold for ETH and distributed to holders as rewards.
  uint256 public distributionFee;
  // Used to cache fee when removing fee temporarily.
  uint256 public previousDistributionFee;
  // Will keep tabs on the amount which should be taken from wallet for distribution.
  uint256 public accumulatedForDistribution;
  // Will be sold for ETH and used as a collateral funds.
  uint256 public collateralFee;
  // Used to cache fee when removing fee temporarily.
  uint256 public previousCollateralFee;
  // Will keep tabs on the amount which should be taken from wallet for collateral.
  uint256 public accumulatedForCollateral;

  function _transfer(
    address sender,
    address recipient,
    uint256 amount
  ) internal virtual override(ERC20Upgradeable) {
    super._transfer(sender, recipient, amount);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override(ERC20Upgradeable) {
    super._beforeTokenTransfer(from, to, amount);
  }
}
