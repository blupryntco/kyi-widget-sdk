---
"@bluprynt/kyi-widget-sdk": patch
---

The access token is no longer put in the widget iframe's URL. The SDK sends it to the widget with `postMessage`, only to the Bluprynt app origin, when the widget reports it is ready. This keeps the token out of server logs and `iframe.src`.
