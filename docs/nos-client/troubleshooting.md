# Troubleshooting

Although nOS installation process is very easy and smooth in most
of the cases, errors still may occur for some less popular configuratios.
This page aims to provide some guidance in case then you have
encountered an error, which is beyond our control.

## `yarn install` fails

**Case**: installing dependencies via `yarn install` fails to install prebuilt binaries,
          resulting in the following error message:

```
error An unexpected error occurred: "/Users/nikitin/Development/nos-client/node_modules/node-hid: Command failed.

Exit code: 127
Command: sh
Arguments: -c prebuild-install || node-gyp rebuild
Directory: /Users/nikitin/Development/nos-client/node_modules/node-hid
Output:
prebuild-install WARN install No prebuilt binaries found (target=10.6.0 runtime=node arch=x64 platform=darwin)
```

_Solution:_ `yarn global add node-gyp`.

_Explanation:_ Some node.js modules does not have pre-compiled binaries for your version of OS/node.js. To build them you need to have node-gyp installed in the global scope.
