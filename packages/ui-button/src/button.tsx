import { Vue, Prop } from 'vue-property-decorator'
import { withStyles } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'
import TmIcon from '@huteming/ui-icon/src/main'

const propsRoot = {
    type: String,
    size: String,
    plain: Boolean,
    shape: String,
    disabled: Boolean,
    loading: Boolean,
    block: Boolean,
}

function getColor (props: StyleProps, type: string) {
    const {
        colorPrimary, colorInfo, colorWarning, colorDanger,
        backgroundColorPlain, backgroundColorDefault, backgroundColorPrimary, backgroundColorInfo, backgroundColorWarning, backgroundColorDanger,
    } = props.theme.button

    switch (type) {
    case 'default':
        return {
            color: props.theme.button.colorDefault,
            backgroundColor: props.plain ? backgroundColorPlain : backgroundColorDefault,
            borderColor: props.theme.button.borderColorDefault,
        }
    case 'primary':
        return {
            color: props.plain ? backgroundColorPrimary : colorPrimary,
            backgroundColor: props.plain ? backgroundColorPlain : backgroundColorPrimary,
            borderColor: props.theme.button.borderColorPrimary,
        }
    case 'info':
        return {
            color: props.plain ? backgroundColorInfo : colorInfo,
            backgroundColor: props.plain ? backgroundColorPlain : backgroundColorInfo,
            borderColor: props.theme.button.borderColorInfo,
        }
    case 'warning':
        return {
            color: props.plain ? backgroundColorWarning : colorWarning,
            backgroundColor: props.plain ? backgroundColorPlain : backgroundColorWarning,
            borderColor: props.theme.button.borderColorWarning,
        }
    case 'danger':
        return {
            color: props.plain ? backgroundColorDanger : colorDanger,
            backgroundColor: props.plain ? backgroundColorPlain : backgroundColorDanger,
            borderColor: props.theme.button.borderColorDanger,
        }
    default:
        return {}
    }
}

const styles = (styled: any, css: any) => {
    return {
        Root: () => {
            return styled('button', propsRoot, (props: StyleProps) => css`
                position: relative;
                display: inline-block;
                box-sizing: border-box;
                height: ${props.theme.button.height};
                margin: 0;
                padding: 0;
                font-size: ${props.theme.button.fontSize};
                line-height: ${props.theme.button.lineHeight};
                text-align: center;
                border-radius: ${props.shape === 'round' ? '10em' : props.shape === 'square' ? 0 : props.theme.button.borderRadius};
                -webkit-appearance: none;
                -webkit-text-size-adjust: 100%;
                opacity: ${props.disabled ? '.5' : '1'};
                outline: none;

                color: ${getColor(props, props.type).color};
                background-color: ${getColor(props, props.type).backgroundColor};
                border: ${props.theme.button.borderWidth} solid ${getColor(props, props.type).borderColor};

                ${props.size === 'mini' && `
                    display: inline-block;
                    min-width: ${props.theme.button.minWidthMini};
                    height: ${props.theme.button.heightMini};
                    font-size: ${props.theme.button.fontSizeMini};
                    line-height: ${props.theme.button.heightMini};

                    & + & {
                        margin-left: 5px;
                    }
                `}

                ${props.size === 'small' && `
                    min-width: ${props.theme.button.minWidthSmall};
                    height: ${props.theme.button.heightSmall};
                    padding: 0 ${props.theme.button.paddingSmall};
                    font-size: ${props.theme.button.fontSizeSmall};
                    line-height: ${props.theme.button.heightSmall};
                `}

                ${props.size === 'normal' && `
                    padding: 0 15px;
                    font-size: ${props.theme.button.fontSizeNormal};
                `}

                ${props.size === 'large' && `
                    width: 100%;
                    height: ${props.theme.button.heightLarge};
                    line-height: ${props.theme.button.heightLarge};
                `}

                ${props.block && `
                    display: block;
                    width: 100%;
                `}

                ${!props.loading && !props.disabled && `
                    &::before {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 100%;
                        height: 100%;
                        background-color: ${props.theme.color.black};
                        border: inherit;
                        border-color: ${props.theme.color.black};
                        border-radius: inherit; /* inherit parent's border radius */
                        transform: translate(-50%, -50%);
                        opacity: 0;
                        content: ' ';
                    }

                    &:active::before {
                        opacity: .1;
                    }
                `}
            `)
        },
        Text: styled('span', { hasIcon: Boolean }, (props: StyleProps) => css`
            ${(props.hasIcon) && `
                display: inline-block;
                margin-left: 5px;
                vertical-align: top;
            `}
        `)
    }
}

class Button extends Vue {
    render () {
        const { Root, Text } = this.styledDoms
        const DomIcon = (() => {
            const icon = this.loading ? 'loading' : this.icon
            return icon && <TmIcon icon={ icon } />
        })()
        const DomText = (() => {
            if (this.loading) {
                return this.loadingText && <Text has-icon>{ this.loadingText }</Text>
            }
            const content = this.$slots.default || this.text
            if (content) {
                return <Text has-icon={ !!this.icon }>{ content }</Text>
            }
        })()

        return (
            <Root
                type={ this.type }
                size={ this.size }
                shape={ this.shape }
                disabled={ this.disabled }
                loading={ this.loading }
                block={ this.block }
                plain={ this.plain }
                on-click={ this.handleClick }>
                { DomIcon }
                { DomText }
            </Root>
        )
    }

    handleClick (event: Event) {
        this.$emit('click', event)
    }

    @Prop({
        type: String,
        default: 'default',
        validator (val) {
            return ['default', 'primary', 'info', 'warning', 'danger'].includes(val)
        },
    })
    type!: string

    @Prop({ type: String, default: '' })
    text!: string

    @Prop({
        type: String,
        default: 'normal',
        validator (val) {
            return ['normal', 'large', 'small', 'mini'].includes(val)
        },
    })
    size!: string

    @Prop({ type: String })
    icon?: string

    @Prop({ type: Boolean, default: false })
    block!: boolean

    @Prop({ type: Boolean, default: false })
    plain!: boolean

    @Prop({ type: String, default: '' })
    shape!: string

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    @Prop({ type: Boolean, default: false })
    loading!: boolean

    @Prop({ type: String, default: '' })
    loadingText!: string
}

export default withStyles(styles)(Button, { name: 'TmButton' })
