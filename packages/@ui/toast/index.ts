import Prototype from './src/main'

(Prototype as any).install = function (Vue: any) {
    Vue.prototype.$toast = Prototype
}

export default Prototype
