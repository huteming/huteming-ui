
import { getScrollTop, scrollY } from '@huteming/ui-element/src/main'
import { placeholder, StyledComponent, DescribedComponent } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { HTMLInputEvent } from '../types'
import TmIcon from 'packages/ui-icon/src/main'

const styles = (styled: any, css: any) => {
  const BaseInput = styled('input', () => `
    display: block;
    flex: 1;
    margin: 0;
    padding: 0;
    font-size: inherit;
    line-height: 1.41176471;
    color: inherit;
    background-color: transparent;
    border: 0;
    outline: 0;
    -webkit-tap-highlight-color: transparent;
  `)

  return {
    Root: styled('div', () => `
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      ${placeholder`
        margin: 0;
        padding: 0;
        color: rgba(178, 186, 196, 1);
      `}
    `),
    Input: BaseInput.extend`
      height: 1.41176471em;
      -webkit-appearance: none;
    `,
    Textarea: BaseInput.withComponent('textarea').extend`
      resize: none;
    `,
    Clear: styled('div', () => `
      margin-left: 7px;
      font-size: 15px;
      line-height: 1;
      color: #C1C1C1;
    `),
  }
}

@DescribedComponent({
  name: 'TmField',
})
@StyledComponent(styles)
export default class Field extends Vue {
  render () {
    const { Root, Input, Textarea, Clear } = this.styledComponents
    const DomInput = this.type === 'textarea' ? Textarea : Input
    return (
      <Root class="tm-field">
        <DomInput
          ref="field"
          style={ this.inputStyle }
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

  isOnComposition = false
  scrollTop = -1
  scrollContainer = null
  focused = false

  get nativeInputValue () {
    return this.value === null || this.value === undefined ? '' : this.value
  }

  get showClear () {
    return (
      this.clearable &&
      this.nativeInputValue !== ''
    )
  }

  handleClear (event: Event) {
    this.$emit('input', '')
    this.$emit('clear', event)
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
