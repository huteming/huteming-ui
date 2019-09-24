import Prototype from './src/loading'

(Prototype as any).install = function (Vue: any) {
    Vue.prototype.$loading = Prototype
}

export default Prototype
