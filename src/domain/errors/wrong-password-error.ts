export class WrongPasswordError extends Error {
  constructor () {
    super('The password is wrong')
    this.name = 'WrongPasswordError'
  }
}
