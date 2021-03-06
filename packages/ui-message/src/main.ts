import Vue from 'vue'
import TmMessage from './message'
import { isVNode, isComponent } from 'packages/ui-tools/src/main'
import { MessageOptions, MessageConfig, MessageComponent, MessageResponse, MessageBox } from '../types'
import { installPrototype } from 'utils/tools'

const defaults = {
  title: '提示',
  message: '',
  confirmButtonText: '确定',
  confirmButtonHighlight: false,
  showCancelButton: false,
  cancelButtonText: '取消',
  cancelButtonHighlight: false,
  showInput: false,
  inputType: 'text',
  inputValue: '',
  inputPlaceholder: '请输入',
  closeOnClickModal: true,
  beforeClose: null,
  beforeConfirm: null,
  beforeCancel: null,
}

const MessageConstructor = Vue.extend(TmMessage)

function open (config: MessageConfig, resolve: Function, reject: Function) {
  const instance: MessageComponent = new MessageConstructor({
    propsData: config,
    data: {
      resolve,
      reject,
    },
  })

  document.body.appendChild(instance.$mount().$el)
  instance.show()

  return instance
}

function formatConfig (message: string | MessageOptions | object, title?: string | MessageOptions, options: MessageOptions = {}): MessageConfig {
  let config: MessageConfig = Object.assign({}, defaults, options)

  // VNode, Component
  if (isVNode(message) || isComponent(message)) {
    config.message = message
    message = ''
  } else if (typeof message === 'object') {
    config = Object.assign(config, message)
  } else {
    config.message = message
  }

  if (title !== undefined) {
    if (typeof title === 'object') {
      config = Object.assign(config, title)
    } else {
      config.title = title
    }
  }

  // 删除非组件属性
  Object.keys(config).forEach((key: string) => {
    if (!defaults.hasOwnProperty(key)) {
      delete (config as any)[key]
    }
  })

  return config
}

const Message: MessageBox = function (message: string | MessageOptions | object, title?: string | MessageOptions, options?: MessageOptions): Promise<MessageResponse> {
  const config = formatConfig(message, title, options)

  return new Promise((resolve, reject) => {
    open(config, resolve, reject)
  })
}

Message.alert = (message: string | MessageOptions | object, title?: string | object, options?: MessageOptions) => {
  return Message(message, title, Object.assign({}, options, {
    closeOnClickModal: false,
  }))
}

Message.confirm = (message: string | MessageOptions | object, title?: string | object, options?: MessageOptions) => {
  return Message(message, title, Object.assign({}, options, {
    showCancelButton: true,
  }))
}

Message.prompt = (message: string | MessageOptions | object, title?: string | object, options?: MessageOptions) => {
  return Message(message, title, Object.assign({}, options, {
    showCancelButton: true,
    showInput: true,
  }))
}

Message.install = installPrototype('$message', Message)

export default Message
