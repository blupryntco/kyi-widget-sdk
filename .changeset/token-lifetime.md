---
"@bluprynt/kyi-widget-sdk": patch
---

`generateToken` now caps `expiresIn` at one hour (the existing default), rejects values that are not positive integers, and adds an `aud: "bluprynt-widget"` claim to the token.
