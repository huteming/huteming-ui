const shell = require('shelljs')
const path = require('path')
const components = {
    'huteming-ui': './packages/@ui/src/index.ts',
    'tm-flex': './packages/@ui/packages/flex/index.ts',
    'tm-flex-item': './packages/@ui/packages/flex-item/index.ts',
}

function resolve (...args) {
    return path.resolve(__dirname, '../packages/@ui', ...args)
}

shell.cd(path.resolve(__dirname, '..'))
// vue-cli-service build
const command = 'node ./node_modules/@vue/cli-service/bin/vue-cli-service.js build --target lib --report'

Object.entries(components).forEach(([name, entry]) => {
    const dest = name === 'huteming-ui' ? resolve('dist') : resolve('lib', name)
    shell.exec(`${command} --name ${name} --dest ${dest} ${entry}`)
})
