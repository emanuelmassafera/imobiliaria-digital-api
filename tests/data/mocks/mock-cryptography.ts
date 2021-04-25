import { Hasher, HashComparer, Encrypter, Decrypter, DecodedModel } from '@/data/protocols'

import faker from 'faker'

export class HasherSpy implements Hasher {
  plaintext: string
  digest = faker.datatype.uuid()

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return await Promise.resolve(this.digest)
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return await Promise.resolve(this.isValid)
  }
}

export class EncrypterSpy implements Encrypter {
  plaintext: string
  ciphertext = faker.datatype.uuid()

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return await Promise.resolve(this.ciphertext)
  }
}

export class DecrypterSpy implements Decrypter {
  ciphertext: string
  plaintext = { payload: faker.internet.password() }

  async decrypt (ciphertext: string): Promise<DecodedModel> {
    this.ciphertext = ciphertext
    return await Promise.resolve(this.plaintext)
  }
}
