const ERROR_TYPE_NON_HANDLE = 'nonHandleError'

export class CustomError extends Error {
    constructor (message, flag) {
        super(`${ERROR_TYPE_NON_HANDLE}:${message}`)

        this.flag = flag || 0
    }
}
