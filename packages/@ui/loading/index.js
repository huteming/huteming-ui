import Prototype from './src/loading.js'

Prototype.install = function (Vue) {
    Vue.prototype.$loading = Prototype
}

export default Prototype
