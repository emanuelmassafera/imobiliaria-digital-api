export class UserNotFoundError extends Error {
  constructor () {
    super('The user was not found')
    this.name = 'UserNotFoundError'
  }
}
