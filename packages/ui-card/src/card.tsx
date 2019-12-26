import { StyledComponent, DescribedComponent } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { StyledComponents } from '@huteming/ui-styles/types'

const styles = (styled: any, css: any, components: StyledComponents) => {
  return {
    Root: styled('div', () => `
      position: relative;
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
    Title: styled(components.typography.subtitle2, () => `
      padding: 12px 8px 2px;
      color: #202631;
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
    const { Root, Title, Poster, Footer, Btn, Container } = this.styledComponents
    return (
      <Root class="tm-card">
        <Container class="tm-card-poster">
          <Poster src={ this.poster } />
        </Container>
        <Title lines={2} class="tm-card-title"><strong>{ this.title }</strong></Title>
        <Footer class="tm-card-footer">
          <Btn class="tm-card-btn">{ this.btn }</Btn>
        </Footer>
        { this.$slots.default }
      </Root>
    )
  }
}
