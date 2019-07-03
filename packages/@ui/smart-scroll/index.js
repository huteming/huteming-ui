import Directive from './src/smart-scroll.js'

Directive.install = function (Vue) {
    Vue.directive(Directive.name, Directive)
}

export default Directive
