const shell = require('shelljs')
const path = require('path')
const moduleName = 'jhsy'

shell.cd(path.resolve(__dirname, '..'))
const commandEnv = 'node ./node_modules/cross-env/dist/bin/cross-env.js BABEL_ENV=lib'
const commandBuild = 'node ./node_modules/@vue/cli-service/bin/vue-cli-service.js build'
// vue-cli-service build
const command = `${commandEnv} ${commandBuild} --target lib --report --report-json`
shell.exec(`${command} --name ${moduleName} --dest packages/ui/dist packages/ui/src/main.ts`)
