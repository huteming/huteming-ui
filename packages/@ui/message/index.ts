import Prototype from './src/message'

(Prototype as any).install = function (Vue: any) {
    Vue.prototype.$message = Prototype
}

export default Prototype
