---
"@bluprynt/kyi-widget-sdk": minor
---

Add `issuerId` to `generateToken` and `checkStatus`. An issuer can be an organization (shared across its users) or a single user. `userId` is deprecated but still accepted. Tokens now carry an `issuer_id` claim alongside `sub`.
