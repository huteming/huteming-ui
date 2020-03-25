import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { Root, Poster, PosterImg, Title, Tip, Decoration, Btn, Footer } from './vars'
const bem = createBEM('panel')

@DescribedComponent({
  name: 'Panel',
})
export default class Panel extends Vue {
  render () {
    return (
      <Root class={ bem() }>
        <Poster class={ bem('poster') }>
          <PosterImg src={ this.poster } alt="" class={ bem('poster-img') } />
          { this.$slots['poster-extra'] }
        </Poster>

        <Title class={ bem('title') }>
          { this.$slots.title || this.title }
        </Title>

        { this.$slots.default }

        <Footer>
          <Tip class={ bem('tip') }>{ this.tip }</Tip>

          <Decoration class={ bem('decoration') }>{ this.decoration }</Decoration>

          <Btn class={ bem('btn') }>
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
