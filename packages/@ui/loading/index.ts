import Prototype from './src/main'

(Prototype as any).install = function (Vue: any) {
    Vue.prototype.$loading = Prototype
}

export default Prototype
