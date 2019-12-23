import { StyledComponent, ellipsis, DescribedComponent } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'

const styles = (styled: any, css: any) => {
  return {
    Root: styled('div', () => `
      position: relative;
      width: 335px;
      height: 114px;
      margin-left: auto;
      margin-right: auto;
      padding: 11px 20px 10px 110px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0px 6px 24px 0px rgba(69,125,193,0.14);
      border-radius: 8px;
      box-sizing: border-box;

      & + & {
        margin-top: 30px;
      }
    `),
    Poster: styled('div', () => `
      position: absolute;
      top: -10px;
      left: 10px;
      width: 85px;
      height: 114px;
      border-radius: 0 8px 8px 0;
      overflow: hidden;
    `),
    PosterImg: styled('img', () => `
      display: block;
      width: 100%;
      object-fit: contain;
    `),
    Title: styled('div', () => `
      font-size: 14px;
      line-height: 20px;
      color: #2C3349;
      font-weight: bold;
      ${ellipsis(2)}
    `),
    Footer: styled('div', () => `
      display: flex;
      align-items: flex-end;
    `),
    Tip: styled('div', () => `
      font-size: 10px;
      line-height: 15px;
      color: #C9CCD4;
    `),
    Decoration: styled('div', () => `
      flex: 1;
      margin-left: 5px;
      font-size: 12px;
      line-height: 15px;
      color: #B2BAC4;
      text-align: right;
      text-decoration: line-through;
    `),
    Btn: styled('div', () => `
      margin-left: 5px;
      font-size: 14px;
      line-height: 16px;
      color: #3A95FA;
      font-weight: bold;
    `),
  }
}

@DescribedComponent({
  name: 'TmPanel',
})
@StyledComponent(styles)
export default class Panel extends Vue {
  render () {
    const { Root, Poster, PosterImg, Title, Tip, Decoration, Btn, Footer } = this.styledComponents
    return (
      <Root class="tm-panel">
        <Poster class="tm-panel-poster">
          <PosterImg src={ this.poster } alt="" class="tm-panel-poster-img" />
          { this.$slots['poster-extra'] }
        </Poster>

        <Title class="tm-panel-title">
          { this.$slots.title || this.title }
        </Title>

        { this.$slots.default }

        <Footer>
          <Tip class="tm-panel-tip">{ this.tip }</Tip>

          <Decoration class="tm-panel-decoration">{ this.decoration }</Decoration>

          <Btn class="tm-panel-btn">
            { this.$slots.btn || this.btn }
          </Btn>
        </Footer>
      </Root>
    )
  }

  @Prop({ type: String, default: '' })
  poster!: string

  @Prop({ type: String, default: '' })
  title!: string

  @Prop({ type: String, default: '' })
  description!: string

  @Prop({ type: String, default: '' })
  tip!: string

  @Prop({ type: String, default: '' })
  decoration!: string

  @Prop({ type: String, default: '' })
  btn!: string
}
