# DeHub Token(v2) Contract

DeHub Token(v2) is updated version of $DHB as an upgradeable contract.

## Deployment

Execute the following command to deploy $DHB on the network
```bash
npm run deploy [network name]
```

i.e. if you want to deploy on mainnet,
```bash
npm run deploy mainnet
```

## Upgrade contract

Make sure you have already updated contract with new version.
i.e. DeHubTokenV4 was updated on top of DeHubTokenV3.

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
  [proxy address], // $DHB contract address
  [new implementation address] // newly deployed DeHubTokenV4 contract
)
```

Open $DHB contract on etherscan and confirm that contract was upgraded.

## Changes

### V4
- Added new feature to adjust buy and sell tax rates, and send tax fee to specific wallet address
- Set same buy & sell tax rates per each pool, whichever added liquidity on any DEX
- Add `onlyOwner` permission to `transferBulk`, `transferFromBulk`, `burnBulk`.

#### Steps to configure tax
Only owner can configure tax related states.

1. Set buy, sell tax rates
Write the contract by calling `setBuySellTaxRate`.
```javascript
setBuySellTaxRate(
  [buy tax rate],
  [sell tax rate]
)
```

> NOTE: please input tax rate based on 100% as 10000, multiply tax rate by 100.
For example, if tax rate is 20%, 20% = 2000 = 20 * 100

2. Set wallet address where you want to get tax fees
```javascript
setTaxTo(
  [wallet address]
)
```

3. Add liquidity pool addresses which you added liquidities on any DEX such as uniswap v2.

For example, if you added liquidity of $DHB + $WETH on uniswap v2, add its LP pair address.
```javascript
addPoolToTax(
  [pool address]
)
```

## Contract Addresses

Network | Contract Address
--- | ---
Ethereum | 0x99BB69Ee1BbFC7706C3ebb79b21C5B698fe58EC0
Polygon | 0x6051e59eb50BB568415B6C476Fbd394EEF83834D
Binance Smart Chain | 0x680D3113caf77B61b510f332D5Ef4cf5b41A761D