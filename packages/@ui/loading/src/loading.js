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
        this._openTime = 0
        this._timer = null
        this._instance = null

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.inserted = this.inserted.bind(this)
        this.update = this.update.bind(this)
        this.unbind = this.unbind.bind(this)
    }

    inserted (el, binding) {
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
        if (!(binding.value instanceof Object)) {
            binding.value = {
                loading: !!binding.value,
            }
        }
        const _options = Object.assign({}, binding.value, { target: el })

        binding.value.loading ? this.open(_options) : this.close(_options)
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
                callbackAfterEnter () {
                    _options.target.style.visibility = originVisibility
                    instance.needAnimation = true
                },
            })
            this._openTime = Date.now()
        })

        this._instance = instance
        return instance
    }

    close (options) {
        const { duration = MIN_DURATION } = options || {}
        clearTimeout(this._timer)

        const done = () => {
            if (this._instance) {
                this._instance.hide()
                this._instance = null
            }
        }
        // 添加最小持续时间 500ms
        const diff = this._openTime === 0 ? 0 : Date.now() - this._openTime
        if (diff > duration) {
            done()
        } else {
            this._timer = setTimeout(done, duration - diff)
        }
    }
}

export default new Loading()
