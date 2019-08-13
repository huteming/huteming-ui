// ui 入口
import './entry-ui.scss'

// js 入口
import * as components from './entry-components'

function install (Vue, config = {}) {
    Object.values(components).forEach(item => Vue.use(item))
}

export default {
    install,
    ...components,
}
