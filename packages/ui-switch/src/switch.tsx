
import { Prop, Vue, Watch } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { Root, Core } from './vars'
const bem = createBEM('switch')

@DescribedComponent({
  name: 'TmSwitch',
})
export default class Switch extends Vue {
  render () {
    return (
      <Root class={ bem() } disabled={ this.disabled }>
        <input class={ bem('input') } type="checkbox" disabled={ this.disabled } v-model={ this.currentValue } style="display: none;" />
        <Core class={ bem('core') } checked={ this.currentValue }></Core>
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
