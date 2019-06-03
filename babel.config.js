const plugins = []

if (process.env.NODE_ENV === 'test') {
    plugins.push('babel-plugin-istanbul', 'babel-plugin-rewire')
}

module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins,
    sourceType: 'unambiguous',
}
