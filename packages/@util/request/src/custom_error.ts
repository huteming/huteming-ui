const ERROR_TYPE_NON_HANDLE = 'nonHandleError'

export class CustomError extends Error {
    flag: any

    constructor (message: any, flag?: number) {
        super(`${ERROR_TYPE_NON_HANDLE}:${message}`)

        this.flag = flag || 0
    }
}
