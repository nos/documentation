---
id: future
title: Future
sidebar_label: Future
---


More features are coming to the nOS API in the near future. The nOS team plans to work closely with
dApp developers to ensure that any interactions that will ease development are exposed through the
API.


## Block height
---
The nOS API will expose a function for fetching the current block height.

&nbsp;

## Events
---
To prevent constant polling for NEO blockchain data, some event-based functionality will be added to
the nOS client, which dApps can subscribe to.  For example, when a new block is added to the chain,
or a new transaction for the current account is created, your dApp should be notified.  More details
forthcoming.

&nbsp;

## `nos:` protocol
---
If your dApp links to a target with an `nos:` protocol, the nOS client will treat it as a dApp
request.  This can open another dApp, or it can open another page related to the current dApp.
More details forthcoming.


---