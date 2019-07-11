import Vue from 'vue'
import CompLoading from './loading.vue'

const ConstructorLoading = Vue.extend(CompLoading)

const defaults = {
    target: document.body,
    text: '',
    textStyle: {},
    background: '',
}

class Loading {
    constructor () {
        this.name = 'Loading'
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
            this.open(Object.assign({}, binding.value, { target: el }))
        }
    }

    update (el, binding) {
        if (!(binding.value instanceof Object)) {
            binding.value = {
                loading: !!binding.value,
            }
        }

        binding.value.loading ? this.open(Object.assign({}, binding.value, { target: el })) : this.close()
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

        parent.appendChild(instance.$mount().$el)

        Vue.nextTick(() => {
            instance.show()
        })

        this._instance = instance
        return instance
    }

    close () {
        if (this._instance) {
            this._instance.hide()
            this._instance = null
        }
    }
}

export default new Loading()
