import { Vue, Prop } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Root, Container, Button, Prefix, Title, Group, Tip, Desc } from './work'
const bem = createBEM('btnpay')

@DescribedComponent({
  name: 'BtnPay',
})
export default class BtnPay extends Vue {
  render () {
    const DomButtonContent = (() => {
      return this.$slots.btn || this.btn
    })()
    const DomPrefix = (() => {
      return this.titlePrefix && <Prefix>{ this.titlePrefix }</Prefix>
    })()
    const DomTitleContent = (() => {
      return this.$slots.title || this.title
    })()
    const DomTipContent = (() => {
      return this.$slots.tip || this.tip
    })()
    const DomDescContent = (() => {
      return this.$slots.desc || this.desc
    })()

    return (
      <Root class={ bem() }>
        <Container class={ bem('container') }>
          { DomPrefix }

          <Title ref="title" large={ !this.titlePrefix } style={ this.titleStyle }>
            { DomTitleContent }
          </Title>

          <Group>
            <Tip ref="tip" through={ this.tipThrough } style={ this.tipStyle }>
              { DomTipContent }
            </Tip>
            <Desc ref="desc" through={ this.descThrough } style={ this.descStyle }>
              { DomDescContent }
            </Desc>
          </Group>
        </Container>

        <Button ref="btn" class={ bem('btn') } style={ this.btnStyle } disabled={ this.disabled } on-click={ this.handleClick }>
          { DomButtonContent }
        </Button>
      </Root>
    )
  }

  handleClick (event: Event) {
    event.stopPropagation()

    // if (this.disabled) {
    //     return false
    // }
    this.$emit('click')
  }

  @Prop({ type: [String, Number], default: '' })
  title!: string | number

  @Prop({ type: String, default: '￥' })
  titlePrefix!: string

  @Prop({ type: Object })
  titleStyle?: object

  @Prop({ type: String, default: '' })
  tip!: string

  @Prop({ type: Object })
  tipStyle?: object

  @Prop({ type: Boolean, default: true })
  tipThrough!: boolean

  @Prop({ type: String, default: '' })
  desc!: string

  @Prop({ type: Object })
  descStyle?: object

  @Prop({ type: Boolean, default: false })
  descThrough!: boolean

  @Prop({ type: String, default: '' })
  btn!: string

  @Prop({ type: Object })
  btnStyle?: object

  @Prop({ type: Boolean, default: false })
  disabled!: boolean
}
