import Vue from 'vue'
import MessageComponent from './message.vue'

const MessageConstructor = Vue.extend(MessageComponent)

function open ({ params, resolve, reject }: any) {
    const instance: any = new MessageConstructor({
        propsData: params,
        data: {
            resolve,
            reject
        }
    })

    document.body.appendChild(instance.$mount().$el)

    Vue.nextTick(() => {
        instance.show()
    })

    return instance
}

const expandMethods = {
    alert: {
        closeOnClickModal: false
    },
    confirm: {
        showCancelButton: true
    },
    prompt: {
        showCancelButton: true,
        showInput: true
    },
}

function Message (message: any, title: any, options = {}, expandOptions = {}) {
    let params = expandOptions

    if (message instanceof Object) {
        params = Object.assign({}, message, params)
    } else if (title instanceof Object) {
        params = Object.assign({ message }, title, params)
    } else {
        params = Object.assign({}, { message, title }, options, params)
    }

    return new Promise((resolve, reject) => {
        open({ params, resolve, reject })
    })
}

for (let method in expandMethods) {
    (Message as any)[method] = (message: any, title: any, ...args: any) => {
        args[1] = (expandMethods as any)[method]
        return Message(message, title, ...args)
    }
}

export default Message
