import { withStyles, zIndex } from '@huteming/ui-styles/src/main'
import TmIcon from '@huteming/ui-icon/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { StyleProps } from '@huteming/ui-styles/types'
import { isVNode, isComponent } from '@huteming/ui-tools/src/main'
import { VNode, ComponentOptions, CreateElement } from 'vue'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', { position: String, zIndex: String }, (props: StyleProps) => css`
            position: fixed;
            max-width: 225px;
            padding: 8px 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #fff;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 5px;
            box-sizing: border-box;
            z-index: ${props.zIndex};

            ${props.position === 'top' && `
                top: 50px;
                left: 50%;
                transform: translate(-50%, 0);
            `}

            ${props.position === 'middle' && `
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            `}

            ${props.position === 'bottom' && `
                bottom: 50px;
                left: 50%;
                transform: translate(-50%, 0);
            `}
        `),
        Icon: styled('div', { hasText: Boolean }, (props: StyleProps) => `
            order: 1;
            font-size: ${props.hasText ? '50px' : '25px'};
        `),
        Text: styled('div', () => `
            order: 2;
            font-size: 14px;
            line-height: 21px;
        `),
    }
}

class Toast extends Vue {
    render (h: CreateElement) {
        const { Root, Icon, Text } = this.styledDoms
        const domMessage = (() => {
            if (!this.message) return
            let html

            if (isVNode(this.message)) {
                html = this.message
            } else if (isComponent(this.message)) {
                html = h(this.message as ComponentOptions<Vue>)
            } else {
                html = h('p', {
                    domProps: {
                        innerHTML: this.message,
                    },
                })
            }

            return <Text class="tm-toast__text">{ html }</Text>
        })()
        return (
            <transition name="fade" on-after-leave={ this.handleAfterLeave } ref="transition">
                <Root class="tm-toast" v-show={ this.visible } position={ this.position } z-index={ this.zIndex }>
                    { domMessage }
                    { this.icon && <Icon class="tm-toast__icon"><TmIcon icon={ this.icon } /></Icon> }
                </Root>
            </transition>
        )
    }

    @Prop({ type: [String, Object], default: '' })
    message!: string | VNode | ComponentOptions<Vue>

    @Prop({ type: String, default: '' })
    icon!: string

    @Prop({
        type: String,
        default: 'middle',
        validator (val) {
            return ['top', 'middle', 'bottom'].indexOf(val) > -1
        },
    })
    position!: string

    @Prop({ type: Number, default: 3000 })
    duration!: number

    @Prop({ type: Function })
    onClose: Function | undefined

    visible = false
    zIndex = '1000'

    mounted () {
        if (this.duration > 0) {
            setTimeout(this.close, this.duration)
        }
    }

    handleAfterLeave () {
        this.destroyElement()
    }
    open () {
        this.zIndex = zIndex()
        this.visible = true
    }
    close () {
        if (typeof this.onClose === 'function') {
            this.onClose()
        }

        this.visible = false
    }
    destroyElement () {
        this.$destroy()
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    }
}

export default withStyles(styles)(Toast, { name: 'TmToast' })
