# @tenkeylabs/wagmi-magic-connector

## 0.0.9

### Patch Changes

- c3c6972: bumps wagmi/core to 0.10.9

## 0.0.8

### Patch Changes

- 2013ad9: outputs esm instead of commonjs

## 0.0.7

### Patch Changes

- e3d867c: Cache the ethers provider and signer used by the magic connector.

## 0.10.0

### Minor Changes

- 82a5174: Throws `api key not provided` error instead of `user rejected request` error

## 0.9.1

### Patch Changes

- 5a555d8: Adds post processing on build output for adding .js ext for ESM resolution

## 0.9.0

### Minor Changes

- adb6e07: Changes @everipedia/wagmi-magic-connector to a pure ESM Module package.

  Requires Node 12.20.0 or higher. it fixes resolution issues of latest wagmi and magic packages and should work well out of the box with Nextjs and other react frameworks without the need for any extra configuration.

## 0.8.0

### Minor Changes

- a5d6191: Updates packages to use latest magic sdk and wagmi core

## 0.7.1

### Patch Changes

- b19d703: - `magic.user.disconnect()` is no available for Magic Connect, relying on local storage instead
  - Require email input for `connect()` flow to continue once modal is open. Otherwise the Magic Connect
    modals appears even if the user quits the process manually.

## 0.7.0

### Minor Changes

- 38dd8cc: ### Major

  - Creation of two classes `MagicAuthConnector` & `MagicConnectConnector`
    - `MagicAuthConnector`: Connector integrating with [Magic Auth](https://magic.link/docs/auth/overview). Most of the code comes from previous implementation
    - `MagicConnectConnector`: Connector integrating with [Magic Connect](https://magic.link/docs/connect/overview).
  - Made `MagicConnector` an abstract class containing shared logic between `MagicAuthConnector` & `MagicConnectConnector`
  - Renamed `options.additionalMagicOptions` to `options.magicSdkConfiguration`, which seemed to be a clearer name
  - Renamed `enableSMSlogin` to `enableSMSLogin`
  - Updated documentation in README to fit changes

  ### Minor

  - Fixed some typos in the README
  - Fixed Rainbow Kit example in the README and specified that `options.magicSdkConfiguration.network.chainId` needs to be specified. This comes from the fact that in their most recent version Rainbow Kit makes a `getChainId()` call on the connector before calling the `connect()` method.
  - Fixed typo in enableSMSlogin -> enableSMSLogin

## 0.6.5

### Patch Changes

- d5c95eb: updates email regex to take +

## 0.6.4

### Patch Changes

- d49c203: updated dependancies to latest versions

## 0.6.3

### Patch Changes

- 4288ba5: Prevent changing chainId type from number to string

## 0.6.2

### Patch Changes

- 127b67e: added implementation for getChainId

## 0.6.1

### Patch Changes

- 85cc525: Fix Custom header images not working

## 0.6.0

### Minor Changes

- 1001fbf: - Made dark mode styles overridable by converting darkmode styles to pure css
  - Fixed OAuth provider buttons not following the order they are passed in
  - Redesigned Modal look and feel
  - Changed Github and Default header icons

## 0.5.0

### Minor Changes

- 075cf2b: Made Email Authentication Optional. To remove the email authentication requirement, you can set `enableEmailLogin` to `false` in connector configuration's options object.

## 0.4.1

### Patch Changes

- 7ab9877: fixes animations not working while opening and closing modal
