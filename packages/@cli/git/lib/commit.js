const { Controller } = require('../tools/utils')

class Commit extends Controller {
    constructor (cwd, sha) {
        super(cwd)

        this._sha = sha
    }

    sha () {
        return this._sha
    }
}

module.exports = Commit
