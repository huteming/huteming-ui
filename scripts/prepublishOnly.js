const moduleName = process.argv[2]
const moduleType = process.argv[3] || 'ui'
const shell = require('shelljs')
const path = require('path')

shell.cd(path.resolve(__dirname, '..'))
// vue-cli-service build
const command = 'node ./node_modules/@vue/cli-service/bin/vue-cli-service.js build --target lib --report'
const name = (() => {
    switch (moduleName) {
    case 'ui':
        return 'huteming-ui'
    case 'util':
        return 'huteming-util'
    default:
        return moduleName
    }
})()
const dest = (() => {
    switch (moduleName) {
    case 'ui':
        return 'packages/ui/dist'
    case 'util':
        return 'packages/util/dist'
    default:
        return `packages/@${moduleType}/${moduleName}/dist`
    }
})()
const entry = (() => {
    switch (moduleName) {
    case 'ui':
        return 'packages/ui/index.ts'
    case 'util':
        return 'packages/util/index.ts'
    default:
        return `packages/@${moduleType}/${moduleName}/index.ts`
    }
})()
shell.exec(`${command} --name ${name} --dest ${dest} ${entry}`)
