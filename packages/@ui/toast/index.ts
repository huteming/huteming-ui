import Prototype from './src/toast'

(Prototype as any).install = function (Vue: any) {
    Vue.prototype.$toast = Prototype
}

export default Prototype
