<template>
<transition name="zoom-in" @after-leave="handleAfterLeave">
    <div class="tm-message" :style="styles" v-show="visible" ref="msgbox" @click.stop.self="handleClickModal" @touchmove.stop.prevent>
        <div class="tm-message-wrap">
            <div class="tm-message-container">
                <div class="tm-message-title" v-if="title">{{ title }}</div>

                <div class="tm-message-subtitle" v-if="message" v-html="message"></div>

                <div class="tm-message-field" v-if="showInput">
                    <input class="tm-message-field__input" :type="inputType" :value="normalizedInputValue" @input="handleInput" :placeholder="inputPlaceholder" autofocus />
                </div>
            </div>

            <div class="tm-message-footer">
                <div class="tm-message-footer-btn tm-message-footer-btn__cancel" :class="{ 'text-bold': cancelButtonHighlight }" v-if="showCancelButton" @click="handleClose('cancel')">
                    <span>{{ cancelButtonText }}</span>
                </div>

                <div class="tm-message-footer-btn tm-message-footer-btn__confirm" :class="{ 'text-bold': confirmButtonHighlight }" @click="handleClose('confirm')">
                    <span>{{ confirmButtonText }}</span>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import MixinsModal from 'web-ui/modal/index.js'
import zindexManager from 'web/assets/js/zindex-manager'

export default {
    name: 'Message',
    mixins: [MixinsModal],

    props: {
        // 提示框的标题
        title: {
            type: String,
            default: '提示'
        },
        // 提示框的内容
        message: {
            type: String,
            default: ''
        },

        // 确认按钮的文本
        confirmButtonText: {
            type: String,
            default: '确定'
        },
        // 是否将确认按钮的文本加粗显示
        confirmButtonHighlight: {
            type: Boolean,
            default: false
        },

        // 是否显示取消按钮
        showCancelButton: {
            type: Boolean,
            default: false
        },
        // 取消按钮的文本
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        // 是否将取消按钮的文本加粗显示
        cancelButtonHighlight: {
            type: Boolean,
            default: false
        },

        // 是否显示一个输入框
        showInput: {
            type: Boolean,
            default: false
        },
        // 输入框的类型
        inputType: {
            type: String,
            default: 'text'
        },
        // 输入框的值
        inputValue: {
            default: ''
        },
        // 输入框的占位符
        inputPlaceholder: {
            type: String,
            default: '请输入'
        },

        // 关闭前的回调，会暂停 message 的关闭。done 用于关闭 message
        beforeClose: Function,
        beforeConfirm: Function,
        beforeCancel: Function,
        // 是否在点击遮罩时关闭提示框(alert 为 false)
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
    },

    data () {
        return {
            zIndex: 9999,
            visible: false,

            normalizedInputValue: this.inputValue,

            resolve: null,
            reject: null,
            res: {},
        }
    },

    computed: {
        instanceType () {
            const { showCancelButton, showInput } = this

            if (showInput) {
                return 'prompt'
            } else if (showCancelButton) {
                return 'confirm'
            } else {
                return 'alert'
            }
        },
        styles () {
            return {
                'z-index': this.zIndex,
            }
        },
    },

    methods: {
        handleAfterLeave () {
            const { action } = this.res
            const _callback = (() => {
                switch (this.instanceType) {
                case 'alert':
                    return this.resolve
                default:
                    return action === 'confirm' ? this.resolve : this.reject
                }
            })()
            _callback(this.res)
            this.destroyElement()
        },
        handleInput (evt) {
            this.normalizedInputValue = evt.target.value
        },
        handleClose (action) {
            this.hide(action)
        },
        handleClickModal () {
            if (this.instanceType !== 'alert' && this.closeOnClickModal) {
                this.hide('cancel')
            }
        },
        show () {
            this.$_openModal()
            this.visible = true

            // 必须在调用 openModal 之后
            // 为了获取动态 zindex
            this.zIndex = zindexManager.zIndex
        },
        async hide (action) {
            this.res = {
                action,
                inputValue: this.normalizedInputValue
            }
            const _beforeAction = action === 'confirm' ? this.beforeConfirm : this.beforeCancel

            const done = () => {
                this.$_closeModal()
                this.visible = false
            }
            const _beforeClose = () => {
                if (typeof this.beforeClose === 'function') {
                    this.beforeClose(done, this.res)
                } else {
                    done()
                }
            }

            if (typeof _beforeAction === 'function') {
                _beforeAction(_beforeClose, this.res)
            } else {
                _beforeClose()
            }
        },
        destroyElement () {
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },
    },
}
</script>
