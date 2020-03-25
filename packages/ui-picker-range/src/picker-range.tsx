import TmPopup from '@huteming/ui-popup/src/main'
import TmPicker from '@huteming/ui-picker/src/main'
import TmToolbar from '@huteming/ui-toolbar/src/main'
import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { Vue, Prop, Watch } from 'vue-property-decorator'
import { PickerOptions } from '@huteming/ui-picker/types'
import { Container } from './vars'
const bem = createBEM('picker-range')

@DescribedComponent({
  name: 'PickerRange',
  inheritAttrs: false,
})
export default class PickerRange extends Vue {
  render () {
    const Popup = TmPopup as any
    const PickerItem = TmPicker.item as any
    return (
      <Popup v-model={ this.normalizedVisible } position="bottom" ref="popup">
        <Container class={ bem() }>
          <TmToolbar { ...{ attrs: this.$attrs } } on-confirm={ this.handleConfirm } on-cancel={ this.handleCancel } show-confirm={ this.isValid } />

          <TmPicker>
            {
              ...this.options.map((item, index) => {
                return (
                  <PickerItem { ...{ attrs: this.$attrs } } options={ item } v-model={ this.current[index] } key={ index }></PickerItem>
                )
              })
            }
          </TmPicker>
        </Container>
      </Popup>
    )
  }

  @Prop({ type: Boolean, default: false })
  visible!: boolean

  @Prop({ type: Array, required: true })
  options!: PickerOptions[][]

  @Prop({ type: Array, default: () => [] })
  value!: any[]

  normalizedVisible = this.visible
  current = this.value.concat()

  get isValid () {
    return !!this.options.length && this.options.every(item => item.length)
  }

  @Watch('visible')
  onVisible (val: boolean) {
    this.normalizedVisible = val
  }

  @Watch('normalizedVisible')
  onNormalizedVisible (val: boolean) {
    this.$emit('update:visible', val)

    if (val) {
      this.current = this.value.concat()
    }
  }

  handleConfirm () {
    console.log('confirm', this.current)
    this.$emit('input', this.current)
    this.normalizedVisible = false

    this.$nextTick(() => {
      this.$emit('change', this.current, this.options)
    })
  }
  handleCancel () {
    console.log('cancel')
    this.normalizedVisible = false
  }
}
