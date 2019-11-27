import Directive from './anchor'
import { Anchor } from '../types'
import Vue from 'vue'

const plugin: Anchor = Object.assign({
    install (vue: typeof Vue) {
        vue.directive(Directive.registName, Directive)
    }
}, Directive)

export default plugin
