// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

// Slight modifiations from base Open Zeppelin Contracts
// Consult /oz/README.md for more information
import {BlocjerkTokenV4} from "../BlocjerkTokenV4.sol";
import {Uniswap} from "../core/Uniswap.sol";

contract BlocjerkTokenV4UpgradeSafeWithCore is BlocjerkTokenV4, Uniswap {
  function upgradeSafe() external pure returns (string memory) {
    return "Hello World";
  }

  function _transfer(
    address sender,
    address recipient,
    uint256 amount
  ) internal virtual override {
    super._transfer(sender, recipient, amount);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override {
    super._beforeTokenTransfer(from, to, amount);
  }
}
