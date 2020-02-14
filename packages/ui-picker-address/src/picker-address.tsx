import TmPopup from '@huteming/ui-popup/src/main'
import TmPicker from '@huteming/ui-picker/src/main'
import TmToolbar from '@huteming/ui-toolbar/src/main'
import Loading from 'packages/ui-loading/src/main'
import TmEmpty from 'packages/ui-empty/src/main'
import TmWhiteSpace from 'packages/ui-white-space/src/main'
import { createBEM, DescribedComponent } from '@huteming/ui-styles/src/main'
import { Vue, Prop, Watch } from 'vue-property-decorator'
import { Province, City, Area, CodeState } from '../types'
import axios from 'axios'
import { Root, Wrap } from './work'
const bem = createBEM('address')

@DescribedComponent({
  name: 'TmPickerAddress',
  directives: {
    Loading,
  },
})
export default class PickerAddress extends Vue {
  render () {
    const Toolbar = TmToolbar as any
    const TmPickerItem = TmPicker.item as any
    const DomPicker = (
      <TmPicker>
        <TmPickerItem options={ this.provinces } value={ this.provinceCode } on-input={ (val: string) => (this.provinceCode = val) } />
        <TmPickerItem options={ this.cities } value={ this.cityCode } on-input={ (val: string) => (this.cityCode = val) } />
        <TmPickerItem options={ this.areas } value={ this.areaCode } on-input={ (val: string) => (this.areaCode = val) } />
      </TmPicker>
    )
    const DomEmpty = (
      <TmEmpty description="地址信息获取失败"></TmEmpty>
    )
    return (
      <TmPopup
        value={ this.normalizedVisible }
        on-input={ (val: boolean) => (this.normalizedVisible = val) }
        on-opened={ this.handleOpened }
        position="bottom"
        ref="popup"
      >
        <Root class={ bem() }>
          <Toolbar title={ this.title } on-confirm={ this.handleConfirm } on-cancel={ this.handleCancel } />

          <Wrap class={ bem('wrap') } v-loading={ this.state === 'loading' }>
            { this.state === 'failure' && <TmWhiteSpace></TmWhiteSpace> }
            { this.state === 'success' ? DomPicker : DomEmpty }
          </Wrap>
        </Root>
      </TmPopup>
    )
  }

  mounted () {
    this.normalizedVisible = this.visible
  }

  @Prop({ type: Boolean, default: false })
  visible!: boolean

  @Prop({ type: Array, default: () => [] })
  value!: string[]

  @Prop({ type: Array, default: () => [] })
  valueText!: string[]

  @Prop({ type: String, default: '请选择区域' })
  title!: string

  isOpened = false
  isFetched = false
  nextState: CodeState = 'loading'

  normalizedVisible = false
  provinceOptions: Province[] = []
  provinceCode = ''
  citieOptions: City[] = []
  cityCode = ''
  areaOptions: Area[] = []
  areaCode = ''
  state: CodeState = 'loading' // loading, success, failure

  // 省级
  get provinces () {
    return this.provinceOptions
  }
  // 城市
  get cities () {
    return this.citieOptions.filter(item => item.provinceCode === this.provinceCode)
  }
  // 地区
  get areas () {
    return this.areaOptions.filter(item => item.cityCode === this.cityCode)
  }

  @Watch('visible')
  onVisible (val: boolean) {
    this.normalizedVisible = val
  }

  @Watch('normalizedVisible')
  async onNormalizedVisible (val: boolean) {
    if (val) {
      if (this.state !== 'success') {
        await this.initOptions()
      }
      if (this.state === 'success') {
        this.initValue()
      }
    }
    this.$emit('update:visible', val)
  }

  handleConfirm () {
    this.normalizedVisible = false
    if (this.state !== 'success') return

    const { provinces, provinceCode, cities, cityCode, areas, areaCode } = this

    const _values = [provinceCode, cityCode, areaCode]

    const _valueText = [
      (provinces.find(item => item.value === provinceCode) as Province).label,
      (cities.find(item => item.value === cityCode) as City).label,
      (areas.find(item => item.value === areaCode) as Area).label,
    ]

    this.$emit('input', _values)
    this.$emit('update:valueText', _valueText)
    this.$emit('change', _values, _valueText)

    console.log('confirm', _values, _valueText)
  }
  handleCancel () {
    this.normalizedVisible = false
    console.log('cancel')
  }
  // 异步初始化选项
  async initOptions () {
    try {
      const { data: { provinces, cities, areas } } = await axios.get('https://jhsycdn.jinghao.com/components/address.min.json', {
        withCredentials: false,
      })
      this.provinceOptions = provinces
      this.citieOptions = cities
      this.areaOptions = areas
      this.nextState = 'success'
    } catch (err) {
      console.error(err)
      this.nextState = 'failure'
    }
    this.isFetched = true
    this.tryToChangeState()
  }
  async initValue () {
    let [provinceCodeInit, cityCodeInit, areaCodeInit] = this.value

    provinceCodeInit = String(provinceCodeInit)
    cityCodeInit = String(cityCodeInit)
    areaCodeInit = String(areaCodeInit)

    // 如果 provinceCode 不存在，重置为第一项 value
    this.provinceCode = (() => {
      const codeDefault = this.provinces[0].value
      const one = this.provinces.find(item => item.value === provinceCodeInit)

      return one ? provinceCodeInit : codeDefault
    })()

    // await this.$nextTick()

    this.cityCode = (() => {
      const codeDefault = this.cities[0].value
      const one = this.cities.find(item => item.value === cityCodeInit)

      return one ? cityCodeInit : codeDefault
    })()

    // await this.$nextTick()

    this.areaCode = (() => {
      const codeDefault = this.areas[0].value
      const one = this.areas.find(item => item.value === areaCodeInit)

      return one ? areaCodeInit : codeDefault
    })()
  }

  handleOpened () {
    this.isOpened = true
    this.tryToChangeState()
  }

  /**
   * 地址资源请求 和 选择器打开 时间未知,
   * 需要都准备就绪时才改变 state 状态，否则可能造成页面掉帧
   */
  tryToChangeState () {
    if (this.isFetched && this.isOpened) {
      this.state = this.nextState
    }
  }
}
