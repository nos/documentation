---
id: implementation-example
title: Implementation example
sidebar_label:  Implementation example
---


## Vanilla Javascript
---

This is an example of a service layer in your frontend application which implements all
functionalities of nOS in vanilla Javascript.

```javascript
const nos = window.NOS.V1;
const { NEO, GAS } = window.NOS.ASSETS;

const RPX = 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9';

const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
const args = ['ef68bcda-2892-491a-a7e6-9c4cb1a11732'];

nos.getAddress()
  .then((address) => alert(`Address: ${address}`))
  .catch((err) => alert(`Error: ${err.message}`));


nos.getBalance({ asset: NEO })
  .then((balance) => alert(`Balance: ${balance}`))
  .catch((err) => alert(`Error: ${err.message}`));


nos.getBalance({ asset: NEO, address: 'AZPkgTJixxkSFPyBZrcVpLj9nsHsPDUVkF' })
  .then((balance) => alert(`Balance: ${balance}`))
  .catch((err) => alert(`Error: ${err.message}`));


nos.invoke({ scriptHash, operation, args })
  .then((txid) => alert(`Invoke txid: ${txid} `))
  .catch((err) => alert(`Error: ${err.message}`));


nos.testInvoke({ scriptHash, operation, args })
  .then((script) => alert(`Test invoke script: ${script} `))
  .catch((err) => alert(`Error: ${err.message}`));


const scriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
const key = 'post.latest';
nos.getStorage({ scriptHash, key })
  .then((data) => alert(`Get storage data: ${data} `))
  .catch((err) => alert(`Error: ${err.message}`));


const asset = GAS;
const amount = '1';
const receiver = 'AMh8o3uv5PwdryBsiZPd5zoVBDVaredZLG';
nos.send({ asset, amount, receiver })
  .then((txId) => alert(`${amount} ${asset} sent: ${txId} `))
  .catch((err) => alert(`Error: ${err.message}`));


nos.claimGas()
  .then((txId) => alert(`Gas claimed ${txId}`))
  .catch((err) => alert(`Error: ${err.message}`));
```

---