import Directive from './src/anchor.js'

Directive.install = function (Vue) {
    Vue.directive(Directive.name, Directive)
}

export default Directive
