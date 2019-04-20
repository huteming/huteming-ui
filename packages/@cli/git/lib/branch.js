const { Controller } = require('../tools/utils')

class Branch extends Controller {
    constructor (cwd, name) {
        super(cwd)

        this.name = name
    }
}

module.exports = Branch
