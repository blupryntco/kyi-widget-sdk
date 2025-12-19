import { BLUPRYNT_BASE_URL, CSS_PREFIX, SCOPE_PATHS } from './constants'
import type { KYIMessage, KYIOptions, KYIScope } from './types'

/**
 * Build the iframe URL for the given scope and access token
 */
export function buildIframeUrl(scope: KYIScope, accessToken: string): string {
  const path = SCOPE_PATHS[scope]
  if (!path) {
    throw new Error(`Invalid scope: ${scope}`)
  }

  const url = new URL(path, BLUPRYNT_BASE_URL)
  url.searchParams.set('token', accessToken)
  url.searchParams.set('embed', 'true')

  return url.toString()
}

/**
 * Create an iframe element
 */
export function createIframe(scope: KYIScope, accessToken: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe')
  iframe.className = `${CSS_PREFIX}-iframe`
  iframe.src = buildIframeUrl(scope, accessToken)
  iframe.setAttribute('allow', 'clipboard-write; web-share')
  iframe.setAttribute('loading', 'eager')

  return iframe
}

/**
 * Set up message listener for iframe communication
 */
export function setupMessageListener(
  iframe: HTMLIFrameElement,
  options: KYIOptions,
  onClose?: () => void
): () => void {
  const handleMessage = (event: MessageEvent) => {
    // Only accept messages from Bluprynt origin
    if (!event.origin.includes('bluprynt.com')) {
      return
    }

    // Validate message source
    if (event.source !== iframe.contentWindow) {
      return
    }

    const message = event.data as KYIMessage

    switch (message.type) {
      case 'kyi:ready':
        options.onReady?.()
        break
      case 'kyi:complete':
        options.onComplete?.()
        break
      case 'kyi:error':
        options.onError?.(new Error(String(message.payload ?? 'Unknown error')))
        break
      case 'kyi:close':
        onClose?.()
        options.onClose?.()
        break
    }
  }

  window.addEventListener('message', handleMessage)

  return () => {
    window.removeEventListener('message', handleMessage)
  }
}
