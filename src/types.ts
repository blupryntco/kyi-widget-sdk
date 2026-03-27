/**
 * Widget display modes
 */
export type KYIMode = 'inline' | 'modal' | 'drawer'

/**
 * Widget scope - determines which page to display
 */
export type KYIScope = 'kyi' | 'asset-list' | 'wallet-list'

/**
 * Configuration options for the KYI widget
 */
export interface KYIOptions {
  /**
   * Parent element to render the widget into (only used for inline mode)
   * If not provided for inline mode, appends to document.body
   */
  parentElement?: HTMLElement

  /**
   * Called when the KYI flow is completed successfully
   */
  onComplete?: () => void

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
   * The internal user ID (partner's own user identifier)
   */
  userId: string

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
   * The internal user ID to check status for
   */
  userId: string
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
