import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMessageListener } from './iframe'

const ORIGIN = 'https://app.bluprynt.com'

let contentWindow: { postMessage: ReturnType<typeof vi.fn> }
let iframe: HTMLIFrameElement

const post = (data: unknown, { origin = ORIGIN, source = contentWindow as unknown } = {}) => {
  const event = new Event('message')
  Object.defineProperties(event, {
    data: { value: data },
    origin: { value: origin },
    source: { value: source },
  })
  window.dispatchEvent(event)
}

beforeEach(() => {
  vi.stubGlobal('window', new EventTarget())
  contentWindow = { postMessage: vi.fn() }
  iframe = { contentWindow } as unknown as HTMLIFrameElement
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('setupMessageListener', () => {
  it('answers kyi:ready with the token for the Bluprynt origin and fires onReady once', () => {
    const onReady = vi.fn()
    setupMessageListener(iframe, 'partner-token', { onReady })

    post({ type: 'kyi:ready' })
    post({ type: 'kyi:ready' })

    expect(contentWindow.postMessage).toHaveBeenCalledTimes(2)
    expect(contentWindow.postMessage).toHaveBeenCalledWith(
      { type: 'kyi:token', token: 'partner-token' },
      ORIGIN
    )
    expect(onReady).toHaveBeenCalledTimes(1)
  })

  it.each([
    'https://app.bluprynt.com.evil.io',
    'https://evil-app.bluprynt.com',
    'https://bluprynt.com',
    'http://app.bluprynt.com',
  ])('ignores messages from %s', (origin) => {
    const onReady = vi.fn()
    const onError = vi.fn()
    setupMessageListener(iframe, 'partner-token', { onReady, onError })

    post({ type: 'kyi:ready' }, { origin })
    post({ type: 'kyi:error', payload: 'injected' }, { origin })

    expect(contentWindow.postMessage).not.toHaveBeenCalled()
    expect(onReady).not.toHaveBeenCalled()
    expect(onError).not.toHaveBeenCalled()
  })

  it('ignores messages from another window on the Bluprynt origin', () => {
    const onReady = vi.fn()
    setupMessageListener(iframe, 'partner-token', { onReady })

    post({ type: 'kyi:ready' }, { source: {} })

    expect(contentWindow.postMessage).not.toHaveBeenCalled()
    expect(onReady).not.toHaveBeenCalled()
  })

  it('ignores empty messages', () => {
    setupMessageListener(iframe, 'partner-token', {})

    expect(() => post(null)).not.toThrow()
    expect(contentWindow.postMessage).not.toHaveBeenCalled()
  })

  it('stops listening once removed', () => {
    const onReady = vi.fn()
    const remove = setupMessageListener(iframe, 'partner-token', { onReady })

    remove()
    post({ type: 'kyi:ready' })

    expect(onReady).not.toHaveBeenCalled()
  })
})
