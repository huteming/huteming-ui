import Prototype from './src/main'

(Prototype as any).install = function (Vue: any) {
    Vue.prototype.$message = Prototype
}

export default Prototype