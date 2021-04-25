export interface Decrypter {
  decrypt: (ciphertext: string) => Promise<DecodedModel>
}

export type DecodedModel = {
  payload: string
  iat?: number
  exp?: number
}
