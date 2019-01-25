---
id: installation-usage
title: Getting started with nOS Local
sidebar_label: Installation and usage
---

nOS Local: An environment for nOS development.

[`nos-local`](https://github.com/nos/nos-local) will quickly get a local NEO blockchain running on your
system in a docker container, and the nOS Smart Contract registered within it. This can then be
used to load dApps under the `.neo` domain rather than running against `localhost`.


## Prerequisites
---
- Docker:
    - [Docker for Windows](https://docs.docker.com/docker-for-windows/install/#what-to-know-before-you-install)
    - [Docker for MacOSX](https://docs.docker.com/docker-for-mac/install/)

&nbsp;

## Installation
---
For now, manually start the `neo-local` environment and load contracts:
```sh
$ git clone https://github.com/nos/nos-local.git
$ cd nos-local
```

#### Usage - MacOSX
Execute nos-local using:
```sh
$ make run
```

#### Usage - Windows
Make sure your Docker is using Linux containers (right click on tray icon)
After that, execute nos-local using:
```sh
$ makeWIN
```

&nbsp;

## General usage (Both Mac and Windows)
---
If you exit the neo-python prompt, access it again with Docker:
```
$ sudo docker exec -it neo-python /bin/sh -c /bin/bash
// Private/Local net - for local development and testing
$ np-prompt -p -v
// nOSNet Testnet - for "pre-production" testing
$ np-prompt -p testnet.nos.io -v
 ```

Once you're at the `neo-python` prompt (wallet password is "coz"):

```
open wallet ./neo-privnet.wallet
build /smart-contracts/contract.py
import contract /smart-contracts/contract.avm 0710 05 True False
```

Fill out the prompts for the contract meta data. Just hit `[enter]` if you're in a hurry 😉.

Wait a 🔥 minute and the nOS name service contract is deployed!

&nbsp;

### Register a domain with nOS
---
Let's register an example domain name with nOS.
This is only possible using the private local net - not with the nOS Testnet

```
testinvoke <Smart_Contract_Hash> RegisterDomain ['AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y', 'bucket.neo', 'https://ihasabucket.com/', 'AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y']
```

Wait for the TX to clear, and test your domain is registered:

```
testinvoke <Smart_Contract_Hash> GetDomain ['AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y', 'bucket.neo']
```

Visit `nos://bucket.neo` in the client!

---