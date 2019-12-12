import { ellipsis, StyledComponent, DescribedComponent } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'

const styles = (styled: any, css: any) => {
  return {
    Root: styled('div', () => `
      width: 160px;
      padding-bottom: 6px;
      background: #fff;
      border-radius: 8px;
      box-sizing: border-box;
      overflow: hidden;
    `),
    Container: styled('div', () => `
      position: relative;
      width: 100%;
      height: 120px;
    `),
    Poster: styled('img', () => `
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    `),
    PosterDesc: styled('div', () => `
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `),
    Title: styled('div', () => `
      min-height: 54px;
      padding: 12px 8px 2px;
      font-size: 14px;
      line-height: 20px;
      color: #202631;
      font-weight: bold;
      box-sizing: border-box;
      ${ellipsis(2)};
    `),
    Footer: styled('div', () => `
      padding: 0 10px;
      display: flex;
      justify-content: flex-end;
    `),
    Btn: styled('div', () => `
      font-size: 14px;
      line-height: 20px;
      color: #3A95FA;
      font-weight: bold;
    `),
  }
}

@DescribedComponent({
  name: 'TmCard',
})
@StyledComponent(styles)
export default class Card extends Vue {
  @Prop({ type: String, default: '' })
  poster!: string

  @Prop({ type: String, default: '' })
  title!: string

  @Prop({ type: String, default: '' })
  btn!: string

  render () {
    const { Root, Title, Poster, Footer, Btn, Container, PosterDesc } = this.styledComponents
    return (
      <Root class="tm-card">
        <Container>
          <Poster src={ this.poster } />
          { this.$slots.default && <PosterDesc>{ this.$slots.default }</PosterDesc> }
        </Container>
        <Title>{ this.title }</Title>
        <Footer>
        <Btn>{ this.btn }</Btn>
        </Footer>
      </Root>
    )
  }
}
