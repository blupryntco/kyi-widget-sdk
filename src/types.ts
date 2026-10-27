/**
 * Widget display modes
 */
export type KYIMode = 'modal' | 'drawer'

/**
 * Widget scope - determines which page to display
 */
export type KYIScope = 'kyi' | 'asset-list' | 'wallet-list'

/**
 * The asset to open the widget for. Used to prefill and focus the flow, not as proof of ownership.
 */
export interface KYIAsset {
  /**
   * Display name of the asset
   */
  name?: string

  /**
   * Deployment address of the asset
   */
  address?: string

  /**
   * CAIP-10 account ID of the deployment, e.g. `eip155:1:0x…`
   */
  accountId?: string
}

/**
 * Configuration options for the KYI widget
 */
export interface KYIOptions {
  /**
   * The asset to open the widget for
   */
  asset?: KYIAsset

  /**
   * Called when the widget is closed (modal/drawer only)
   */
  onClose?: () => void

  /**
   * Called when an error occurs
   */
  onError?: (error: Error) => void

  /**
   * Called when the widget is ready and loaded
   */
  onReady?: () => void
}

/**
 * Widget instance returned by the kyi() function
 */
export interface KYIWidget {
  /**
   * Remove the widget from the DOM and clean up resources
   */
  destroy: () => void

  /**
   * Reference to the iframe element
   */
  iframe: HTMLIFrameElement
}

/**
 * Options for generating an access token
 */
export interface GenerateTokenOptions {
  /**
   * The issuer identifier (partner identifier)
   */
  issuer: string

  /**
   * The secret key provided by Bluprynt
   */
  secretKey: string

  /**
   * Your internal ID for the issuer. An issuer is whatever your platform treats it as:
   * an organization (shared by all of its users) or a single user.
   */
  issuerId?: string

  /**
   * @deprecated Use `issuerId` instead.
   */
  userId?: string

  /**
   * Token expiration time in seconds (default: 3600 = 1 hour)
   */
  expiresIn?: number
}

/**
 * Options for checking KYI status
 */
export interface CheckStatusOptions {
  /**
   * The secret key provided by Bluprynt
   */
  secretKey: string

  /**
   * Your internal ID for the issuer to check status for
   */
  issuerId?: string

  /**
   * @deprecated Use `issuerId` instead.
   */
  userId?: string
}

/**
 * Asset verification status
 */
export interface AssetVerification {
  /**
   * Asset identifier
   */
  assetId: string

  /**
   * Asset type (e.g., "wallet", "document")
   */
  type: string

  /**
   * Verification status
   */
  status: 'pending' | 'verified' | 'rejected'

  /**
   * Verification timestamp
   */
  verifiedAt?: string
}

/**
 * KYI status response
 */
export interface KYIStatus {
  /**
   * User ID
   */
  userId: string

  /**
   * Overall KYI status
   */
  status: 'not_started' | 'in_progress' | 'completed' | 'rejected'

  /**
   * List of verified assets
   */
  assets: AssetVerification[]

  /**
   * Last updated timestamp
   */
  updatedAt: string
}

/**
 * Internal message types for iframe communication
 */
export type KYIMessageType = 'kyi:ready' | 'kyi:complete' | 'kyi:error' | 'kyi:close'

/**
 * Message payload from iframe
 */
export interface KYIMessage {
  type: KYIMessageType
  payload?: unknown
}
