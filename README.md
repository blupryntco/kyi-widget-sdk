# Bluprynt KYI Widget SDK

[![SOC 2 Type 1](https://img.shields.io/badge/SOC%202-Type%201-blue)](https://bluprynt.com)
[![npm version](https://img.shields.io/npm/v/@bluprynt/kyi-widget-sdk)](https://www.npmjs.com/package/@bluprynt/kyi-widget-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Embed Bluprynt's KYI (Know Your Issuer) verification widget into your web application.

## Installation

```bash
npm install @bluprynt/kyi-widget-sdk
```

```bash
yarn add @bluprynt/kyi-widget-sdk
```

```bash
pnpm add @bluprynt/kyi-widget-sdk
```

## How KYI Widget SDK works

1. Ask Bluprynt for `SECRET_KEY` as part of partner integration, and send the list of origins where you'll embed the widget (including staging and local development) so they can be allowlisted.
1. Implement Access Token JWT generation on your backend side.
1. Use KYI Widget SDK with generated Access Token on behalf of your user.

Full documentation: [overview](https://blupryntco.github.io/kyi-widget-sdk), [integration guide](https://blupryntco.github.io/kyi-widget-sdk/integration.html), [API reference](https://blupryntco.github.io/kyi-widget-sdk/api.html) and [playground](https://blupryntco.github.io/kyi-widget-sdk/playground.html).

## Quick Start

### 1. Generate Access Token (Server-side)

If you use Node.js on backend, feel free to use this package to generate the token:

```typescript
// server.ts (Node.js)
import { generateToken } from "@bluprynt/kyi-widget-sdk/server";

const accessToken = await generateToken({
  issuer: "your-partner-id",
  secretKey: process.env.BLUPRYNT_SECRET_KEY!,
  userId: "user-123", // Your internal user identifier
  expiresIn: 3600, // Optional: token expiry in seconds (default: 1 hour)
});

// Return token to your frontend
res.json({ accessToken });
```

It is okay to use other platforms rather than Node.js, but you will need generate JWT by yourself and sign it with `SECRET_KEY` that you get from Bluprynt. Keep in mind the token's payload must have to following structure:

```json
{
  "sub": "user-123",
  "iss": "your-partner-id",
  "iat": 1766146154,
  "exp": 1766149754
}
```

### 2. Embed Widget (Client-side)

Use the access token to embed the KYI widget:

```typescript
// client.ts (Browser)
import { kyi } from "@bluprynt/kyi-widget-sdk";

// Fetch token from your backend
const { accessToken } = await fetch("/api/kyi-token").then((r) => r.json());

// Embed the widget
const widget = kyi("modal", "kyi", accessToken, {
  onClose: () => {
    console.log("Widget closed");
  },
  onError: (error) => {
    console.error("Error:", error);
  },
});

// Later: clean up when done
widget.destroy();
```

## Widget Modes

### Modal Mode

Displays the widget in a centered modal overlay:

```typescript
const widget = kyi("modal", "kyi", accessToken, {
  onClose: () => console.log("Modal closed"),
});
```

### Drawer Mode

Displays the widget in a slide-in panel from the right:

```typescript
const widget = kyi("drawer", "kyi", accessToken, {
  onClose: () => console.log("Drawer closed"),
});
```

## Widget Scopes

The `scope` parameter determines which page to display:

| Scope                  | Description                     |
| ---------------------- | ------------------------------- |
| `kyi`                  | New KYI application flow        |
| `asset-list`           | View list of verified assets    |
| `wallet-list`          | View list of connected wallets  |

```typescript
// Start a new KYI application
kyi("modal", "kyi", accessToken);

// View assets
kyi("modal", "asset-list", accessToken);

// View wallets
kyi("drawer", "wallet-list", accessToken);
```

## Checking KYI Status (Server-side)

Query the current KYI status for a user from your backend:

```typescript
import { checkStatus } from "@bluprynt/kyi-widget-sdk/server";

const status = await checkStatus({
  issuer: "your-partner-id",
  secretKey: process.env.BLUPRYNT_SECRET_KEY!,
  userId: "user-123",
});

console.log(status);
```

## API Reference

### `kyi(mode, scope, accessToken, options?)`

Creates a KYI widget instance.

**Parameters:**

| Parameter     | Type                               | Description                           |
| ------------- | ---------------------------------- | ------------------------------------- |
| `mode`        | `'modal' \| 'drawer'`              | Widget display mode                   |
| `scope`       | `'kyi' \| 'asset-list' \| 'wallet-list'` | Widget scope       |
| `accessToken` | `string`                           | JWT access token from `generateToken` |
| `options`     | `KYIOptions`                       | Optional configuration                |

**Options:**

| Option          | Type                     | Description                            |
| --------------- | ------------------------ | -------------------------------------- |
| `onClose`       | `() => void`             | Called when widget is closed           |
| `onError`       | `(error: Error) => void` | Called when an error occurs            |
| `onReady`       | `() => void`             | Called when widget is loaded and ready |

**Returns:** `KYIWidget`

| Property  | Type                  | Description                      |
| --------- | --------------------- | -------------------------------- |
| `iframe`  | `HTMLIFrameElement`   | Reference to the iframe element  |
| `destroy` | `() => void`          | Remove widget and clean up       |

### `generateToken(options)` (Server-side)

Generates a JWT access token for widget authentication.

**Parameters:**

| Option      | Type     | Description                                |
| ----------- | -------- | ------------------------------------------ |
| `issuer`    | `string` | Your partner identifier                    |
| `secretKey` | `string` | Your Bluprynt secret key                   |
| `userId`    | `string` | Your internal user identifier              |
| `expiresIn` | `number` | Token expiry in seconds (default: `3600`)  |

**Returns:** `Promise<string>` - The signed JWT token

### `checkStatus(options)` (Server-side)

Checks the KYI verification status for a user.

**Parameters:**

| Option      | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `issuer`    | `string` | Your partner identifier         |
| `secretKey` | `string` | Your Bluprynt secret key        |
| `userId`    | `string` | Your internal user identifier   |

**Returns:** `Promise<KYIStatus>`

## Framework Examples

### React

```tsx
import { useEffect, useRef } from "react";
import { kyi, type KYIWidget } from "@bluprynt/kyi-widget-sdk";

function KYIButton({ accessToken }: { accessToken: string }) {
  const widgetRef = useRef<KYIWidget | null>(null);

  const openWidget = () => {
    widgetRef.current = kyi("modal", "kyi", accessToken);
  };

  useEffect(() => {
    return () => widgetRef.current?.destroy();
  }, []);

  return <button onClick={openWidget}>Start KYI</button>;
}
```

## Security

- **Never expose your `SECRET_KEY` on the client-side.** Token generation must happen on your backend.
- Access tokens are short-lived JWTs. Generate a fresh token for each widget session.
- The widget uses `postMessage` for secure iframe communication.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

Built with care by [Bluprynt](https://bluprynt.com)
