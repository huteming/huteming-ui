import { withStyles } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { StyleProps } from '@huteming/ui-styles/types'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', () => `
            display: flex;
            align-items: center;
            background: #fff;
            border-bottom: 1px solid rgba(246, 246, 247, 1);
        `),
        Title: styled('div', () => `
            flex-shrink: 0;
            font-size: 18px;
            line-height: 25px;
            color: rgba(32, 38, 49, 1);
        `),
        Action: styled('div', { type: String }, (props: StyleProps) => css`
            flex: 1;
            padding-top: 18px;
            padding-bottom: 18px;
            font-size: 15px;
            line-height: 21px;

            ${props.type === 'confirm' && `
                padding-right: 20px;
                color: rgba(58, 149, 250, 1);
                text-align: right;
            `}

            ${props.type === 'cancel' && `
                padding-left: 20px;
                color: rgba(142, 146, 150, 1);
            `}
        `)
    }
}

class Toolbar extends Vue {
    render () {
        const { Root, Title, Action } = this.styledDoms
        return (
            <Root class="tm-toolbar">
                <Action class="tm-toolbar-cancel" type="cancel" on-click={ this.handleCancel }>
                    <span>{ this.cancelText }</span>
                </Action>

                <Title class="tm-toolbar-title">{ this.title }</Title>

                <Action class="tm-toolbar-confirm" type="confirm" on-click={ this.handleConfirm }>
                    {
                        this.showConfirm && <span>{ this.confirmText }</span>
                    }
                </Action>
            </Root>
        )
    }

    @Prop({ type: String, default: '' })
    title!: string

    // 确定按钮文本
    @Prop({ type: String, default: '确定' })
    confirmText!: string

    @Prop({ type: Boolean, default: true })
    showConfirm!: boolean

    // 取消按钮文本
    @Prop({ type: String, default: '取消' })
    cancelText!: string

    handleConfirm (event: Event) {
        event.stopPropagation()
        if (!this.showConfirm) {
            return false
        }
        this.$emit('confirm')
    }
    handleCancel (event: Event) {
        event.stopPropagation()
        this.$emit('cancel')
    }
}

export default withStyles(styles)(Toolbar, {
    name: 'TmToolbar',
    inheritAttrs: false,
})
