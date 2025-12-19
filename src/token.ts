import { SignJWT } from 'jose'
import type { GenerateTokenOptions } from './types'

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
export async function generateToken(options: GenerateTokenOptions): Promise<string> {
  const { issuer, secretKey, userId, expiresIn = 3600 } = options

  if (!issuer) {
    throw new Error('Issuer is required')
  }
  if (!secretKey) {
    throw new Error('Secret key is required')
  }
  if (!userId) {
    throw new Error('User ID is required')
  }

  const secret = new TextEncoder().encode(secretKey)

  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(issuer)
    .setIssuedAt()
    .setExpirationTime(`${expiresIn}s`)
    .sign(secret)

  return token
}
