import Actionsheet from './src/main'
import { IActionsheet } from './types'
import Vue from 'vue'

const Plugin: any = Actionsheet
Plugin.install = function (vue: typeof Vue) {
    vue.prototype.$actionsheet = Actionsheet
}

export default <IActionsheet>Plugin
