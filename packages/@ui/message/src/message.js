import Vue from 'vue'
import MessageComponent from './message.vue'

const MessageConstructor = Vue.extend(MessageComponent)

function open ({ params, resolve, reject }) {
    const instance = new MessageConstructor({
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

function Message (message, title, options = {}, expandOptions = {}) {
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
    Message[method] = (...args) => {
        args[3] = expandMethods[method]
        return Message(...args)
    }
}

Message.propName = 'Message'

export default Message
