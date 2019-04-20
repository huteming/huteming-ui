const ui = {}

const uiContext = require.context('./modules', false, /\.js$/)
uiContext.keys().forEach(item => {
    const config = uiContext(item).default
    const name = item
        .match(/ui-(.*)\.js$/)[1]
        .split('-')
        .map(item => item.toLowerCase().replace(/^\S/g, L => L.toUpperCase()))
        .join('')

    ui[name] = config
})

/**
 * {
 *     DataDisplay: [],
 *     DataEntry: [],
 * }
 */
export default ui
