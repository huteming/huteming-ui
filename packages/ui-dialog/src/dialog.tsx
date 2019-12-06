import MixinsModal from '@huteming/ui-modal/src/main'
import SmartScroll from '@huteming/ui-smart-scroll/src/main'
import { Prop, Mixins, Watch, Emit } from 'vue-property-decorator'
import { withStyles } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'
import imgClose from './images/icon-close.png'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', { time: Number }, (props: StyleProps) => `
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: column wrap;
        `),
        Content: styled('div', () => `
            position: relative;
        `),
        Footer: styled('div', () => `
            width: 100%;
            margin-top: 20px;
        `),
        CancelOutRight: styled('div', () => `
            width: 20px;
            order: -1;
            align-self: flex-end;
            display: flex;
            flex-direction: column;
            align-items: center;
        `),
        CancelOutLeft: styled('div', () => `
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-100%, -100%);
            width: 25px;
            height: 25px;
        `),
        CancelInRight: styled('div', () => `
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(-50%, 50%);
            width: 25px;
            height: 25px;
        `),
        CancelInLeft: styled('div', () => `
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(50%, 50%);
            width: 25px;
            height: 25px;
        `),
        CancelBottom: styled('div', () => `
            position: relative;
            margin-top: 20px;
            width: 37px;
            height: 37px;
        `),
        Line: styled('div', () => `
            width: 1px;
            height: 7px;
            background: #fff;
        `),
    }
}

class Dialog extends Mixins(MixinsModal) {
    render () {
        const { Root, Content, Footer, CancelOutRight, CancelOutLeft, CancelInRight, CancelInLeft, CancelBottom, Line } = this.styledDoms
        const DomFooter = (() => {
            if (this.$slots.name) {
                return <Footer class="tm-dialog-footer">{ this.$slots.name }</Footer>
            }
        })()
        const DomCancelPosition = (() => {
            switch (this.closePosition) {
            case 'bottom':
                return CancelBottom
            case 'out-right':
                return CancelOutRight
            case 'out-left':
                return CancelOutLeft
            case 'in-right':
                return CancelInRight
            case 'in-left':
                return CancelInLeft
            default:
                return ''
            }
        })()
        const DomCancel = (() => {
            if (DomCancelPosition) {
                return (
                    <DomCancelPosition class="tm-dialog-cancel" on-click={ this.handleClose }>
                        <img src={ imgClose } alt="" style="display: block; width: 100%;" />
                        { this.closePosition === 'out-right' && <Line></Line> }
                    </DomCancelPosition>
                )
            }
        })()
        return (
            <transition name="fade" on-after-leave={ this.handleAfterLeave }>
                <Root class="tm-dialog" v-show={ this.normalizedVisible } on-click={ this.handleStop }>
                    <Content class="tm-dialog-content">{ this.$slots.default }</Content>
                    { DomFooter }
                    { DomCancel }
                </Root>
            </transition>
        )
    }

    mounted () {
        if (this.visible) {
            this.show()
        }
    }

    @Watch('value')
    onValue (val: boolean) {
        this.visible = val
    }

    @Watch('visible')
    @Emit('input')
    onVisible (val: boolean) {
        val ? (this.show()) : (this.hide())
    }

    handleStop (event: Event) {
        event.stopPropagation()
    }

    show () {
        this.openModal({
            leaveToDestroy: false,
            click: this.handleClickModal,
        })
        this.normalizedVisible = true

        this.$emit('open')
    }

    hide () {
        const done = () => {
            this.closeModal()
            this.normalizedVisible = false

            this.$emit('close')
        }

        if (typeof this.beforeClose === 'function') {
            this.beforeClose(done)
        } else {
            done()
        }
    }

    handleClose () {
        this.visible = false
    }

    /**
     * 点击 modal 回调
     */
    handleClickModal () {
        if (this.closeOnClickModal) {
            this.visible = false
        }
    }

    /**
     * Dialog 关闭动画结束时的回调
     */
    handleAfterLeave () {
        this.$emit('closed')
    }

    /**
     * 可选值 out-right, out-left, in-right, in-left, bottom
     */
    @Prop({ type: String, default: 'bottom' })
    closePosition!: string

    @Prop({ type: Boolean, default: false })
    value!: boolean

    @Prop({ type: Function })
    beforeClose: Function | undefined

    @Prop({ type: Boolean, default: false })
    closeOnClickModal!: boolean

    visible: boolean = this.value
    normalizedVisible: boolean = false
}

export default withStyles(styles)(Dialog, {
    name: 'TmDialog',
    directives: {
        SmartScroll,
    },
})
