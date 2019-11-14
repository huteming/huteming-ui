import actionsheet from './src/main'
import { Actionsheet } from './types'
import Vue from 'vue'

const Plugin: any = actionsheet
Plugin.install = function (vue: typeof Vue) {
    vue.prototype.$actionsheet = actionsheet
}

export default <Actionsheet>Plugin
