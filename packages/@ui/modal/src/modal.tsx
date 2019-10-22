import { Vue, Component } from 'vue-property-decorator'
import { ModalComp } from './declare/types'

@Component
export default class TmModal extends Vue implements ModalComp {
    render () {
        const {
            handleBeforeEnter, handleAfterEnter, handleBeforeLeave, handleAfterLeave, handleClick,
            styles, visible
        } = this

        return (
            <transition
                name="fade"
                onBeforeEnter={ handleBeforeEnter }
                onAfterEnter={ handleAfterEnter }
                onBeforeLeave={ handleBeforeLeave }
                onAfterLeave={ handleAfterLeave }>
                <div class="tm-modal" style={ styles } v-show={ visible } onClick_stop={ handleClick } onTouchmove_prevent_stop></div>
            </transition>
        )
    }

    get styles () {
        return {
            'z-index': this.zIndex,
        }
    }

    handleClick () {
        if (typeof this.callbackClick === 'function') {
            this.callbackClick()
        }
    }

    /**
     * 动画钩子
     */
    handleBeforeEnter () {
        if (typeof this.callbackBeforeEnter === 'function') {
            this.callbackBeforeEnter()
        }
    }
    handleAfterEnter () {
        if (typeof this.callbackAfterEnter === 'function') {
            this.callbackAfterEnter()
        }
    }
    handleBeforeLeave () {
        if (typeof this.callbackBeforeLeave === 'function') {
            this.callbackBeforeLeave()
        }
    }
    handleAfterLeave () {
        this.handleElementDestroy()

        if (typeof this.callbackAfterLeave === 'function') {
            this.callbackAfterLeave()
        }
    }

    /**
     * helper ------------------
     */
    show (options = {}) {
        this.setData(options)
        this.visible = true
    }
    hide (options = {}) {
        this.setData(options)
        this.visible = false
    }
    setData (data = {}) {
        for (let key in data) {
            if (this.hasOwnProperty(key)) {
                (this as any)[key] = (data as any)[key]
            }
        }
    }
    handleElementDestroy () {
        this.$destroy()
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    }

    zIndex = 9999
    visible = false

    callbackClick?: Function
    callbackBeforeEnter?: Function
    callbackAfterEnter?: Function
    callbackBeforeLeave?: Function
    callbackAfterLeave?: Function
}
