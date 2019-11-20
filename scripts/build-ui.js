const shell = require('shelljs')
const path = require('path')

shell.cd(path.resolve(__dirname, '..'))
// vue-cli-service build
const command = 'node ./node_modules/@vue/cli-service/bin/vue-cli-service.js build --target lib --report'
shell.exec(`${command} --name huteming-ui --dest packages/ui/dist packages/ui/index.ts`)
