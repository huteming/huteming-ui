
import { Prop, Vue, Watch } from 'vue-property-decorator'
import { withStyles } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('label', { disabled: Boolean }, (props: StyleProps) => css`
            position: relative;
            display: block;
            ${props.disabled && `
                opacity: .3;
            `}
        `),
        Core: styled('div', { checked: Boolean }, (props: StyleProps) => css`
            position: relative;
            width: 52px;
            height: 32px;
            border: 2px solid #d9d9d9;
            border-radius: 16px;
            background: #d9d9d9;
            box-sizing: border-box;

            &::before {
                content: ' ';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: #fdfdfd;
                border-radius: 15px;
                transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
            }

            &::after {
                content: " ";
                position: absolute;
                top: 0;
                left: 0;
                width: 28px;
                height: 28px;
                border-radius: 15px;
                background-color: #fff;
                box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
                transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
            }

            ${props.checked && `
                border-color: #409eff;
                background-color: #409eff;
        
                &::before {
                    transform: scale(0);
                }

                &::after {
                    transform: translateX(20px);
                }
            `}
        `),
    }
}

class Switch extends Vue {
    render () {
        const { Root, Core } = this.styledDoms

        return (
            <Root class="tm-switch" disabled={ this.disabled }>
                <input class="tm-switch-input" type="checkbox" disabled={ this.disabled } v-model={ this.currentValue } style="display: none;" />
                <Core class="tm-switch-core" checked={ this.currentValue }></Core>
            </Root>
        )
    }

    @Prop({ type: Boolean, default: false })
    value!: boolean

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    currentValue: boolean = this.value

    @Watch('value')
    onValueChange (val: boolean) {
        this.currentValue = val
    }

    @Watch('currentValue')
    onCurrentValueChange (val: boolean) {
        this.$emit('input', val)
        this.$emit('change', val)
    }
}

export default withStyles(styles)(Switch, { name: 'TmSwitch' })
