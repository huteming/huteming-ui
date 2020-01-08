import TmIcon from '@huteming/ui-icon/src/main'
import { Vue } from 'vue-property-decorator'
import { zIndex, StyledComponent, DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'
const bem = createBEM('loading')

const styles = (styled: any, css: any) => {
  return {
    Root: styled('div', { zIndex: String }, (props: StyleProps) => `
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(255, 255, 255, 1);
      z-index: ${props.zIndex};
    `),
    Icon: styled('div', () => `
      font-size: 25px;
    `),
    Content: styled('div', () => `
      height: 100%;
      max-height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    `),
    Text: styled('div', () => `
      margin-top: 3px;
    `),
  }
}

@DescribedComponent({
  name: 'TmLoading',
})
@StyledComponent(styles)
export default class Loading extends Vue {
  render () {
    const { Root, Icon, Content, Text } = this.styledComponents
    return (
      <transition
        name="fade"
        enter-active-class={ this.enterActiveClass }
        leave-active-class={ this.leaveActiveClass }
        on-after-enter={ this.handleAfterEnter }
        on-after-leave={ this.handleAfterLeave }>
        <Root class={ bem() } z-index={ this.zIndex } v-show={ this.visible } on-click={ this.handleStop } on-touchmove={ this.handleTouchmove }>
          <Content class={ bem('content') } style={ this.styleContent }>
            <Icon class={ bem('icon') }>
              <TmIcon icon="loading" />
            </Icon>
            { this.text && <Text class={ bem('text') } style={ this.textStyle }>{ this.text }</Text> }
          </Content>
        </Root>
      </transition>
    )
  }

  visible = false
  openTime = 0
  zIndex = '1000'

  text = ''
  textStyle = {}
  background = ''
  openAnimation = true
  closeAnimation = true

  get styleContent () {
    return {
      'background': this.background,
    }
  }
  get enterActiveClass () {
    return this.openAnimation ? 'fade-enter-active' : ''
  }
  get leaveActiveClass () {
    return this.closeAnimation ? 'fade-leave-active' : ''
  }

  handleTouchmove (event: Event) {
    event.preventDefault()
    event.stopPropagation()
  }
  handleStop (event: Event) {
    event.stopPropagation()
  }
  handleAfterEnter () {
    this.$emit('after-enter')
  }
  handleAfterLeave () {
    this.destroyElement()
  }
  show () {
    this.zIndex = zIndex()
    this.visible = true
  }
  hide () {
    this.visible = false
  }
  destroyElement () {
    this.$destroy()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }
}
