
import TmPopup from '@huteming/ui-popup/src/main'
import TmPicker from '@huteming/ui-picker/src/main'
import TmToolbar from '@huteming/ui-toolbar/src/main'
import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { Vue, Prop, Watch } from 'vue-property-decorator'
import { Root } from './vars'
const bem = createBEM('datetime')

const NOW = new Date()
const CURRENT_YEAR = NOW.getFullYear()
const MIN_YEAR = CURRENT_YEAR - 10
const MAX_YEAR = CURRENT_YEAR + 10

@DescribedComponent({
  name: 'PickerDatetime',
})
export default class PickerDatetime extends Vue {
  render () {
    const PickerItem = TmPicker.item as any
    const showDate = this.mode === 'datetime' || this.mode === 'date'
    const showTime = this.mode === 'datetime' || this.mode === 'time'
    return (
      <TmPopup value={ this.normalizedVisible } on-input={ (val: boolean) => (this.normalizedVisible = val) } position="bottom" ref="popup">
        <Root class={ bem() }>
          <TmToolbar on-confirm={ this.handleConfirm } on-cancel={ this.handleCancel } />

          <TmPicker>
            { showDate && <PickerItem options={ this.yearOptions } value={ this.yearCurrent } on-input={ (val: number) => (this.yearCurrent = val) }></PickerItem> }
            { showDate && <PickerItem options={ this.monthOptions } value={ this.monthCurrent } on-input={ (val: number) => (this.monthCurrent = val) }></PickerItem> }
            { showDate && <PickerItem options={ this.dateOptions } value={ this.dateCurrent } on-input={ (val: number) => (this.dateCurrent = val) }></PickerItem> }

            { showTime && <PickerItem options={ this.hourOptions } value={ this.hourCurrent } on-input={ (val: number) => (this.hourCurrent = val) }></PickerItem> }
            { showTime && <PickerItem options={ this.minuteOptions } value={ this.minuteCurrent } on-input={ (val: number) => (this.minuteCurrent = val) }></PickerItem> }
          </TmPicker>
        </Root>
      </TmPopup>
    )
  }

  @Prop({ type: Boolean, default: false })
  visible!: boolean

  @Prop({ type: Date, default: () => NOW })
  value!: Date

  /**
   * 组件的类型, 可选值 datetime, date, time
   */
  @Prop({
    type: String,
    default: 'datetime',
    validator (val: string) {
      return ['datetime', 'date', 'time'].indexOf(val) > -1
    },
  })
  mode!: string

  // 日期的最小可选值
  @Prop({ type: Date, default: () => new Date(MIN_YEAR, 1, 1, 0, 0, 0) })
  minDate!: Date

  // 日期的最大可选值
  @Prop({ type: Date, default: () => new Date(MAX_YEAR, 1, 1, 23, 59, 59) })
  maxDate!: Date

  yearCurrent = 0
  monthCurrent = 0
  dateCurrent = 0
  hourCurrent = 0
  minuteCurrent = 0

  normalizedVisible = this.visible

  /**
   * @argument yearCurrent
   * @argument monthCurrent
   * @argument dateCurrent
   * @argument hourCurrent
   * @argument minuteCurrent
   */
  get current () {
    const { yearCurrent, monthCurrent, dateCurrent, hourCurrent, minuteCurrent } = this

    return new Date(yearCurrent, monthCurrent, dateCurrent, hourCurrent, minuteCurrent)
  }
  set current (val) {
    this.yearCurrent = val.getFullYear()
    this.monthCurrent = val.getMonth()
    this.dateCurrent = val.getDate()
    this.hourCurrent = val.getHours()
    this.minuteCurrent = val.getMinutes()
  }

  /**
   * @argument normalizedMin
   * @argument normalizedMax
   */
  get yearOptions () {
    const [minYear] = this.normalizedMin
    const [maxYear] = this.normalizedMax

    return Array.from({ length: maxYear - minYear + 1 }, (value, index) => ({ label: minYear + index, value: minYear + index }))
  }

