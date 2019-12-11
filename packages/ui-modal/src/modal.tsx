import { Vue } from 'vue-property-decorator'
import { withStyles } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'
import { ModalOptions } from '../types'

const styles = (styled: any, css: any) => {
    return {
        Container: styled('div', (props: StyleProps) => `
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: ${props.theme.modal.background};
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

    show (options: ModalOptions) {
        this.setData(options)
        this.visible = true
    }
    hide (options: ModalOptions) {
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
        /* istanbul ignore else */
        if (typeof this.click === 'function') {
            this.click()
        }
    }

    handleTouchmove (event: Event) {
        event.preventDefault()
        event.stopPropagation()
    }

    disabledScroll () {
        /* istanbul ignore else */
        if (document.scrollingElement) {
            this.scrollTop = document.scrollingElement.scrollTop
            document.body.classList.add('tm-disabled-scroll')
            document.body.style.top = -this.scrollTop + 'px'
        }
    }

    restoreScroll () {
        /* istanbul ignore else */
        if (document.scrollingElement) {
            document.body.classList.remove('tm-disabled-scroll')
            document.scrollingElement.scrollTop = this.scrollTop
            document.body.style.top = ''
        }
    }

    /**
     * 动画钩子
     */
    handleBeforeEnter () {
        /* istanbul ignore else */
        if (typeof this.beforeEnter === 'function') {
            this.beforeEnter()
        }
    }
    handleAfterEnter () {
        this.disabledScroll()
        /* istanbul ignore else */
        if (typeof this.afterEnter === 'function') {
            this.afterEnter()
        }
    }
    handleBeforeLeave () {
        this.restoreScroll()
        /* istanbul ignore else */
        if (typeof this.beforeLeave === 'function') {
            this.beforeLeave()
        }
    }
    handleAfterLeave () {
        if (this.leaveToDestroy) {
            this.destroy()
        }

        /* istanbul ignore else */
        if (typeof this.afterLeave === 'function') {
            this.afterLeave()
        }
    }
    destroy () {
        this.$destroy()
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    }

    visible = false
    leaveToDestroy: boolean = true
    scrollTop = 0

    click?: Function
    beforeEnter?: Function
    afterEnter?: Function
    beforeLeave?: Function
    afterLeave?: Function
}

export default withStyles(styles)(TmModal, { name: 'TmModal', })
