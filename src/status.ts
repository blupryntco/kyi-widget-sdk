import { BLUPRYNT_API_URL } from './constants'
import type { CheckStatusOptions, KYIStatus } from './types'

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
export async function checkStatus(options: CheckStatusOptions): Promise<KYIStatus> {
  const { secretKey, userId } = options

  if (!secretKey) {
    throw new Error('Secret key is required')
  }
  if (!userId) {
    throw new Error('User ID is required')
  }

  const response = await fetch(`${BLUPRYNT_API_URL}/kyi-status`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to check KYI status: ${response.status} ${errorText}`)
  }

  return response.json() as Promise<KYIStatus>
}
