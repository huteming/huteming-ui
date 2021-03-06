import ComponentGuide from './guide'
import Vue from 'vue'

const optionsDefault = {
  init: '',
  // complete () {},
}

export default class Guide {
  _instance: any
  _init: any

  constructor (process: any, options = {}) {
    this._instance = null

    this._init = this._create(process, Object.assign({}, optionsDefault, options))
    this._destroy = this._destroy.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  static install (Vue: any) {
    Vue.prototype.$guide = (process: any, options: any) => {
      return new Guide(process, options)
    }
  }

  _create (process: any, options: any) {
    return () => {
      const ConstructorGuide = Vue.extend(ComponentGuide)
      const instance = new ConstructorGuide({
        data: {
          init: options.init,
          process,
        },
      })
      instance.$on('close', this._destroy)
      instance.$on('closed', (activeName: any, isComplete: any) => {
        /* istanbul ignore else */
        if (isComplete && typeof options.complete === 'function') {
          options.complete()
        }
      })

      document.body.appendChild(instance.$mount().$el)

      return instance
    }
  }

  _destroy () {
    this._instance = null
  }

  open () {
    if (this._instance) return
    this._instance = this._init()

    this._instance.open()
    return this._instance
  }

  close () {
    if (!this._instance) return

    this._instance.close()
    return null
  }
}
