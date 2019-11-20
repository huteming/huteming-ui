import { Vue } from 'vue-property-decorator'
import { withStyles } from '@huteming/ui-styles'
import { StyleProps } from '@huteming/ui-styles/types'

const styles = (styled: any, css: any) => {
    return {
        Container: styled('div', (props: StyleProps) => `
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: ${props.theme.modal.background};
            z-index: ${props.state.zIndex};
        `)
    }
}

class TmModal extends Vue {
    render () {
        const { Container } = this.styledDoms
        const {
            handleBeforeEnter, handleAfterEnter, handleBeforeLeave, handleAfterLeave, handleClick, handleTouchmove,
            visible,
        } = this

        return (
            <transition
                name="fade"
                on-before-enter={ handleBeforeEnter }
                on-after-enter={ handleAfterEnter }
                on-before-leave={ handleBeforeLeave }
                on-after-leave={ handleAfterLeave }>
                <Container class="tm-modal" v-show={ visible } on-click={ handleClick } on-touchmove={ handleTouchmove }></Container>
            </transition>
        )
    }

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
        this.destroy()

        if (typeof this.callbackAfterLeave === 'function') {
            this.callbackAfterLeave()
        }
    }
    destroy () {
        this.$destroy()
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    }

    visible = false

    callbackClick?: Function
    callbackBeforeEnter?: Function
    callbackAfterEnter?: Function
    callbackBeforeLeave?: Function
    callbackAfterLeave?: Function
}

export default withStyles(styles)(TmModal, { name: 'TmModal', })
