---
id: api
title: API Overview
sidebar_label: API Overview
---

**NOTE: The API is in active development and may change frequently. Be sure to check back
regularly. All API functions will have a maximum of ONE argument: a JSON object containing all the
necessary info.**

The nOS client provides a prebuilt API that is still growing. For any dApp running through the
client, the API can be accessed via `window.NOS.V1`.

## Import and usage of the nOS API

---

## Vanilla Javascript

```javascript
// Contains all nOS API Functions
const nos = window.NOS.V1;

// Contains all exposed assets
const assets = window.NOS.ASSETS;
```

## Installation and usage of API-Functions

First, we need to install the [api-functions](https://www.npmjs.com/package/@nosplatform/api-functions) npm package. This is done with the command(s) below.

```javascript
// Using NPM
npm i --save @nosplatform/api-functions

// Using Yarn
yarn add @nosplatform/api-functions
```

#### Using api-functions inside React

To use the nOS API inside a React package,we highly recommend using the `injectNOS` HOC and `nosProps` propTypes from [api-functions](https://www.npmjs.com/package/@nosplatform/api-functions) .

```javascript
import React from 'react';

// Import the nOS HOC which you can use to bind the props to any component
// Import nosProps for validation
import { injectNOS, nosProps } from '@nosplatform/api-functions/lib/react';

class MyComponent extends React.Component {
  static propTypes = {
    nos: nosProps.isRequired
  };

  handleAlert = async func => alert(await func);

  render() {
    const { classes, nos } = this.props;

    return <button onClick={() => this.handleAlert(nos.getAddress())}>Get Address</button>;
  }
}

export default injectNOS(MyComponent);
```

#### Using api-functions inside Angular/VueJS/Other libraries or frameworks

With any other framework or library you can use the [api-functions](https://www.npmjs.com/package/@nosplatform/api-functions) as followed.

```javascript
// All API functionalities are wrapped in the nos object, this can also be used for React if you wish not to use the Higher Order Component.
import nos from '@nosplatform/api-functions/lib';

nos
  .getAddress()
  .then(address => window.alert(address))
  .catch(error => window.alert(error));
```

&nbsp;

# Overview API

**NOTE** - all examples use the vanilla javascript import strategy. Simply switch out the import of `const nos = window.NOS.V1` with [the examples above](#Installation-and-usage-of-API-Functions) when using React/Angular or other javascript frameworks and libraries.

&nbsp;

## Events

---

Some events have been exposed to provide insight pertaining to network and blockchain changes. The
`on` and `once` functions permit subscribing to an event indefinitely or once, respectively. Each
of these calls returns a subscription identifier, which can be used to unsubscribe via the `off`
function.

```javascript
// subscribe indefinitely
const subscription = nos.on('someEvent', () => {
  /* callback */
});
nos.off('block', subscription); // unsubscribe (optional)

// subscribe once (automatically unsubscribes after first event)
const subscription = nos.once('someEvent', () => {
  /* callback */
});
```

&nbsp;

### `block`

---

The "block" event is published whenever a new block is discovered on the NEO blockchain.

#### Returns

**object** - An object representing the last known block. Refer to verbose response body in the NEO [getblock](http://docs.neo.org/en-us/node/cli/2.7.4/api/getblock.html) documentation for a breakdown of this object's structure.

#### Example

```javascript
// subscribe
nos.on('block', block => {
  console.log('Latest block:', block);
});
```

&nbsp;

## Functions

---

All nOS API functions return a [`Promise`](https://en.wikipedia.org/wiki/Futures_and_promises),
which can be used to determine if the call succeeded or failed. Some calls will fail if the user
rejects the action.

&nbsp;

### `getAddress`

---

The `getAddress` function provides the address of the currently authenticated account. It does not
require the user to grant permission.

#### Parameters

None.

#### Returns

**string** - The address of the currently signed in user.

#### Example

```javascript
const nos = window.NOS.V1;

nos
  .getAddress()
  .then(address => alert(`Address: ${address}`))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

## `getBalance`

---

The `getBalance` function provides the balance of a certain address for a
specified asset or NEP5 token. It does not require the user to grant permission.

#### Parameters

- `config` **object** - The config options to perform this operation.
- `config.asset` **string** - The asset ID or NEP5 token script hash.
- `config.address` **string** (Optional) - The address of the user you'd like to receive the balance for. This defaults to the currently logged on user if the parameter is not passed.

#### Returns

**string** - The balance of the requested asset owned by a certain address. A string is returned instead of a number to prevent floating point rounding issues.

#### Example

```javascript
const nos = window.NOS.V1;
const { NEO } = window.NOS.ASSETS;

const address = 'AZPkgTJixxkSFPyBZrcVpLj9nsHsPDUVkF';

// Example without the optional parameter
nos
  .getBalance({ asset: NEO })
  .then(balance => alert(`Balance: ${balance}`))
  .catch(err => alert(`Error: ${err.message}`));

// Example with the optional parameter
nos
  .getBalance({ asset: NEO, address })
  .then(balance => alert(`Balance: ${balance}`))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

### `getLastBlock`

---

The `getLastBlock` function provides the last known block that was fetched by the client. It does
not require the user to grant permission.

#### Parameters

None.

#### Returns

**object** - An object representing the last known block. Refer to verbose response body in the NEO [getblock](http://docs.neo.org/en-us/node/cli/2.7.4/api/getblock.html) documentation for a breakdown of this object's structure.

#### Example

```javascript
const nos = window.NOS.V1;

nos
  .getLastBlock()
  .then(block => console.log('Last Block:', block))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

### `claimGas`

---

The `claimGas` function claims any unclaimed GAS on behalf of the currently authenticated account.
It requires the user to grant permission.

#### Parameters

None.

#### Returns

**string** - The claim transaction ID.

#### Example

```javascript
const nos = window.NOS.V1;

nos
  .claimGas()
  .then(txid => alert(`GAS claim txid: ${txid}`))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

## `testInvoke`

---

The `testInvoke` function executes a test invocation transaction on behalf of the currently
authenticated account. It does not require the user to grant permission.

#### Parameters

- `config` **object** - The config options to perform this operation.
- `config.scriptHash` **string** - The script hash of the Smart Contract you want to invoke.
- `config.operation` **string** - The operation of the Smart Contract you want to invoke.
- `config.args` **string[]** - An arguments array of the Smart Contract you want to invoke.
- `config.encodeArgs` **boolean** (Optional) - A flag detailing whether or not you want the nOS API to handle encoding or `args`. This is `true` by default.
  **NOTE: If you're sending no arguments, this should be an empty array.**

#### Returns

**object** - Returns the RPC result, including testInvoke script, consumed GAS and the result stack.

#### Example

```javascript
const nos = window.NOS.V1;

const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
const args = ['ef68bcda-2892-491a-a7e6-9c4cb1a11732'];

// If you handle encoding yourself, use:
// nos.testInvoke({ scriptHash, operation, args, encodeArgs: false })
nos
  .testInvoke({ scriptHash, operation, args })
  .then(script => alert(`Test invoke script: ${script} `))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

## `invoke`

---

The `invoke` function executes an invocation transaction on behalf of the currently authenticated
account. It requires the user to grant permission.

#### Parameters

- `config` **object** - The config options to perform this operation.
- `config.scriptHash` **string** - The script hash of the Smart Contract you want to invoke.
- `config.operation` **string** - The operation of the Smart Contract you want to invoke.
- `config.args` **string[]** - An arguments array of the Smart Contract you want to invoke.
- `config.encodeArgs` **boolean** (Optional) - A flag detailing whether or not you want the nOS API to handle encoding or `args`. This is `true` by default.
- `config.assets` **object** (Optional) - A key/value pair representing any asset ID and amount that should be transferred with the invocation. Any assets will be sent to the address representing `config.scriptHash`.

#### Returns

**string** - The invocation transaction ID.

#### Example

```javascript
const nos = window.NOS.V1;

const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
const args = ['ef68bcda-2892-491a-a7e6-9c4cb1a11732'];

// If you handle encoding yourself, use:
// nos.invoke({ scriptHash, operation, args, encodeArgs: false })
nos
  .invoke({ scriptHash, operation, args })
  .then(txid => alert(`Invoke txid: ${txid} `))
  .catch(err => alert(`Error: ${err.message}`));

// Example with assets attached
const { NEO, GAS } = window.NOS.ASSETS;

const assets = {
  [NEO]: '1',
  [GAS]: '3.04950068'
};

nos
  .invoke({ scriptHash, operation, args, assets })
  .then(txid => alert(`Invoke txid: ${txid} `))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

## `getStorage`

---

The `getStorage` function retrieves the value for a specified key from a specified smart contract.
It does not require the user to grant permission.

#### Parameters

- `config` **object** - The config options to perform this operation.
- `config.scriptHash` **string** - The script hash of a deployed Smart Contract.
- `config.key` **string** - The key to retrieve from the Smart Contract.
- `config.encodeInput` **boolean** (Optional) - A flag detailing whether or not to encode the input. This is `true` by default
- `config.decodeOutput` **boolean** (Optional) - A flag detailing whether or not to decode the output. This is `true` by default

#### Returns

**any** - The stored value or `null` if the key did not contain a value.

#### Example

```javascript
const nos = window.NOS.V1;

const scriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
const key = 'post.latest';

// If you want to handle encoding / decoding yourself, use:
// nos.getStorage({ scriptHash, key, encodeInput: false, decodeOutput: false })
nos
  .getStorage({ scriptHash, key })
  .then(data => alert(`Get storage data: ${data} `))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

## `send`

---

The `send` function creates a contract transaction to send assets (NEO or GAS) to a specified
address on behalf of the currently authenticated account. It requires the user to grant permission.

#### Parameters

- `config` **object** - The config options to perform this operation.
- `config.asset` **string** - The asset ID script hash.
- `config.amount` **string** - The amount of the asset to send. **NOTE: It is recommended that strings are used instead of numbers to prevent floating point rounding issues.**
- `config.receiver` **string** - The recipient address of the asset.
- `config.remark` **string** | **string[]** (Optional) - A remark to add to transaction. **NOTE: It's either string or an array of hex strings.**

#### Returns

**string** - The contract transaction ID.

#### Example

```javascript
const nos = window.NOS.V1;
const { GAS } = window.NOS.ASSETS;

const amount = '1';
const receiver = 'AMh8o3uv5PwdryBsiZPd5zoVBDVaredZLG';

nos
  .send({ asset: GAS, amount, receiver })
  .then(txid => alert(`${amount} GAS sent in transaction ${txid}`))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

## `getPublicKey`

---

The `getPublicKey` provides the public key of the currently authenticated account. It does not require the user to grant permission.

#### Parameters

None.

#### Returns

**string** - The public key of the currently signed in user.

#### Example

```javascript
const nos = window.NOS.V1;

nos
  .getPublicKey()
  .then(publicKey => alert(`Public Key: ${publicKey}`))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

## `encrypt`

---

The `encrypt` function allows you to encrypt arbitrary data for another user (you will need his public key, please see `getPublicKey`). It does not require the user to grant permission.

#### Parameters

- `config` **object** - The config options to perform this operation.
- `config.recipientPublicKey` **string** - The public key of the recipient account.
- `config.data` **string | Buffer** - The data to encrypt.

#### Returns

**object** - object containing encrypted data and values needed for decryption (`iv`, `mac`, `data`)

#### Example

```javascript
const nos = window.NOS.V1;

// The recipientPublicKey might be obtained from a shared global session in an application
// for the test data below WIF of the sender account is KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr
const recipientPublicKey = '031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a';
const data = 'some text';

nos
  .encrypt({ recipientPublicKey, data })
  .then(({ iv, mac, data }) => alert(`iv: ${iv}\nmac: ${mac}\ndata: ${data}`))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

## `decrypt`

---

The `decrypt` function allows you to decrypt previously encrypted data for this user (you will need public key of the sender account, please see `getPublicKey`). It does not require the user to grant permission.

#### Parameters

- `config` **object** - The config options to perform this operation.
- `config.senderPublicKey` **string** - The public key of the sender account.
- `config.iv` **string** - The IV received during encryption.
- `config.mac` **string** - The MAC received during encryption.
- `config.data` **string** | **Buffer** - The data to decrypt.

#### Returns

**Buffer** - decrypted data

#### Example

```javascript
const nos = window.NOS.V1;

// The senderPublicKey might be obtained from a shared global session in an application
// for the test data below WIF of the recipient account is KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr
const senderPublicKey = '031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a';
const iv = 'cd26ef7a70b1b3fcf54ef32394008db6';
const mac = '170d03c25d49c7c03c8e1515a316f94fafb52feac73c46196525813883d64596';
const data = '16f55cabb8b9c87a85af3232f30c0a07';

nos
  .decrypt({ senderPublicKey, iv, mac, data })
  .then(data => alert(`Decrypted Data: ${data}`))
  .catch(err => alert(`Error: ${err.message}`));
```

&nbsp;

## Constants

### `ASSETS`

---

There are a set of predefined assets exposed through the API for easy access.
You can retrieve the assets using the following example.

```javascript
const {
  NEO, // contains 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b'
  GAS // contains '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7'
} = window.NOS.ASSETS;
```
