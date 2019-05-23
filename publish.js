const name = process.argv[2]
const shell = require('shelljs')
const path = require('path')

shell.cd(path.resolve(__dirname))
shell.exec(`npm run ${name}`)
