---
id: getting-started
title: Getting started
sidebar_label: Getting started
---


nOS provides a mechanism for registering a dapp at a `.neo` "domain" (e.g.: `nos.neo`), which can
then be viewed through the nOS client.  By registering a domain with the nOS Smart Contract, you can
build a simple web app that can interact with a set of simple API functions exposed by the nOS
client.  These API functions provide a simple mechanism for performing actions on behalf of the
account if the user chooses to provide access.

---


&nbsp;


## Features
---
More features are coming to the nOS API in the near future. The nOS team plans to work closely with
dApp developers to ensure that any interactions that will ease development are exposed through the
API.


## Current Features
---
### Client API
When browsing with the nOS Client, the client exposes a set a functions to interact with the NEO Blockchain.

### `nos://` protocol
If your dApp links to a target with the `nos://` protocol, the nOS client will treat it as a dApp
request.  This can open another dApp, or it can open another page related to the current dApp.
More details forthcoming.

&nbsp;

## Upcoming features
---
### Block height
The nOS API will expose a function for fetching the current block height.


### Events
To prevent constant polling for NEO blockchain data, some event-based functionality will be added to
the nOS client, which dApps can subscribe to.  For example, when a new block is added to the chain,
or a new transaction for the current account is created, your dApp should be notified.  More details
forthcoming.

&nbsp;
