import Vue from 'vue'
import ActionsComponent from './actionsheet'
import { createModal } from '@huteming/ui-modal'
import { ActionsheetOptions, ActionsheetMenu, ComponentActionsheet } from '../types'

function create (resolve: Function, reject: Function, options: ActionsheetOptions): ComponentActionsheet {
    const ActionsConstructor = Vue.extend(ActionsComponent)
    const instance: ComponentActionsheet = new ActionsConstructor({
        propsData: {
            resolve,
            reject,
            ...options,
        },
    })
    document.body.appendChild(instance.$mount().$el)

    return instance
}

function Actionsheet (options: ActionsheetOptions | ActionsheetMenu[]): Promise<any> {
    if (options instanceof Array) {
        options = {
            menus: options
        }
    }
    const config = Object.assign({}, options)

    return new Promise((resolve, reject) => {
        // zIndex 是从全局状态中取得。必须先创建 modal，再创建实例
        createModal()
        const instance = create(resolve, reject, config)

        instance.open()
    })
}

Actionsheet.install = function (vue: typeof Vue) {
    vue.prototype.$actionsheet = Actionsheet
}

export default Actionsheet
