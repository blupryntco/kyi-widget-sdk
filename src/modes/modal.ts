import { CSS_PREFIX } from '../constants'
import { createIframe, setupMessageListener } from '../iframe'
import { createCloseButton, injectStyles } from '../styles'
import type { KYIOptions, KYIScope, KYIWidget } from '../types'

/**
 * Render the KYI widget in modal mode
 */
export function renderModal(
  scope: KYIScope,
  accessToken: string,
  options: KYIOptions = {}
): KYIWidget {
  injectStyles()

  // Create overlay
  const overlay = document.createElement('div')
  overlay.className = `${CSS_PREFIX}-overlay`

  // Create modal container
  const modal = document.createElement('div')
  modal.className = `${CSS_PREFIX}-modal`
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-modal', 'true')
  modal.setAttribute('aria-label', 'Bluprynt KYI Widget')

  // Create iframe
  const iframe = createIframe(scope, accessToken)

  // Close function
  const close = () => {
    overlay.classList.remove(`${CSS_PREFIX}-visible`)
    modal.classList.remove(`${CSS_PREFIX}-visible`)

    // Wait for animation to complete before removing
    setTimeout(() => {
      removeListener()
      removeKeyListener()
      overlay.remove()
      modal.remove()
    }, 200)

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

  // Prevent modal click from closing
  modal.addEventListener('click', (e) => e.stopPropagation())

  // Set up message listener
  const removeListener = setupMessageListener(iframe, options, close)

  // Assemble modal
  modal.appendChild(header)
  modal.appendChild(iframe)

  // Append to body
  document.body.appendChild(overlay)
  document.body.appendChild(modal)

  // Trigger animation on next frame
  requestAnimationFrame(() => {
    overlay.classList.add(`${CSS_PREFIX}-visible`)
    modal.classList.add(`${CSS_PREFIX}-visible`)
  })

  // Trap focus in modal
  modal.focus()

  return {
    iframe,
    destroy: () => {
      removeListener()
      removeKeyListener()
      overlay.remove()
      modal.remove()
    },
  }
}
