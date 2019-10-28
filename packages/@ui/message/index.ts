import MessageBox from './src/main'

MessageBox.install = function (Vue) {
    Vue.prototype[MessageBox.registName] = MessageBox
}

export default MessageBox
