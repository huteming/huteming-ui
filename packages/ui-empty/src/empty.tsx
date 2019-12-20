
import { Vue, Prop } from 'vue-property-decorator'
import { StyledComponent, DescribedComponent } from '@huteming/ui-styles/src/main'

const styles = (styled: any, css: any) => {
  return {
    Root: styled('div', () => `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `),
    Container: styled('div', () => `
      height: 100px;
      margin-bottom: 9px;

      img {
        height: 100%;
        vertical-align: middle;
        border-style: none;
      }
    `),
    Description: styled('div', () => `
      font-size: 16px;
      line-height: 22px;
      color: rgba(178, 186, 196, 1);
    `),
  }
}

@DescribedComponent({
  inheritAttrs: false,
  name: 'TmEmpty',
})
@StyledComponent(styles)
export default class Empty extends Vue {
  render () {
    const { Root, Container, Description } = this.styledComponents
    return (
      <Root class="tm-empty">
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

  @Prop({ type: String, default: 'http://jhsy-img.caizhu.com/empty-default.png' })
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
