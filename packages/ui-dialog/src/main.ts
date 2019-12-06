import Dialog from './dialog'

Dialog.install = function (Vue) {
    Vue.component(Dialog.registName, Dialog)
}

export default Dialog
