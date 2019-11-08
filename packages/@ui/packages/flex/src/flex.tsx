import { Prop, Component, Vue, ProvideReactive } from 'vue-property-decorator'
import styled from 'vue-styled-components'

@Component({
    name: 'TmFlex',
})
export default class TmFlex extends Vue {
    render () {
        const { $slots, direction, normalizedJustify, normalizedWrap, normalizedAlign, normalizedContent } = this
        const Container = styled.div`
            display: flex;
            flex-direction: ${direction};
            flex-wrap: ${normalizedWrap};
            justify-content: ${normalizedJustify};
            align-items: ${normalizedAlign};
            align-content: ${normalizedContent};
        `
        return (
            <Container>
                { $slots.default }
            </Container>
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

    @ProvideReactive('gutter')
    parentGutter = this.gutter
}
