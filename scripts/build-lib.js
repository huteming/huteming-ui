const moduleName = process.argv[2]
const shell = require('shelljs')
const path = require('path')

shell.cd(path.resolve(__dirname, '..'))
// vue-cli-service build
const command = 'node ./node_modules/@vue/cli-service/bin/vue-cli-service.js build --target lib --report'
shell.exec(`${command} --name ${moduleName} --dest packages/ui/lib/${moduleName} packages/ui-${moduleName}/index.ts`)
