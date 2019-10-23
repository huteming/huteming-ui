import { Vue, Component } from 'vue-property-decorator'
import { ModalComp } from './declare/types'

@Component
export default class TmModal extends Vue implements ModalComp {
    render () {
        const {
            handleBeforeEnter, handleAfterEnter, handleBeforeLeave, handleAfterLeave, handleClick, handleTouchmove,
            styles, visible
        } = this

        return (
            <transition
                name="fade"
                on-before-enter={ handleBeforeEnter }
                on-after-enter={ handleAfterEnter }
                on-before-leave={ handleBeforeLeave }
                on-after-leave={ handleAfterLeave }>
                <div class="tm-modal" style={ styles } v-show={ visible } on-click={ handleClick } on-touchmove={ handleTouchmove }></div>
            </transition>
        )
    }

    get styles () {
        return {
            'z-index': this.zIndex,
        }
    }

    handleClick (event: Event) {
        event.stopPropagation()
        if (typeof this.callbackClick === 'function') {
            this.callbackClick()
        }
    }

    handleTouchmove (event: Event) {
        event.preventDefault()
        event.stopPropagation()
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
    setData (data: object) {
        for (let key in data) {
            (this as any)[key] = (data as any)[key]
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
