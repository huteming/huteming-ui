const plugins = []

if (process.env.NODE_ENV === 'test') {
    plugins.push('babel-plugin-rewire')
}

module.exports = {
    presets: [
        [
            '@vue/app',
            {
                useBuiltIns: process.env.NODE_ENV === 'production' ? false : 'usage',
            },
        ]
    ],
    plugins,
    // sourceType: 'unambiguous',
}
