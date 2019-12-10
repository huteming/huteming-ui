import Directive from './anchor'
import Vue from 'vue'

export default Object.assign(Directive, {
    install (vue: typeof Vue) {
        vue.directive(Directive.registName, Directive)
    }
})
