import { CSS_PREFIX } from '../constants'
import { createIframe, setupMessageListener } from '../iframe'
import type { KYIOptions, KYIScope, KYIWidget } from '../types'

/**
 * Render the KYI widget in inline mode
 */
export function renderInline(
  scope: KYIScope,
  accessToken: string,
  options: KYIOptions = {}
): KYIWidget {
  const parent = options.parentElement ?? document.body

  // Create container
  const container = document.createElement('div')
  container.className = `${CSS_PREFIX}-inline`

  // Create iframe
  const iframe = createIframe(scope, accessToken)
  container.appendChild(iframe)

  // Set up message listener
  const removeListener = setupMessageListener(iframe, options)

  // Append to parent
  parent.appendChild(container)

  return {
    iframe,
    destroy: () => {
      removeListener()
      container.remove()
    },
  }
}
