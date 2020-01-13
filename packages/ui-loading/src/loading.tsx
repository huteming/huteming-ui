import TmIcon from '@huteming/ui-icon/src/main'
import { Vue, Provide } from 'vue-property-decorator'
import { zIndex, StyledComponent, DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'
import TmTransitionFade from 'packages/ui-transition-fade/src/main'
import { LoadingComp } from '../types'
const bem = createBEM('loading')

const styles = (styled: any, css: any) => {
  return {
    Root: styled('div', { zIndex: String }, (props: StyleProps) => `
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: ${props.theme.loading.background};
      z-index: ${props.zIndex};
    `),
    Icon: styled('div', (props: StyleProps) => `
      font-size: 25px;
      color: ${props.theme.loading.colorIcon};
    `),
    Content: styled('div', () => `
      height: 100%;
      max-height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    `),
    Text: styled('div', (props: StyleProps) => `
      margin-top: 3px;
      color: ${props.theme.loading.colorText};
    `),
  }
}

@DescribedComponent({
  name: 'TmLoading',
})
@StyledComponent(styles)
export default class Loading extends Vue implements LoadingComp {
  render () {
    const { Root, Icon, Content, Text } = this.styledComponents
    return (
      <TmTransitionFade
        enterDuration={ this.openAnimation ? 150 : 0 }
      >
        <Root class={ bem() } z-index={ this.zIndex } v-show={ this.visible } on-click={ this.handleStop } on-touchmove={ this.handleTouchmove }>
          <Content class={ bem('content') }>
            <Icon class={ bem('icon') }>
              <TmIcon icon="loading" />
            </Icon>
            { this.text && <Text class={ bem('text') }>{ this.text }</Text> }
          </Content>
        </Root>
      </TmTransitionFade>
    )
  }

  visible = false
  zIndex = '9999'

  text = ''
  openAnimation = true
  loading = false
  theme = {}

  @Provide('$theme')
  $theme () {
    return {
      loading: this.theme,
    }
  }

  handleTouchmove (event: Event) {
    event.preventDefault()
    event.stopPropagation()
  }
  handleStop (event: Event) {
    event.stopPropagation()
  }
  show () {
    this.zIndex = zIndex()
    this.visible = true
  }
  hide () {
    this.visible = false
  }
}
