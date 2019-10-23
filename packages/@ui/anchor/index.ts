import Directive from './src/anchor'

Directive.install = function (Vue) {
    Vue.directive(Directive.registName, Directive)
}

export default Directive
