const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

function resolveUtil (name) {
    const components = [
        'clocker',
        'flex',
        'flex-item',
        'tab',
        'tab-pane',
        'tab-container',
        {
            name: 'infinite-scroll',
            prefix: false,
        },
    ]

    const uis = {}

    components.forEach(comp => {
        if (typeof comp === 'string') {
            comp = {
                name: comp,
                prefix: true,
            }
        }
        const { name, prefix } = comp

        uis[`${prefix ? 'tm-' : ''}${name}`] = `./src/async/${name}`
    })

    return uis
}

module.exports = {
    alias: {
        '@': resolve('./src'),
    },

    ui: resolveUtil(),
}