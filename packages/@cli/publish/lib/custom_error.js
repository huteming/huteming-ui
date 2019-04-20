const util = require('util')

function ProcessError (code, message) {
    const callee = arguments.callee
    Error.apply(this, [message])
    Error.captureStackTrace(this, callee)
    this.code = code
    this.message = message
    this.name = callee.name
}
util.inherits(ProcessError, Error)

exports.ProcessError = ProcessError
