import Vue from 'vue'
import CompLoading from './loading.vue'
import { getStyle } from 'web-util/element/src/main'
const ConstructorLoading = Vue.extend(CompLoading)
const scope = '@@Loading'

const defaults = {
    text: '',
    textStyle: {},
    background: '',
    openAnimation: true,
    closeAnimation: true,
    duration: 500,
}

function getOptions (value) {
    if (!(value instanceof Object)) {
        value = {
            loading: !!value,
        }
    }
    return Object.assign({}, defaults, value)
}

async function open (parent, options) {
    if (parent[scope].instance) return false

    // 如果不需要动画，需要先隐藏目标dom，否则可能出现“闪频”
    // 在显示 loading 之后，还原
    const originVisibility = getStyle(parent, 'visibility')
    if (options.openAnimation === false) {
        parent.style.visibility = 'hidden'
    }

    const instance = new ConstructorLoading({
        data () {
            return options
        },
    })

    instance.$on('after-enter', () => {
        if (options.openAnimation === false) {
            parent.style.visibility = originVisibility
        }

        // 插入文档后，记录当前时间
        instance.openTime = Date.now()
        instance.$emit('ready')
    })

    parent[scope].instance = instance
    parent.appendChild(instance.$mount().$el)

    await instance.$nextTick()
    instance.show()

    return instance
}

function close (parent, { duration }) {
    if (!parent[scope].instance) return false

    const { instance } = parent[scope]
    const { openTime } = instance
    parent[scope].instance = null

    const done = () => {
        // 添加最小持续时间
        const diff = Date.now() - openTime
        if (diff > duration) {
            instance.hide()
        } else {
            setTimeout(instance.hide, duration - diff)
        }
    }

    // openTime 为 0，表示 dom 未插入文档中，监听事件关闭
    if (openTime === 0) {
        instance.$on('ready', done)
    } else {
        done()
    }
}

export default {
    name: 'Loading',

    bind (el, binding) {
        el[scope] = {
            instance: null,
        }

        const _options = getOptions(binding.value)

        // 首次绑定指令时，如果就是loading状态，则不需要动画
        _options.loading && open(el, Object.assign(_options, { openAnimation: false }))
    },

    update (el, binding) {
        const _options = getOptions(binding.value)

        _options.loading ? open(el, _options) : close(el, _options)
    },

    unbind (el) {
        close(el, { duration: 0 })
    },

    open (target, options) {
        const _options = getOptions(options)
        open(target, _options)
    },

    close (target, options) {
        const _options = getOptions(options)
        close(target, _options)
    },
}
