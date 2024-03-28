// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

// Slight modifiations from base Open Zeppelin Contracts
// Consult /oz/README.md for more information
import "../BlocjerkTokenV4.sol";
import "./TestParent.sol";

contract BlocjerkTokenV4UpgradeSafe is BlocjerkTokenV4, TestParent {
  function upgradeSafe() external pure returns (string memory) {
    return "Hello World";
  }

  function _transfer(
    address sender,
    address recipient,
    uint256 amount
  ) internal virtual override(BlocjerkTokenV4, TestParent) {
    super._transfer(sender, recipient, amount);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override(BlocjerkTokenV4, TestParent) {
    super._beforeTokenTransfer(from, to, amount);
  }
}
