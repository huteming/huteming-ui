import Directive from './src/image-picker'

(Directive as any).install = function (Vue: any) {
    Vue.directive(Directive.name, Directive)
}

export default Directive
