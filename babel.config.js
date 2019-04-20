module.exports = {
    presets: [
        '@vue/app'
    ],
    'plugins': [
        [
            'transform-imports', {
                '@huteming/util': {
                    'transform': '@huteming/util/lib/${member}',
                    'preventFullImport': true
                },
            }
        ]
    ]
}
