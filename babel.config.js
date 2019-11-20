const plugins = []
const isProduction = process.env.NODE_ENV === 'production'
const isDocs = process.env.BUILD_TYPE === 'docs'

if (process.env.NODE_ENV === 'test') {
    plugins.push('babel-plugin-rewire')
}

module.exports = {
    presets: [
        [
            '@vue/cli-plugin-babel/preset',
            {
                useBuiltIns: isProduction && !isDocs ? false : 'usage',
            },
        ]
    ],
    plugins,
    // sourceType: 'unambiguous',
}
