import TmIcon from 'packages/ui-icon/src/main'
import { linear } from 'packages/ui-animation/src/main'
import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { Root, Wrap, Content, Icon, Action } from './work'
const bem = createBEM('noticebar')
const TIME_DELAY = 2000
const TIME_RESTORE = 1000
const PX_TIME_CONSUMING = 25 // 移动每像素耗时，毫秒
const EXTRA_DISTANCE = 15 // 额外移动的距离

@DescribedComponent({
  name: 'Noticebar',
})
export default class NoticeBar extends Vue {
  render () {
    return (
      <Root class={ bem() }>
        { this.icon && <Icon class={ bem('icon') }><TmIcon icon={ this.icon }/></Icon> }

        <Content class={ bem('content') } is-top={ !this.icon } ref="content">
          <Wrap class={ bem('wrap') } style={ this.styleWrap } ref="wrap">
            { this.$slots.default }
          </Wrap>
        </Content>

        {
          (this.actionIcon || this.$slots.action) && (
            <Action class={ bem('action') } on-click={ this.handleClick }>
              {
                this.$slots.action || (
                  this.actionIcon && <TmIcon icon={ this.actionIcon } />
                )
              }
            </Action>
          )
        }
      </Root>
    )
  }

  @Prop({ type: String })
  mode: string | undefined

  @Prop({ type: String, default: 'volume_up' })
  icon!: string

  @Prop({
    type: [Number, String],
    validator (val) {
      return !isNaN(Number(val))
    },
  })
  duration!: number | string

  @Prop({ type: Boolean, default: true })
  loop!: boolean

  moveLeft = 0
  timerMove = 0
  timerRestore = 0

  get actionIcon () {
    switch (this.mode) {
    case 'closeable':
      return 'clear'
    case 'link':
      return 'arrow_forward'
    default:
      return this.mode
    }
  }
  get styleWrap () {
    return {
      transform: `translateX(-${this.moveLeft}px)`,
    }
  }

  mounted () {
    this.start()
  }

  beforeDestroy () {
    clearTimeout(this.timerMove)
    clearTimeout(this.timerRestore)
  }

  handleClick () {
    this.$emit('click')

    if (this.mode === 'closeable') {
      this.destroyElement()
    }
  }
  start () {
    const contentComp = this.$refs.content as Vue
    const contentDom = contentComp.$el as HTMLElement
    const widthContent = contentDom.offsetWidth
    const wrapComp = this.$refs.wrap as Vue
    const wrapDom = wrapComp.$el as HTMLElement
    const widthWrap = wrapDom.offsetWidth
    const diff = widthWrap - widthContent
    if (diff > 0) {
      const distance = diff + EXTRA_DISTANCE
      const duration = Number(this.duration) || distance * PX_TIME_CONSUMING
      this.move(distance, duration)
    }
  }
  move (distance: number, duration: number) {
    this.timerMove = setTimeout(() => {
      linear(0, distance, (position: number, isFinish: boolean) => {
        this.moveLeft = position

        if (isFinish) {
          this.restore()

          if (this.loop) {
            this.move(distance, duration)
          }
        }
      }, duration)
    }, TIME_DELAY)
  }
  restore () {
    this.timerRestore = setTimeout(() => {
      this.moveLeft = 0
    }, TIME_RESTORE)
  }
  destroyElement () {
    this.$destroy()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }
}
