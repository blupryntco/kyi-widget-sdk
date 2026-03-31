import { AssetVerification, CheckStatusOptions, GenerateTokenOptions, KYIStatus } from "./types-Bbuxb5v8.js";

//#region src/token.d.ts
/**
* Generate a JWT access token for the KYI widget
*
* This function should be called on the server-side (Partner Backend).
* The generated token is used to authenticate the widget iframe.
*
* @param options - Token generation options
* @returns Promise resolving to the signed JWT string
*
* @example
* ```typescript
* // Server-side (Node.js)
* import { generateToken } from '@bluprynt/kyi-widget-sdk/server';
*
* const token = await generateToken({
*   issuer: 'your-partner-id',
*   secretKey: process.env.BLUPRYNT_SECRET_KEY,
*   userId: 'user-123',
*   expiresIn: 3600, // 1 hour (optional)
* });
*
* // Return token to client
* res.json({ accessToken: token });
* ```
*/
/**
 * Generate a JWT access token for the KYI widget
 *
 * This function should be called on the server-side (Partner Backend).
 * The generated token is used to authenticate the widget iframe.
 *
 * @param options - Token generation options
 * @returns Promise resolving to the signed JWT string
 *
 * @example
 * ```typescript
 * // Server-side (Node.js)
 * import { generateToken } from '@bluprynt/kyi-widget-sdk/server';
 *
 * const token = await generateToken({
 *   issuer: 'your-partner-id',
 *   secretKey: process.env.BLUPRYNT_SECRET_KEY,
 *   userId: 'user-123',
 *   expiresIn: 3600, // 1 hour (optional)
 * });
 *
 * // Return token to client
 * res.json({ accessToken: token });
 * ```
 */
declare function generateToken(options: GenerateTokenOptions): Promise<string>;

//#endregion
//#region src/status.d.ts
//# sourceMappingURL=token.d.ts.map
/**
 * Check the KYI status for a user
 *
 * This function should be called on the server-side (Partner Backend).
 * It queries the Bluprynt Partner API to get the current KYI status.
 *
 * @param options - Status check options
 * @returns Promise resolving to the KYI status
 *
 * @example
 * ```typescript
 * // Server-side (Node.js)
 * import { checkStatus } from '@bluprynt/kyi-widget-sdk/server';
 *
 * const status = await checkStatus({
 *   issuer: 'your-partner-id',
 *   secretKey: process.env.BLUPRYNT_SECRET_KEY,
 *   userId: 'user-123',
 * });
 *
 * if (status.status === 'completed') {
 *   console.log('User has completed KYI verification');
 * }
 * ```
 */
declare function checkStatus(options: CheckStatusOptions): Promise<KYIStatus>;

//#endregion
//# sourceMappingURL=status.d.ts.map

export { AssetVerification, CheckStatusOptions, GenerateTokenOptions, KYIStatus, checkStatus, generateToken };
//# sourceMappingURL=server.d.ts.map