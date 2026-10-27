# @bluprynt/kyi-widget-sdk

## 0.2.0

### Minor Changes

- bf64c87: Add `issuerId` to `generateToken` and `checkStatus`. An issuer can be an organization (shared across its users) or a single user. `userId` is deprecated but still accepted. Tokens now carry an `issuer_id` claim alongside `sub`.

## 0.1.1

### Patch Changes

- d6c8d2b: fix: remove inline mode

## 0.1.0

### Minor Changes

- a289d75: fix: close button overflow for modal and drawer

## 0.0.4

### Patch Changes

- 8c753a9: remove onComplete callback

## 0.0.3

### Patch Changes

- 1a7191c: remove wallet-verification scope

## 0.0.2

### Patch Changes

- c609abe: update scope paths

## 0.0.1

### Patch Changes

- 30ece7f: Increase drawer width
