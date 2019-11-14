import Vue from 'vue'
import ActionsComponent from './actionsheet'
import { ActionsheetOptions, ActionsheetMenu } from '../types'

const defaults = {
    menus: [],
    title: '',
    cancelText: '取消',
    closeOnClickModal: true,
}
const ActionsConstructor = Vue.extend(ActionsComponent)

function show (resolve: Function, reject: Function, options: ActionsheetOptions) {
    const instance: any = new ActionsConstructor({
        data: {
            resolve,
            reject,
            ...options,
        },
    })

    document.body.appendChild(instance.$mount().$el)

    Vue.nextTick(() => {
        instance.open()
    })

    return instance
}

function Actionsheet (options: ActionsheetOptions | ActionsheetMenu[]): Promise<any> {
    if (options instanceof Array) {
        options = {
            menus: options
        }
    }
    const config: ActionsheetOptions = Object.assign({}, defaults, options)

    return new Promise((resolve, reject) => {
        show(resolve, reject, config)
    })
}

export default Actionsheet
