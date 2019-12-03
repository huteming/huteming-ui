import MixinsModal from 'packages/ui-modal/index'
import zindexManager from 'ui/utils/zindex-manager'
import { isVNode, isComponent } from '@huteming/ui-tools/src/main'
import { Vue, Component } from 'vue-property-decorator'
import { BeforeClose, BeforeConfirm, BeforeCancel, MessageResponse, MessageType, ActionType, MessageComp } from './declare/type'
import { OpenModal, CloseModal } from '@huteming/ui-modal/types'
import { CreateElement } from 'vue'

@Component
export default class Message extends Vue implements MessageComp {
    render (h: CreateElement) {
        const {
            handleAfterLeave, styles, inputType, title, normalizedInputValue, handleInput, handleTouchmove,
            inputPlaceholder, handleConfirm, handleCancel, cancelButtonText, confirmButtonText, cancelButtonHighlight,
            confirmButtonHighlight, showCancelButton, message, showInput, handleClickModal, visible,
        } = this

        const domTitle = (() => {
            if (title) {
                return <div class="tm-message-title">{ title }</div>
            }
        })()
        const domMessage = (() => {
            if (message === '') return
            let html

            if (isVNode(message)) {
                html = message
            } else if (isComponent(message)) {
                html = h(message)
            } else {
                html = h('p', {
                    domProps: {
                        innerHTML: message,
                    },
                })
            }

            return <div class="tm-message-subtitle">{ html }</div>
        })()
        const domField = (() => {
            if (showInput) {
                return <div class="tm-message-field">
                    <input class="tm-message-field__input" type={ inputType } value={ normalizedInputValue } onInput={ handleInput } placeholder={ inputPlaceholder } autofocus />
                </div>
            }
        })()
        const domCancel = (() => {
            if (showCancelButton) {
                return <div class={ ['tm-message-footer-btn', 'tm-message-footer-btn__cancel', cancelButtonHighlight ? 'text-bold' : ''] } onClick={ handleCancel }>
                    <span>{ cancelButtonText }</span>
                </div>
            }
        })()

        return (
            <transition name="zoom-in" on-after-leave={ handleAfterLeave }>
                <div class="tm-message" style={ styles } v-show={ visible } ref="msgbox" on-click={ handleClickModal } on-touchmove={ handleTouchmove }>
                    <div class="tm-message-wrap">
                        <div class="tm-message-container">
                            { domTitle }
                            { domMessage }
                            { domField }
                        </div>

                        <div class="tm-message-footer">
                            { domCancel }

                            <div class={ ['tm-message-footer-btn', 'tm-message-footer-btn__confirm', confirmButtonHighlight ? 'text-bold' : ''] } onClick={ handleConfirm }>
                                <span>{ confirmButtonText }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        )
    }

    // eslint-disable-next-line
    $_openModal!: OpenModal
    // eslint-disable-next-line
    $_closeModal!: CloseModal

    get messageType (): MessageType {
        const { showCancelButton, showInput } = this

        if (showInput) {
            return 'prompt'
        } else if (showCancelButton) {
            return 'confirm'
        }
        return 'alert'
    }

    get styles (): object {
        return {
            'z-index': this.zIndex,
        }
    }

    handleAfterLeave () {
        const { action } = this.res
        const _callback = (() => {
            if (this.messageType === 'alert') {
                return this.resolve
            }
            return action === 'confirm' ? this.resolve : this.reject
        })()
        _callback(this.res)
        this.destroyElement()
    }

    handleInput (evt: any) {
        this.normalizedInputValue = evt.target.value
    }

    handleClickModal (event: Event) {
        // .stop
        event.stopPropagation()
        // .self
        if (event.target !== event.currentTarget) return

        if (this.messageType !== 'alert' && this.closeOnClickModal) {
            this.handleCancel()
        }
    }

    handleTouchmove (event: Event) {
        // .stop
        event.stopPropagation()
        // .prevent
        event.preventDefault()
    }

    handleConfirm () {
        this.hide('confirm')
    }

    handleCancel () {
        this.hide('cancel')
    }

    show () {
        this.$_openModal()
        this.visible = true

        // 必须在调用 openModal 之后
        // 为了获取动态 zindex
        this.zIndex = zindexManager.zIndex
    }

    hide (action: ActionType) {
        this.res = {
            action,
            inputValue: this.normalizedInputValue,
            vm: this,
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
    }

    destroyElement (): void {
        this.$destroy()
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    }

    message = ''
    // 提示框的标题
    title = '提示'

    // 确认按钮的文本
    confirmButtonText = '确定'

    // 是否将确认按钮的文本加粗显示
    confirmButtonHighlight = false

    // 是否显示取消按钮
    showCancelButton = false

    // 取消按钮的文本
    cancelButtonText = '取消'

    // 是否将取消按钮的文本加粗显示
    cancelButtonHighlight = false

    // 是否显示一个输入框
    showInput = false

    // 输入框的类型
    inputType = 'text'

    // 输入框的值
    inputValue = ''

    // 输入框的占位符
    inputPlaceholder = '请输入'

    // 是否在点击遮罩时关闭提示框(alert 为 false)
    closeOnClickModal = true

    // 关闭前的回调，会暂停 message 的关闭。done 用于关闭 message
    beforeClose?: BeforeClose
    beforeConfirm?: BeforeConfirm
    beforeCancel?: BeforeCancel

    zIndex = 9999
    visible = false
    normalizedInputValue = this.inputValue
    resolve!: Function
    reject!: Function
    res!: MessageResponse
}
