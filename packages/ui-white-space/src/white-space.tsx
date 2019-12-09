
import { Vue, Prop } from 'vue-property-decorator'
import { withStyles } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', { size: String }, (props: StyleProps) => css`
            ${props.size === 'xs' && `
                height: 10px;
            `}
            ${props.size === 'sm' && `
                height: 15px;
            `}
            ${props.size === 'md' && `
                height: 20px;
            `}
            ${props.size === 'lg' && `
                height: 25px;
            `}
            ${props.size === 'xl' && `
                height: 30px;
            `}
        `)
    }
}

class WhiteSpace extends Vue {
    render () {
        const { Root } = this.styledDoms
        return (
            <Root class="tm-white" size={ this.size } style={ this.styles }>
                { this.$slots.default }
            </Root>
        )
    }

    @Prop({ type: String, default: 'md' })
    size!: string

    get styles () {
        const { size } = this
        const isPreset = ['xs', 'sm', 'md', 'lg', 'xl'].includes(this.size)
        if (isPreset) return {}

        return {
            height: size,
        }
    }
}

export default withStyles(styles)(WhiteSpace, { name: 'TmWhiteSpace' })
