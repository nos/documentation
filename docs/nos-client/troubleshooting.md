---
id: troubleshooting
title: Troubleshooting
sidebar_label:  Troubleshooting
---


## Installation
---
Although nOS installation process is very easy and smooth in most
of the cases, errors still may occur for some less popular configurations.
This page aims to provide some guidance in case when you have
encountered an error, which is beyond our control.

## `yarn install` fails

**Case**: installing dependencies via `yarn install` fails to install prebuilt binaries,
          resulting in the following error message:

```
error An unexpected error occurred: "<path>/nos-client/node_modules/node-hid: Command failed.

Exit code: 127
Command: sh
Arguments: -c prebuild-install || node-gyp rebuild
Directory: <path>/nos-client/node_modules/node-hid
Output:
prebuild-install WARN install No prebuilt binaries found (target=10.6.0 runtime=node arch=x64 platform=darwin)
```

_Solution:_ 
```bash
yarn global add node-gyp
sudo apt-get install libudev-dev
sudo apt-get install libusb-1.0-0-dev
```

_Explanation:_ Some node.js modules do not have pre-compiled binaries for your version of OS/node.js. To build them you need to have node-gyp installed in the global scope aswell as having libudev-dev and libusb installed (which are used by node-gyp).

---
