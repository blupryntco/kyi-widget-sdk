import { CSS_PREFIX, OVERLAY_Z_INDEX } from './constants'

/**
 * Inject CSS styles into the document head
 */
export function injectStyles(): void {
  const styleId = `${CSS_PREFIX}-styles`

  // Don't inject if already present
  if (document.getElementById(styleId)) {
    return
  }

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    /* Overlay backdrop */
    .${CSS_PREFIX}-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: ${OVERLAY_Z_INDEX};
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .${CSS_PREFIX}-overlay.${CSS_PREFIX}-visible {
      opacity: 1;
    }

    /* Modal container */
    .${CSS_PREFIX}-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      width: 90%;
      max-width: 600px;
      height: 80%;
      max-height: 700px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      z-index: ${OVERLAY_Z_INDEX + 1};
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    }

    .${CSS_PREFIX}-modal.${CSS_PREFIX}-visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    /* Drawer container */
    .${CSS_PREFIX}-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      max-width: 480px;
      height: 100%;
      background: #fff;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
      z-index: ${OVERLAY_Z_INDEX + 1};
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }

    .${CSS_PREFIX}-drawer.${CSS_PREFIX}-visible {
      transform: translateX(0);
    }

    /* Close button */
    .${CSS_PREFIX}-close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
      border: none;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: background-color 0.15s ease;
      padding: 0;
      flex-shrink: 0;
    }

    .${CSS_PREFIX}-close:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    .${CSS_PREFIX}-close:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    .${CSS_PREFIX}-close svg {
      width: 16px;
      height: 16px;
      stroke: #666;
      flex-shrink: 0;
    }

    .${CSS_PREFIX}-close:hover svg {
      stroke: #333;
    }

    /* Iframe styles */
    .${CSS_PREFIX}-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .${CSS_PREFIX}-inline {
      width: 100%;
      height: 100%;
      min-height: 400px;
    }

    /* Loading state */
    .${CSS_PREFIX}-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .${CSS_PREFIX}-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e5e7eb;
      border-top-color: #0066cc;
      border-radius: 50%;
      animation: ${CSS_PREFIX}-spin 0.8s linear infinite;
    }

    @keyframes ${CSS_PREFIX}-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `

  document.head.appendChild(style)
}

/**
 * Create close button element
 */
export function createCloseButton(onClick: () => void): HTMLButtonElement {
  const button = document.createElement('button')
  button.className = `${CSS_PREFIX}-close`
  button.setAttribute('aria-label', 'Close')
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `
  button.addEventListener('click', onClick)
  return button
}
