import { CSS_PREFIX } from '../constants'
import { createIframe, setupMessageListener } from '../iframe'
import { createCloseButton, injectStyles } from '../styles'
import type { KYIOptions, KYIScope, KYIWidget } from '../types'

/**
 * Render the KYI widget in drawer mode
 */
export function renderDrawer(
  scope: KYIScope,
  accessToken: string,
  options: KYIOptions = {}
): KYIWidget {
  injectStyles()

  // Create overlay
  const overlay = document.createElement('div')
  overlay.className = `${CSS_PREFIX}-overlay`

  // Create drawer container
  const drawer = document.createElement('div')
  drawer.className = `${CSS_PREFIX}-drawer`
  drawer.setAttribute('role', 'dialog')
  drawer.setAttribute('aria-modal', 'true')
  drawer.setAttribute('aria-label', 'Bluprynt KYI Widget')

  // Create iframe
  const iframe = createIframe(scope, accessToken)

  // Close function
  const close = () => {
    overlay.classList.remove(`${CSS_PREFIX}-visible`)
    drawer.classList.remove(`${CSS_PREFIX}-visible`)

    // Wait for animation to complete before removing
    setTimeout(() => {
      removeListener()
      removeKeyListener()
      overlay.remove()
      drawer.remove()
    }, 300)

    options.onClose?.()
  }

  // Create header with close button
  const header = document.createElement('div')
  header.className = `${CSS_PREFIX}-header`
  const closeButton = createCloseButton(close)
  header.appendChild(closeButton)

  // Handle escape key
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close()
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  const removeKeyListener = () => document.removeEventListener('keydown', handleKeyDown)

  // Close on overlay click
  overlay.addEventListener('click', close)

  // Prevent drawer click from closing
  drawer.addEventListener('click', (e) => e.stopPropagation())

  // Set up message listener
  const removeListener = setupMessageListener(iframe, options, close)

  // Assemble drawer
  drawer.appendChild(header)
  drawer.appendChild(iframe)

  // Append to body
  document.body.appendChild(overlay)
  document.body.appendChild(drawer)

  // Trigger animation on next frame
  requestAnimationFrame(() => {
    overlay.classList.add(`${CSS_PREFIX}-visible`)
    drawer.classList.add(`${CSS_PREFIX}-visible`)
  })

  return {
    iframe,
    destroy: () => {
      removeListener()
      removeKeyListener()
      overlay.remove()
      drawer.remove()
    },
  }
}
