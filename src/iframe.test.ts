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

const everyMessage = [
  { type: 'kyi:ready' },
  { type: 'kyi:error', payload: 'injected' },
  { type: 'kyi:close' },
]

const listen = () => {
  const spies = { onReady: vi.fn(), onError: vi.fn(), onClose: vi.fn(), closeWidget: vi.fn() }
  const { closeWidget, ...options } = spies
  setupMessageListener(iframe, 'partner-token', options, closeWidget)
  return spies
}

const expectNothingHappened = (spies: ReturnType<typeof listen>) => {
  expect(contentWindow.postMessage).not.toHaveBeenCalled()
  for (const spy of Object.values(spies)) expect(spy).not.toHaveBeenCalled()
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
    const spies = listen()

    for (const message of everyMessage) post(message, { origin })

    expectNothingHappened(spies)
  })

  it('ignores messages from another window on the Bluprynt origin', () => {
    const spies = listen()

    for (const message of everyMessage) post(message, { source: {} })

    expectNothingHappened(spies)
  })

  it('ignores empty messages', () => {
    const spies = listen()

    post(null)
    post(undefined)

    expectNothingHappened(spies)
  })

  it('reports kyi:error from the widget as an Error', () => {
    const { onError } = listen()

    post({ type: 'kyi:error', payload: 'Verification failed' })
    post({ type: 'kyi:error' })

    expect(onError.mock.calls.map(([error]) => error.message)).toEqual([
      'Verification failed',
      'Unknown error',
    ])
  })

  it('closes the widget on kyi:close from the widget', () => {
    const { onClose, closeWidget } = listen()

    post({ type: 'kyi:close' })

    expect(closeWidget).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('stops listening once removed', () => {
    const onReady = vi.fn()
    const remove = setupMessageListener(iframe, 'partner-token', { onReady })

    remove()
    post({ type: 'kyi:ready' })

    expect(onReady).not.toHaveBeenCalled()
  })
})
