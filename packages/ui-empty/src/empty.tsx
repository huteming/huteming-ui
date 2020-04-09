import { Vue, Prop } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Root, Container, Description } from './work'
const bem = createBEM('empty')

@DescribedComponent({
  inheritAttrs: false,
  name: 'Empty',
})
export default class Empty extends Vue {
  render () {
    return (
      <Root class={ bem() }>
        {
          !this.hiddenImage && <Container style={ this.imageStyle }>
            <img src={ this.image } alt="" />
          </Container>
        }

        <Description style={ this.descriptionStyle }>
          { this.$slots.default || this.description }
        </Description>
      </Root>
    )
  }

  @Prop({ type: String, default: 'https://jhsycdn.jinghao.com/components/empty-default.png' })
  image!: string

  @Prop({ type: Object })
  imageStyle: object | undefined

  @Prop({ type: String, default: '暂无数据' })
  description!: string

  @Prop({ type: Object })
  descriptionStyle: object | undefined

  @Prop({ type: Boolean, default: false })
  hiddenImage!: boolean
}
