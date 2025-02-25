# OsmoJS 

<p align="center">
  <a href="https://github.com/osmosis-labs/osmojs">
    <img width="150" src="https://user-images.githubusercontent.com/545047/178600364-accb0c63-1935-4756-a457-e38b45e3289d.png">
  </a>
</p>

<p align="center" width="100%">
  <a href="https://github.com/osmosis-labs/osmojs/actions/workflows/run-tests.yaml">
    <img height="20" src="https://github.com/osmosis-labs/osmojs/actions/workflows/run-tests.yaml/badge.svg" />
  </a>
   <a href="https://github.com/osmosis-labs/osmojs/blob/main/LICENSE"><img height="20" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
   <a href="https://www.npmjs.com/package/osmojs"><img height="20" src="https://img.shields.io/github/package-json/v/osmosis-labs/osmojs?filename=packages%2Fosmojs%2Fpackage.json"></a>
</p>

[OsmosJS](https://github.com/osmosis-labs/osmojs) makes it easy to compose and broadcast Osmosis and Cosmos messages, with all of the proto and amino encoding handled for you.

---
## usage

```sh
npm install osmojs
```

### Composing Messages

Import the `osmosis` object from `osmojs`. In this case, we're show the messages available from the `osmosis.gamm.v1beta1` module:

```js
import { osmosis } from 'osmojs';

const {
    joinPool,
    exitPool,
    exitSwapExternAmountOut,
    exitSwapShareAmountIn,
    joinSwapExternAmountIn,
    joinSwapShareAmountOut,
    swapExactAmountIn,
    swapExactAmountOut
} = osmosis.gamm.v1beta1.MessageComposer.withTypeUrl;
```

To see a complete list of messages, [see the section below](#osmosis-messages).

Now you can construct messages. If you use vscode or another typescript-enabled IDE, you should also be able to use `ctrl+space` to see auto-completion of the fields required for the message.

```js
import { coin } from '@cosmjs/amino';

const msg = swapExactAmountIn({
  sender,
  routes,
  tokenIn: coin(amount, denom),
  tokenOutMinAmount
});
```

(If you want to see an example of calculating `routes` and `tokenOutMinAmount` cosmology uses osmojs and has an [example here](https://github.com/cosmology-tech/cosmology/tree/main/packages/core#lookuproutesfortrade).)

### Calculating Fees

Make sure to create a `fee` object in addition to your message.

For most messages, you can use the predefined fee objects.

```ts
import { FEE_VALUES } from 'osmojs';

const fee = FEE_VALUES.osmosis.swapExactAmountIn;
```

Or you can construct manually if you wish:

```js
import { coins } from '@cosmjs/amino';

const fee = {
    amount: coins(0, 'uosmo'),
    gas: '250000'
}
```

if you are broadcasting multiple messages in a batch, you should `simulate` your tx and estimate the fee

```js
import { Dec, IntPretty } from '@keplr-wallet/unit';

const gasEstimated = await stargateClient.simulate(address, msgs, memo);
const fee = {
  amount: coins(0, 'uosmo'),
  gas: new IntPretty(new Dec(gasEstimated).mul(new Dec(1.3)))
    .maxDecimals(0)
    .locale(false)
    .toString()
};
```

### Initializing the Stargate Client

Use `getSigningOsmosisClient` to get your `SigningStargateClient`, with the Osmosis proto/amino messages full-loaded. No need to manually add amino types, just require and initialize the client:

```js
import { getSigningOsmosisClient } from 'osmojs';

const client = await getSigningOsmosisClient({
  rpcEndpoint,
  signer // OfflineSigner
});
```
### Broadcasting messages

Now that you have your `client`, you can broadcast messages:

```js
import { signAndBroadcast } from 'osmojs';

const res = await signAndBroadcast({
  client,
  // use 'osmo-test-4' for testnet
  chainId: 'osmosis-1',
  address,
  msgs: [msg],
  fee,
  memo: ''
});
```

### Osmosis Messages

```js
import { osmosis } from 'osmojs';

const {
    beginUnlocking,
    beginUnlockingAll,
    lockTokens
} = osmosis.lockup.MessageComposer.withTypeUrl;

const {
    lockAndSuperfluidDelegate,
    superfluidDelegate,
    superfluidUnbondLock,
    superfluidUndelegate
} = osmosis.superfluid.MessageComposer.withTypeUrl;

const {
    addToGauge,
    createGauge
} = osmosis.incentives.MessageComposer.withTypeUrl;

const {
    joinPool,
    exitPool,
    exitSwapExternAmountOut,
    exitSwapShareAmountIn,
    joinSwapExternAmountIn,
    joinSwapShareAmountOut,
    swapExactAmountIn,
    swapExactAmountOut
} = osmosis.gamm.v1beta1.MessageComposer.withTypeUrl;
```

### IBC Messages

```js
import { ibc } from 'osmojs';

const {
    transfer
} = ibc.applications.transfer.v1.MessageComposer.withTypeUrl
```

### Cosmos Messages

```js
import { cosmos } from 'osmojs';

const {
    fundCommunityPool,
    setWithdrawAddress,
    withdrawDelegatorReward,
    withdrawValidatorCommission
} = cosmos.distribution.v1beta1.MessageComposer.fromPartial;

const {
    multiSend,
    send
} = cosmos.bank.v1beta1.MessageComposer.fromPartial;

const {
    beginRedelegate,
    createValidator,
    delegate,
    editValidator,
    undelegate
} = cosmos.staking.v1beta1.MessageComposer.fromPartial;

const {
    deposit,
    submitProposal,
    vote,
    voteWeighted
} = cosmos.gov.v1beta1.MessageComposer.fromPartial;
```

### CosmWasm Messages

```js
import { cosmwasm } from "osmojs";

const {
    clearAdmin,
    executeContract,
    instantiateContract,
    migrateContract,
    storeCode,
    updateAdmin
} = cosmwasm.wasm.v1.MessageComposer.withTypeUrl;
```

### Advanced Usage

[documentation](https://github.com/osmosis-labs/osmojs/tree/main/packages/osmojs/docs)

## Disclaimer

AS DESCRIBED IN THE OSMOSIS LICENSES, THE SOFTWARE IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating OsmoJS will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the OsmoJS code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
