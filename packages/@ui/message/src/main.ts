import Vue from 'vue'
import MessageComponent from './message.vue'
import { isVNode } from 'web-util/tool/src/main'

const MessageConstructor = Vue.extend(MessageComponent)

function open ({ params, resolve, reject }: any) {
    const instance: any = new MessageConstructor({
        propsData: params,
        data: {
            resolve,
            reject,
            message: params.message,
        },
    })

    // message 支持 VNode
    // if (isVNode(instance.message)) {
    //     instance.$slots.default = [instance.message]
    //     instance.message = null
    // } else {
    //     delete instance.$slots.default
    // }

    document.body.appendChild(instance.$mount().$el)

    Vue.nextTick(() => {
        instance.show()
    })

    return instance
}

function Message (message?: string | object, title?: string | object, options: any = {}, expandOptions = {}) {
    let params = expandOptions
    console.log(message)

    if (isVNode(message)) {
        options.message = message
        message = ''
    }

    if (message instanceof Object) {
        params = Object.assign({}, message, params)
    } else if (title instanceof Object) {
        params = Object.assign({ message }, title, params)
    } else {
        params = Object.assign({ message, title }, options, params)
    }

    return new Promise((resolve, reject) => {
        open({ params, resolve, reject })
    })
}

Message.alert = (message?: string | object, title?: string | object, options?: object) => {
    return Message(message, title, options, {
        closeOnClickModal: false,
    })
}

Message.confirm = (message?: string | object, title?: string | object, options?: object) => {
    return Message(message, title, options, {
        showCancelButton: true,
    })
}

Message.prompt = (message?: string | object, title?: string | object, options?: object) => {
    return Message(message, title, options, {
        showCancelButton: true,
        showInput: true,
    })
}

export default Message
