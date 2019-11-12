import Directive from './src/infinite-scroll'

(Directive as any).install = function (Vue: any) {
    Vue.directive(Directive.name, Directive)
}

export default Directive
