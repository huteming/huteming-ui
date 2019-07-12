import Vue from 'vue'
import CompLoading from './loading.vue'
import { getStyle } from 'web-util/element/src/main'
const MIN_DURATION = 1000

const ConstructorLoading = Vue.extend(CompLoading)

const defaults = {
    target: document.body,
    text: '',
    textStyle: {},
    background: '',
    needAnimation: true,
    duration: MIN_DURATION,
}

class Loading {
    constructor () {
        this.name = 'Loading'

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.bind = this.bind.bind(this)
        this.update = this.update.bind(this)
        this.unbind = this.unbind.bind(this)
    }

    bind (el, binding) {
        this._openTime = 0
        this._timer = null
        this._instance = null

        if (!(binding.value instanceof Object)) {
            binding.value = {
                loading: !!binding.value,
            }
        }

        if (binding.value.loading) {
            // 首次绑定指令时，如果就是loading状态，则不需要动画
            this.open(Object.assign({}, binding.value, { target: el, needAnimation: false }))
        }
    }

    update (el, binding) {
        const _value = getOptions(binding.value)
        const _oldValue = getOptions(binding.oldValue)
        if (_value.loading === _oldValue.loading) {
            return
        }

        const _options = Object.assign(_value, { target: el })

        _options.loading ? this.open(_options) : this.close(_options)
    }

    unbind () {
        this.close()
    }

    open (options) {
        const _options = Object.assign({}, defaults, options || {})

        if (this._instance) return

        const instance = new ConstructorLoading({
            propsData: _options,
        })

        const parent = _options.target

        // 如果不需要动画，需要先隐藏目标dom，否则可能出现“闪频”
        // 在显示 loading 之后，还原
        const originVisibility = getStyle(_options.target, 'visibility')
        if (_options.needAnimation === false) {
            _options.target.style.visibility = 'hidden'
        }

        parent.appendChild(instance.$mount().$el)

        Vue.nextTick(() => {
            instance.show({
                callbackAfterEnter: () => {
                    _options.target.style.visibility = originVisibility
                    instance.needAnimation = true
                    this._openTime = Date.now()
                    this._instance.$emit('ready')
                },
            })
        })

        this._instance = instance
        return instance
    }

    close (options) {
        if (!this._instance) {
            return false
        }

        const { duration = MIN_DURATION } = options || {}
        const done = () => {
            this._instance.hide()
            this._instance = null
        }

        clearTimeout(this._timer)

        // _openTime 为 0，表示 dom 未插入文档中，监听事件关闭
        if (this._openTime === 0) {
            this._instance.$once('ready', done)
            return
        }

        // 添加最小持续时间
        const diff = Date.now() - this._openTime
        if (diff > duration) {
            done()
        } else {
            this._timer = setTimeout(done, duration - diff)
        }
    }
}

function getOptions (value) {
    if (!(value instanceof Object)) {
        value = {
            loading: !!value,
        }
    }
    return Object.assign({}, value)
}

export default new Loading()
