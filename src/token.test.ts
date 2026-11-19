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

  it.each([
    [600, 600],
    [1.9, 1],
    [3600, 3600],
    [3601, 3600],
    [86400, 3600],
    [Number.POSITIVE_INFINITY, 3600],
  ])('expiresIn %s gives a %s-second token', async (expiresIn, expected) => {
    expect(lifetime(await generateToken({ ...base, expiresIn }))).toBe(expected)
  })

  it.each([0, 0.5, -1, Number.NaN])('rejects expiresIn %s', async (expiresIn) => {
    await expect(generateToken({ ...base, expiresIn })).rejects.toThrow('expiresIn')
  })
})