  /**
   * @argument normalizedMin
   * @argument normalizedMax
   * @argument yearCurrent
   */
  get monthOptions () {
    const [minYear, minMonth] = this.normalizedMin
    const [maxYear, maxMonth] = this.normalizedMax

    const min = this.yearCurrent === minYear ? minMonth : 0
    const max = this.yearCurrent === maxYear ? maxMonth : 11

    return Array.from({ length: max - min + 1 }, (value, index) => ({ label: min + index + 1, value: min + index }))
  }

  /**
   * @argument normalizedMin
   * @argument normalizedMax
   * @argument yearCurrent
   * @argument monthCurrent
   */
  get dateOptions () {
    const [minYear, minMonth, minDate] = this.normalizedMin
    const [maxYear, maxMonth, maxDate] = this.normalizedMax

    const min = (this.yearCurrent === minYear && this.monthCurrent === minMonth) ? minDate : 1
    const max = (this.yearCurrent === maxYear && this.monthCurrent === maxMonth) ? maxDate : this.getLastDateOfMonth(this.yearCurrent, this.monthCurrent)

    return Array.from({ length: max - min + 1 }, (value, index) => ({ label: min + index, value: min + index }))
  }
  /**
   * @argument normalizedMin
   * @argument normalizedMax
   * @argument yearCurrent
   * @argument monthCurrent
   * @argument dateCurrent
   */
  get hourOptions () {
    const [minYear, minMonth, minDate, minHour] = this.normalizedMin
    const [maxYear, maxMonth, maxDate, maxHour] = this.normalizedMax

    const min = (this.yearCurrent === minYear && this.monthCurrent === minMonth && this.dateCurrent === minDate) ? minHour : 0
    const max = (this.yearCurrent === maxYear && this.monthCurrent === maxMonth && this.dateCurrent === maxDate) ? maxHour : 23

    return Array.from({ length: max - min + 1 }, (value, index) => ({ label: min + index, value: min + index }))
  }
  /**
   * @argument normalizedMin
   * @argument normalizedMax
   * @argument yearCurrent
   * @argument monthCurrent
   * @argument dateCurrent
   * @argument hourCurrent
   */
  get minuteOptions () {
    const [minYear, minMonth, minDate, minHour, minMinute] = this.normalizedMin
    const [maxYear, maxMonth, maxDate, maxHour, maxMinute] = this.normalizedMax

    const min = (this.yearCurrent === minYear && this.monthCurrent === minMonth && this.dateCurrent === minDate && this.hourCurrent === minHour) ? minMinute : 0
    const max = (this.yearCurrent === maxYear && this.monthCurrent === maxMonth && this.dateCurrent === maxDate && this.hourCurrent === maxHour) ? maxMinute : 59

    return Array.from({ length: max - min + 1 }, (value, index) => ({ label: min + index, value: min + index }))
  }
  /**
   * @argument minDate
   */
  get normalizedMin () {
    const year = this.minDate.getFullYear()
    const month = this.minDate.getMonth()
    const date = this.minDate.getDate()
    const hours = this.minDate.getHours()
    const minutes = this.minDate.getMinutes()

    return [year, month, date, hours, minutes]
  }
  /**
   * @argument maxDate
   */
  get normalizedMax () {
    const year = this.maxDate.getFullYear()
    const month = this.maxDate.getMonth()
    const date = this.maxDate.getDate()
    const hours = this.maxDate.getHours()
    const minutes = this.maxDate.getMinutes()

    return [year, month, date, hours, minutes]
  }

  @Watch('visible')
  onVisible (val: boolean) {
    this.normalizedVisible = val
  }
  @Watch('normalizedVisible')
  onNormalizedVisible (val: boolean) {
    this.$emit('update:visible', val)

    if (val) {
      this.current = this.value
    }
  }

  handleConfirm () {
    console.log('confirm', this.current)
    this.$emit('input', this.current)
    this.normalizedVisible = false

    this.$nextTick(() => {
      this.$emit('change', this.current)
    })
  }
  handleCancel () {
    console.log('cancel')
    this.normalizedVisible = false
  }
  // 获取当月最后一天日期
  getLastDateOfMonth (year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
  }
}
