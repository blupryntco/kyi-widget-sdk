---
"@bluprynt/kyi-widget-sdk": patch
---

Only accept widget messages from the exact Bluprynt app origin, and set `referrerpolicy="strict-origin-when-cross-origin"` on the widget iframe so the partner page's full URL is never sent as the referrer.
