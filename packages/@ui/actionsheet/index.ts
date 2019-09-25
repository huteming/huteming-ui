import Prototype from './src/main'

(Prototype as any).install = function (Vue: any) {
    Vue.prototype.$actionsheet = Prototype
}

export default Prototype
