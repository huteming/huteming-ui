import Directive from './src/main'

Directive.install = function (Vue) {
    Vue.directive(Directive.name, Directive)
}

export default Directive
