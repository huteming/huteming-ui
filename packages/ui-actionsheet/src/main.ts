import Vue from 'vue'
import ActionsComponent from './actionsheet'
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
      menus: options,
    }
  }
  const config = Object.assign({}, options)

  return new Promise((resolve, reject) => {
    const instance = create(resolve, reject, config)

    instance.open()
  })
}

Actionsheet.registName = '$actionsheet'

Actionsheet.install = function (vue: typeof Vue) {
  vue.prototype[Actionsheet.registName] = Actionsheet
}

export default Actionsheet
