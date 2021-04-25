import { DecodedModel, Decrypter, Encrypter } from '@/data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string, expiresIn?: string | number): Promise<string> {
    if (expiresIn) {
      return jwt.sign({ payload: plaintext }, this.secret, { expiresIn })
    }
    return jwt.sign({ payload: plaintext }, this.secret)
  }

  async decrypt (ciphertext: string): Promise<DecodedModel> {
    return jwt.verify(ciphertext, this.secret) as DecodedModel
  }
}
