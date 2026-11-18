import { SignJWT } from 'jose'
import type { GenerateTokenOptions } from './types'

const MAX_EXPIRES_IN = 3600
const TOKEN_AUDIENCE = 'bluprynt-widget'

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
 *   issuerId: 'org-123',
 *   expiresIn: 3600, // 1 hour (optional)
 * });
 *
 * // Return token to client
 * res.json({ accessToken: token });
 * ```
 */
export async function generateToken(options: GenerateTokenOptions): Promise<string> {
  const { issuer, secretKey, expiresIn = MAX_EXPIRES_IN } = options
  const issuerId = options.issuerId ?? options.userId

  if (!issuer) {
    throw new Error('Issuer is required')
  }
  if (!secretKey) {
    throw new Error('Secret key is required')
  }
  if (!issuerId) {
    throw new Error('Issuer ID is required')
  }
  const lifetime = Math.min(Math.floor(expiresIn), MAX_EXPIRES_IN)
  if (!(lifetime >= 1)) {
    throw new Error('expiresIn must be at least 1 second')
  }
  const now = Math.floor(Date.now() / 1000)

  const secret = new TextEncoder().encode(secretKey)

  const token = await new SignJWT({ sub: issuerId, issuer_id: issuerId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(issuer)
    .setAudience(TOKEN_AUDIENCE)
    .setIssuedAt(now)
    .setExpirationTime(now + lifetime)
    .sign(secret)

  return token
}
