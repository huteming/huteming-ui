const ERROR_TYPE_NON_HANDLE = 'nonHandleError'

export default class CustomError extends Error {
  readonly flag: number
  readonly msg: string

  constructor (type: string, message: string = '', flag: number = 0) {
    super(`${ERROR_TYPE_NON_HANDLE}:${type}`)
    this.flag = flag
    this.msg = message
  }
}
