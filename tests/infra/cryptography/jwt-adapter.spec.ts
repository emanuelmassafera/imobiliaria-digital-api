import { JwtAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'

import jwt from 'jsonwebtoken'
import faker from 'faker'

let plaintext: string
let expiresIn: string
let ciphertext: string

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await Promise.resolve(ciphertext)
  },

  async verify (): Promise<string> {
    return await Promise.resolve(plaintext)
  }
}))

const secret = 'secret'

const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret)
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    beforeEach(() => {
      plaintext = faker.random.word()
      expiresIn = faker.random.word()
      ciphertext = faker.random.word()
    })

    test('Should call sign with correct values without expiresIn', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(plaintext)
      expect(signSpy).toHaveBeenCalledWith({ payload: plaintext }, secret)
    })

    test('Should call sign with correct values with expiresIn', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(plaintext, expiresIn)
      expect(signSpy).toHaveBeenCalledWith({ payload: plaintext }, secret, { expiresIn: expiresIn })
    })

    test('Should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt(plaintext)
      expect(accessToken).toBe(ciphertext)
    })

    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt(plaintext)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    beforeEach(() => {
      plaintext = faker.random.word()
      ciphertext = faker.random.word()
    })

    test('Should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt(ciphertext)
      expect(verifySpy).toHaveBeenCalledWith(ciphertext, secret)
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const value = await sut.decrypt(ciphertext)
      expect(value).toBe(plaintext)
    })

    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
      const promise = sut.decrypt(ciphertext)
      await expect(promise).rejects.toThrow()
    })
  })
})
