const ERROR_TYPE_NON_HANDLE = 'nonHandleError'

export default class CustomError extends Error {
    readonly flag: number

    constructor (message: string, flag: number = 0) {
        super(`${ERROR_TYPE_NON_HANDLE}:${message}`)
        this.flag = flag
    }
}
