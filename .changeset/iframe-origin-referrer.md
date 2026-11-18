---
"@bluprynt/kyi-widget-sdk": patch
---

Only accept widget messages from the exact Bluprynt app origin, and set `referrerpolicy="no-referrer"` on the widget iframe so the partner page's URL is never sent to the widget.
