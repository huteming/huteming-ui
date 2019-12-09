import { withStyles } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { StyleProps } from '@huteming/ui-styles/types'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', { size: String }, (props: StyleProps) => css`
            position: relative;
            width: 100%;
            box-sizing: border-box;

            ${props.size === 'xs' && `
                padding-left: 10px;
                padding-right: 10px;
            `}

            ${props.size === 'sm' && `
                padding-left: 15px;
                padding-right: 15px;
            `}

            ${props.size === 'md' && `
                padding-left: 20px;
                padding-right: 20px;
            `}

            ${props.size === 'lg' && `
                padding-left: 25px;
                padding-right: 25px;
            `}

            ${props.size === 'xl' && `
                padding-left: 30px;
                padding-right: 30px;
            `}
        `),
    }
}

class WingBlank extends Vue {
    render () {
        const { Root } = this.styledDoms
        return (
            <Root class="tm-wing" style={ this.styles } size={ this.size }>
                { this.$slots.default }
            </Root>
        )
    }

    @Prop({
        type: String,
        default: 'md',
    })
    size!: string

    get styles () {
        const { size } = this
        const isPreset = ['xs', 'sm', 'md', 'lg', 'xl'].includes(size)
        if (isPreset) return {}

        return {
            'padding-left': size,
            'padding-right': size,
        }
    }
}

export default withStyles(styles)(WingBlank, { name: 'TmWingBlank' })
