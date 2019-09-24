import Directive from './src/anchor'

(Directive as any).install = function (Vue: any) {
    Vue.directive(Directive.name, Directive)
}

export default Directive
