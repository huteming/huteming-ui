import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { Root } from './vars'
const bem = createBEM('tag')

@DescribedComponent({
  name: 'TmTag',
})
export default class Tag extends Vue {
  render () {
    return (
      <Root type={ this.type } plain={ this.plain } round={ this.round } size={ this.size } class={ bem() }>
        { this.$slots.default }
      </Root>
    )
  }

  @Prop({
    type: String,
    default: 'default',
    validator (val) {
      return ['primary', 'success', 'danger', 'warning', 'default'].includes(val)
    },
  })
  type!: string

  @Prop({
    type: String,
    default: 'xs',
    validator (val) {
      return ['md', 'sm', 'xs'].includes(val)
    },
  })
  size!: string

  @Prop({ type: Boolean, default: false })
  plain!: boolean

  @Prop({ type: Boolean, default: false })
  round!: boolean
}
