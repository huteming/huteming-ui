import { Prop, Vue, ProvideReactive, Mixins } from 'vue-property-decorator'
import { withStyles } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'
import { ParentMixin } from 'ui/mixins/relation'

const RootProps = {
    direction: String,
    wrap: String,
    justify: String,
    align: String,
    alignContent: String,
}

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', RootProps, (props: StyleProps) => `
            display: flex;
            flex-direction: ${props.direction};
            flex-wrap: ${props.wrap};
            justify-content: ${props.justify};
            align-items: ${props.align};
            align-content: ${props.alignContent};
        `)
    }
}

class Flex extends Mixins(ParentMixin('flex')) {
    render () {
        const { Root } = this.styledDoms
        return (
            <Root
                class="tm-flex"
                direction={ this.direction }
                wrap={ this.normalizedWrap }
                justify={ this.normalizedJustify }
                align={ this.normalizedAlign }
                align-content={ this.normalizedContent }>
                { this.$slots.default }
            </Root>
        )
    }

    get normalizedWrap (): string {
        if (this.wrap === true) {
            return 'wrap'
        }
        return this.wrap || 'nowrap'
    }

    get normalizedJustify (): string {
        switch (this.justify) {
        case 'start':
            return 'flex-start'
        case 'end':
            return 'flex-end'
        case 'between':
            return 'space-between'
        case 'around':
            return 'space-around'
        default:
            return this.justify
        }
    }

    get normalizedAlign (): string {
        switch (this.align) {
        case 'start':
            return 'flex-start'
        case 'end':
            return 'flex-end'
        default:
            return this.align
        }
    }

    get normalizedContent (): string {
        switch (this.alignContent) {
        case 'start':
            return 'flex-start'
        case 'end':
            return 'flex-end'
        case 'between':
            return 'space-between'
        case 'around':
            return 'space-around'
        default:
            return this.alignContent
        }
    }

    @Prop({
        type: String,
        default: 'row',
        validator (val) {
            return ['row', 'row-reverse', 'column', 'column-reverse'].includes(val)
        },
    })
    direction!: string

    @Prop({
        type: [Boolean, String],
        default: 'nowrap',
    })
    wrap!: boolean | string

    @Prop({
        type: String,
        default: 'start',
        validator (val) {
            return ['start', 'center', 'end', 'between', 'around', 'space-between', 'space-around'].includes(val)
        },
    })
    justify!: string

    @Prop({
        type: String,
        default: 'stretch',
        validator (val) {
            return ['start', 'center', 'end', 'baseline', 'stretch'].includes(val)
        },
    })
    align!: string

    @Prop({
        type: String,
        default: 'stretch',
        validator (val) {
            return ['start', 'end', 'center', 'between', 'around', 'stretch'].includes(val)
        },
    })
    alignContent!: string

    @Prop({ type: String, default: '0px' })
    gutter!: string
}

export default withStyles(styles)(Flex, { name: 'TmFlex' })
