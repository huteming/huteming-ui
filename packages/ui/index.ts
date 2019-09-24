// ui 入口
import './entry-ui.scss'

// js 入口
import * as components from './entry-components'

function install (Vue: { use: (arg0: any) => void; }, config = {}) {
    Object.values(components).forEach(item => Vue.use(item))
}

export default {
    install,
    ...components,
}
