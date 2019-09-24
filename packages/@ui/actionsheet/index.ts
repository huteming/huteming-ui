import Prototype from './src/actionsheet'

(Prototype as any).install = function (Vue: any) {
    Vue.prototype.$actionsheet = Prototype
}

export default Prototype
