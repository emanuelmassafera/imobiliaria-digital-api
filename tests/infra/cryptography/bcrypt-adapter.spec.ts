
import { BcryptAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'

import bcrypt from 'bcrypt'
import faker from 'faker'

let plaintext: string
let digest: string

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve(digest)
  },

  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    beforeEach(() => {
      plaintext = faker.random.word()
      digest = faker.random.word()
    })

    test('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(plaintext)
      expect(hashSpy).toHaveBeenCalledWith(plaintext, salt)
    })

    test('Should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash(plaintext)
      expect(hash).toBe(digest)
    })

    test('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash(plaintext)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    beforeEach(() => {
      plaintext = faker.random.word()
      digest = faker.random.word()
    })

    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(plaintext, digest)
      expect(compareSpy).toHaveBeenCalledWith(plaintext, digest)
    })

    test('Should return true when compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare(plaintext, digest)
      expect(isValid).toBe(true)
    })

    test('Should return false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
      const isValid = await sut.compare(plaintext, digest)
      expect(isValid).toBe(false)
    })

    test('Should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare(plaintext, digest)
      await expect(promise).rejects.toThrow()
    })
  })
})
