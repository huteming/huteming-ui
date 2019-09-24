const ui: { [key: string]: object } = {}

const uiContext = require.context('./modules', false, /\.js$/)
uiContext.keys().forEach((item: string) => {
    const config = uiContext(item).default
    const uiModule = item.match(/ui-(.*)\.js$/)
    if (uiModule) {
        const name: string = uiModule[1]
            .split('-')
            .map(item => item.toLowerCase().replace(/^\S/g, L => L.toUpperCase()))
            .join('')

        ui[name] = config
    }
})

/**
 * {
 *     DataDisplay: [],
 *     DataEntry: [],
 * }
 */
export default ui
