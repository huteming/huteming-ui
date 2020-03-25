import TmIcon from '@huteming/ui-icon/src/main'
import { Vue, Provide } from 'vue-property-decorator'
import { zIndex, DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import TmTransitionFade from 'packages/ui-transition-fade/src/main'
import { LoadingComp } from '../types'
import { Root, Icon, Content, Text } from './vars'
const bem = createBEM('loading')

@DescribedComponent({
  name: 'Loading',
})
export default class Loading extends Vue implements LoadingComp {
  render () {
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
