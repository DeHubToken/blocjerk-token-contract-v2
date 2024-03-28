# Blocjerk Token Contract

Blocjerk Token is updated version of $BJ as an upgradeable contract, forked version of $DHB (v2, implementation v4).

## Deployment

Execute the following command to deploy $BJ on the network
```bash
npm run deploy [network name]
```

i.e. if you want to deploy on mainnet,
```bash
npm run deploy mainnet
```

## Upgrade contract

Make sure you have already updated contract with new version.
i.e. BlocjerkTokenV4 was updated on top of BlocjerkTokenV3.

1. Deploy implementation contract

```bash
npm run impl [network name]
```

2. Open ProxyAdmin contract on etherscan

Open etherscan.io and go to the address of ProxyAdmin contract, you can find the address in `.openzeppelin/[network].json`.

```json
  "admin": {
    "address": "0xE473C3e0B277255Baf321A75fcf6Ce2C279cD278",
    "txHash": "0x0c5672927fa1bf49be48f4830dd4831d83575c4ceb131d29d8deba787a14eb48"
  },
```

`admin.address` is the address to ProxyAdmin contract.

3. Update implementation address with new one

Write the contract by calling `upgrade`
```javascript
upgrade(
  [proxy address], // $BJ contract address
  [new implementation address] // newly deployed BlockjerkTokenV4 contract
)
```

Open $BJ contract on etherscan and confirm that contract was upgraded.

## Operations TODO against BlocjerkTokenV5 upgrades

NOTE: $BJ will be added liquidity on Uniswap V2 with $WETH

- Call `addPoolToTax` or `removePoolToTax` to add or remove pools where takes tax fees of buying or selling
- Call `setTaxTo` to set target address where tax fees will be transfered directly after swapping for WETH
- Call `setMinTaxForSell` to set minimum tax fee amount to sell for ETH
- Call `setRouter` to set Uniswap V2 Router and Pair address($BJ + $WETH)
- Finally call `upgradeToV5` to mark all the setting is done


## Contract Addresses

Network | Contract Address
--- | ---
Ethereum | 0x9cAAe40DCF950aFEA443119e51E821D6FE2437ca
Arbitrum | 0x9cAAe40DCF950aFEA443119e51E821D6FE2437ca

### Pools

Network | Pair | Contract Address
--- | --- | ---
Ethereum | $BJ+$WETH | 0x20dDbFd14F316D417f5B1a981B5Dc926a4dFd4D1
Sepolia | $BJ+$WETH | 0x0190512Ad8Be3Ff42063e12aB7E353A038c4ecF5