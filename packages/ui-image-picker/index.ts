import Directive from './src/main'

Directive.install = function (Vue: any) {
    Vue.directive(Directive.name, Directive)
}

export default Directive
