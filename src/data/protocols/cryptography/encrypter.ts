export interface Encrypter {
  encrypt: (plaintext: string, expiresIn?: string | number) => Promise<string>
}
