import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { Root, Title, Poster, Footer, Btn, Container } from './work'
const bem = createBEM('card')

@DescribedComponent({
  name: 'Card',
})
export default class Card extends Vue {
  @Prop({ type: String, default: '' })
  poster!: string

  @Prop({ type: String, default: '' })
  title!: string

  @Prop({ type: String, default: '' })
  btn!: string

  render () {
    return (
      <Root class={ bem() }>
        <Container class={ bem('poster') }>
          <Poster src={ this.poster } />
        </Container>
        <Title lines={2} class={ bem('title') }><strong>{ this.title }</strong></Title>
        <Footer class={ bem('footer') }>
          <Btn class={ bem('btn') }>{ this.btn }</Btn>
        </Footer>
        { this.$slots.default }
      </Root>
    )
  }
}
