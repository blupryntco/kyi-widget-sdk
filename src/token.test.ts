import { decodeJwt } from 'jose'
import { describe, expect, it } from 'vitest'
import { generateToken } from './token'

const base = { issuer: 'partner', secretKey: 'secret', issuerId: 'org-1' }

const lifetime = (token: string) => {
  const { exp, iat } = decodeJwt(token)
  return Number(exp) - Number(iat)
}

describe('generateToken', () => {
  it('defaults to a one-hour lifetime with the widget audience', async () => {
    const token = await generateToken(base)
    expect(lifetime(token)).toBe(3600)
    expect(decodeJwt(token).aud).toBe('bluprynt-widget')
  })

  it('keeps a shorter lifetime', async () => {
    expect(lifetime(await generateToken({ ...base, expiresIn: 600 }))).toBe(600)
  })

  it('caps longer lifetimes at one hour', async () => {
    expect(lifetime(await generateToken({ ...base, expiresIn: 86400 }))).toBe(3600)
  })

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects expiresIn %s',
    async (expiresIn) => {
      await expect(generateToken({ ...base, expiresIn })).rejects.toThrow('expiresIn')
    }
  )
})
