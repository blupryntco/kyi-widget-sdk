/**
 * Base URL for Bluprynt application
 */
export const BLUPRYNT_BASE_URL = 'https://app.bluprynt.com'

/**
 * Base URL for Bluprynt Partner API
 */
export const BLUPRYNT_API_URL = 'https://api.bluprynt.com/partner'

/**
 * Scope to URL path mapping
 */
export const SCOPE_PATHS: Record<string, string> = {
  kyi: '/widget/kyi',
  'asset-list': '/widget/assets',
  'wallet-list': '/widget/wallets',
} as const

/**
 * CSS class prefix for widget elements
 */
export const CSS_PREFIX = 'bluprynt-kyi'

/**
 * Z-index for modal/drawer overlays
 */
export const OVERLAY_Z_INDEX = 999999
