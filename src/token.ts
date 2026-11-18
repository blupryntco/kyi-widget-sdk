import { SignJWT } from 'jose'
import type { GenerateTokenOptions } from './types'

export const MAX_EXPIRES_IN = 3600
export const TOKEN_AUDIENCE = 'bluprynt-widget'

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
  if (!Number.isInteger(expiresIn) || expiresIn <= 0) {
    throw new Error('expiresIn must be a positive integer number of seconds')
  }

  const secret = new TextEncoder().encode(secretKey)

  const token = await new SignJWT({ sub: issuerId, issuer_id: issuerId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(issuer)
    .setAudience(TOKEN_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${Math.min(expiresIn, MAX_EXPIRES_IN)}s`)
    .sign(secret)

  return token
}
