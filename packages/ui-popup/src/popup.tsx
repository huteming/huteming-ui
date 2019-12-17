import MixinsModal from '@huteming/ui-modal/src/main'
import SmartScroll from '@huteming/ui-smart-scroll/src/main'
import { Mixins, Prop, Watch } from 'vue-property-decorator'
import { StyledComponent, TypedComponent, DescribedComponent } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'
import { PopupProps, PopupEvents, PopupPosition } from '../types'
import TransitionSlide from '@huteming/ui-transition-slide/src/main'
import TransitionFade from '@huteming/ui-transition-fade/src/main'

const styles = (styled: any, css: any) => {
  return {
    Root: styled('div', { position: String }, (props: StyleProps) => css`
      position: fixed;
      overflow: auto;
      -webkit-overflow-scrolling: touch;

      ${props.position === 'middle' && `
          left: 50%;
          transform: translate(-50%, 10px);
          width: 200px;
          padding: 10px;
          border-radius: 8px;
          background: #fff;
  
          &::before {
            display: inline-block;
            width: 0;
            height: 0;
            border: solid transparent;
            border-width: 10px;
            border-bottom-color: #fff;
            content: "";
            position: absolute;
            top: -20px;
            right: 50px;
          }
      `}

      ${props.position === 'top' && `
        top: 0;
        left: 0;
        right: 0;
        padding: 8px;
        font-size: 14px;
        line-height: 1.8;
        color: #fff;
        text-align: center;
        background-color: rgba(0, 0, 0, .7);
      `}

      ${props.position === 'bottom' && `
        left: 0;
        right: 0;
        bottom: 0;
      `}

      ${props.position === 'left' && `
        top: 0;
        bottom: 0;
        left: 0;
        width: 300px;
      `}

      ${props.position === 'right' && `
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      `}
    `),
  }
}

@DescribedComponent({
  name: 'TmPopup',
  inheritAttrs: false,
  directives: {
    SmartScroll,
  },
})
@StyledComponent(styles)
class Popup extends Mixins(MixinsModal) {
  render () {
    const { Root } = this.styledComponents
    const TransitionComp = this.transitionComponent as any
    return (
      <TransitionComp enterDirection={ this.position } leaveDirection={ this.position } on-after-leave={ this.handleAfterLeave }>
        <Root class="tm-popup" v-show={ this.normalizedVisible } position={ this.position } v-smart-scroll={ this.handlePreventMove }>
          { this.$slots.default }
        </Root>
      </TransitionComp>
    )
  }

  // 显示弹框
  @Prop({ type: Boolean, default: false })
  value!: boolean

  @Prop({ type: Function })
  beforeClose: Function | undefined

  // 显示位置
  @Prop({
    type: String,
    default: 'middle',
    validator (val: string) {
      return ['middle', 'top', 'bottom', 'left', 'right'].indexOf(val) > -1
    },
  })
  position!: PopupPosition

  /**
   * 定时消失
   * postion = top 时，生效
   */
  @Prop({ type: Number, default: 3000 })
  duration!: number

  // 是否在 smart-scroll 阻止滚动事件后关闭
  @Prop({ type: [Number, Boolean], default: Infinity })
  closeOnMove!: number | boolean

  visible = this.value
  normalizedVisible = false

  get transitionComponent () {
    if (this.position === 'middle') {
      return TransitionFade
    }
    return TransitionSlide
  }

  get normalizedCloseOnMove () {
    const _closeOnMove = this.closeOnMove
    // smart-scroll 暂时只支持竖向滚动检测，所以这里只能支持 bottom 位置
    if (this.position !== 'bottom') {
      return Infinity
    }
    if (typeof _closeOnMove === 'number') {
      return _closeOnMove <= 0 ? Infinity : _closeOnMove
    }
    return _closeOnMove ? 70 : Infinity
  }

  @Watch('value')
  onValue (val: boolean) {
    this.visible = val
  }

  @Watch('visible')
  onVisible (val: boolean) {
    val ? (this.show()) : (this.hide())

    this.$emit('input', val)
  }

  mounted () {
    if (this.value) {
      this.show()
    }
  }

  handlePreventMove ({ moveY }: any) {
    if (moveY > this.normalizedCloseOnMove) {
      this.visible = false
    }
  }

  handleAfterLeave () {
    this.$emit('closed')
  }
  handleClickModal () {
    if (this.closeOnClickModal) {
      this.visible = false
    }
  }
  show () {
    if (['middle', 'bottom', 'left'].indexOf(this.position) > -1) {
      this.openModal({
        leaveToDestroy: false,
        click: this.handleClickModal,
      })
    }
    this.normalizedVisible = true

    if (this.position === 'top') {
      setTimeout(this.hide, this.duration)
    }

    this.$emit('open')
  }
  hide () {
    const done = () => {
      this.closeModal()
      this.normalizedVisible = false

      this.$emit('close')
    }

    if (typeof this.beforeClose === 'function') {
      this.beforeClose(done)
    } else {
      done()
    }
  }
}

export default TypedComponent<PopupProps, PopupEvents>(Popup)
