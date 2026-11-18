---
"@bluprynt/kyi-widget-sdk": patch
---

`generateToken` now caps `expiresIn` at one hour (the existing default), rounds it down to whole seconds, throws if it is under 1 second, and adds an `aud: "bluprynt-widget"` claim to the token.
