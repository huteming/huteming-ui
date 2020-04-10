
import { getScrollTop, scrollY } from 'packages/ui-element/src/main'
import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Vue, Prop, Watch } from 'vue-property-decorator'
import { HTMLInputEvent, PropAutosize } from '../types'
import TmIcon from 'packages/ui-icon/src/main'
import calcTextareaHeight from './calcTextareaHeight'
import { Root, Input, Textarea, Clear } from './work'
const bem = createBEM('field')

@DescribedComponent({
  name: 'TmField',
})
export default class Field extends Vue {
  render () {
    const DomInput = this.type === 'textarea' ? Textarea : Input
    return (
      <Root class={ bem() }>
        <DomInput
          ref="field"
          style={ this.styleInput }
          type={ this.type }
          value={ this.nativeInputValue }
          on-compositionstart={ this.handleComposition }
          on-compositionupdate={ this.handleComposition }
          on-compositionend={ this.handleComposition }
          on-input={ this.handleInput }
          on-focus={ this.handleFocus }
          on-blur={ this.handleBlur }
          on-change={ this.handleChange }
          aria-label={ this.label }
          {...{ attrs: this.$attrs }}
        />
        { this.showClear && <Clear onClick={ this.handleClear }><TmIcon icon="error_circle_outline" /></Clear> }
      </Root>
    )
  }

  mounted () {
    this.resizeTextarea()
  }

  @Prop({ type: String, default: 'text' })
  type!: string

  @Prop({ type: String, default: '' })
  value!: string

  @Prop({ type: String, default: '' })
  label!: string

  @Prop({ type: Object })
  inputStyle: object | undefined

  @Prop({ type: Boolean, default: false })
  clearable!: boolean

  @Prop({ type: [Boolean, Object], default: false })
  autosize!: boolean | PropAutosize

  isOnComposition = false
  scrollTop = -1
  scrollContainer = null
  focused = false
  textareaCalcStyle = {}

  get nativeInputValue () {
    return this.value === null || this.value === undefined ? '' : this.value
  }

  get showClear () {
    return (
      this.clearable &&
      this.nativeInputValue !== ''
    )
  }

  get styleInput () {
    let styles = Object.assign({}, this.inputStyle)

    if (this.type === 'textarea') {
      styles = Object.assign(styles, this.textareaCalcStyle)
    }

    return styles
  }

  @Watch('nativeInputValue')
  onValueChange () {
    this.$nextTick(this.resizeTextarea)
  }

  handleClear (event: Event) {
    this.$emit('input', '')
    this.$emit('clear', event)
  }

  resizeTextarea () {
    const { autosize, type } = this
    if (type !== 'textarea') return
    const textareaComp = this.$refs.field as Vue
    const textareaEle = textareaComp.$el as HTMLTextAreaElement
    if (!autosize) {
      this.textareaCalcStyle = {
        minHeight: calcTextareaHeight(textareaEle).minHeight,
      }
      return
    }
    const { minRows, maxRows } = autosize === true ? ({} as PropAutosize) : autosize
    this.textareaCalcStyle = calcTextareaHeight(textareaEle, minRows, maxRows)
  }

  focus () {
    const inputComp = this.$refs.field as Vue
    /* istanbul ignore if */
    if (!inputComp) return
    const inputElement = inputComp.$el as HTMLInputElement
    /* istanbul ignore if */
    if (!inputElement) return
    inputElement.focus()
  }
  blur () {
    const inputComp = this.$refs.field as Vue
    /* istanbul ignore if */
    if (!inputComp) return
    const inputElement = inputComp.$el as HTMLInputElement
    /* istanbul ignore if */
    if (!inputElement) return
    inputElement.blur()
  }
  handleComposition (event: HTMLInputEvent) {
    if (event.type === 'compositionstart') {
      this.isOnComposition = true
    }
    if (event.type === 'compositionend') {
      this.isOnComposition = false
      this.handleInput(event.target.value)
    }
  }
  handleInput (val: string) {
    if (this.isOnComposition) return

    this.$emit('input', val)
  }
  handleFocus (event: HTMLInputEvent) {
    this.focused = true
    this.$emit('focus', event)

    // 记录当前滚动条位置
    // fix：输入框弹起影响的不是滚动区域，而是window
    // this.scrollContainer = getScrollContainer(this.$el, true)
    this.scrollTop = getScrollTop(window)
  }
  handleBlur (event: HTMLInputEvent) {
    this.focused = false
    this.$emit('blur', event)

    // 还原滚动条位置
    scrollY(window, this.scrollTop)
  }
  handleChange (event: HTMLInputEvent) {
    this.$emit('change', event.target.value)
  }
}
