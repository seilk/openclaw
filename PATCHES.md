# OpenClaw Local Patches

This file records local patches applied directly to bundled OpenClaw files.
These patches may be overwritten by updates or reinstallations.

## 2026-02-06 - Telegram empty message guard

### Reason
Telegram rejects empty message text. A standalone Markdown horizontal rule ("---" or "***")
can become an empty HTML chunk and gets sent without a guard, causing:
`400: Bad Request: message text is empty`.

### Patched Version
- openclaw: 2026.2.3-1

### Files Patched
- /opt/homebrew/lib/node_modules/openclaw/dist/loader-BAZoAqqR.js
- /opt/homebrew/lib/node_modules/openclaw/dist/reply-DpTyb3Hh.js
- /opt/homebrew/lib/node_modules/openclaw/dist/extensionAPI.js
- /opt/homebrew/lib/node_modules/openclaw/dist/plugin-sdk/index.js

### Changes
1. Skip empty HTML chunks before sending (deliverReplies)
   - Added guard: `if (!chunk.html?.trim()) continue;`
2. Add empty-text safety in sendTelegramText
   - If rendered HTML is empty, fall back to `plainText` when available
   - Otherwise return without calling `sendMessage`

### Restore / Update Notes
- Any OpenClaw upgrade or reinstall will overwrite these changes.
- After upgrading, re-apply these guards or verify upstream fix.
- To restore defaults, reinstall OpenClaw: `npm i -g openclaw`.
