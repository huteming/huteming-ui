import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class TmFlex extends Vue {
    static registName = 'TmFlex'

    render () {
        const { classes, $slots } = this
        return (
            <div class={ classes }>
                { $slots.default }
            </div>
        )
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
            return ['start', 'center', 'end', 'between', 'around'].includes(val)
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

    @Prop({ type: String, default: '0' })
    gutter!: string

    get classes (): object {
        const _wrap = this.wrap === true ? 'wrap' : (this.wrap || 'nowrap')

        return {
            'tm-flexbox': true,
            [`is-direction-${this.direction}`]: true,
            [`is-wrap-${_wrap}`]: true,
            [`is-justify-${this.justify}`]: true,
            [`is-align-${this.align}`]: true,
            [`is-content-${this.alignContent}`]: true
        }
    }
}
