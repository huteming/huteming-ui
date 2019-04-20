class ProcessError extends Error {
    constructor (code, message) {
        super(...arguments)

        this.code = code
        this.message = message
    }
}

exports.ProcessError = ProcessError
