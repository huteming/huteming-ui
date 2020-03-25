
import { Vue, Prop } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Root, Header, Body, Footer, Link } from './work'
const bem = createBEM('cell')

@DescribedComponent({
  name: 'Cell',
})
export default class Cell extends Vue {
  render () {
    const DomHeader = (() => {
      const _content = this.$slots.header || this.header
      if (_content) {
        return <Header ref="header">{ _content }</Header>
      }
    })()
    const DomBody = (() => {
      const _content = this.$slots.body || this.body
      if (_content) {
        return <Body ref="body">{ _content }</Body>
      }
    })()
    const DomFooter = (() => {
      const _content = this.$slots.default || this.footer
      if (_content) {
        return <Footer ref="footer">{ _content }</Footer>
      }
    })()
    const DomLink = (() => {
      if (this.link) {
        return <Link ref="link"></Link>
      }
    })()

    return (
      <Root class={ bem() }>
        { DomHeader }
        { DomBody }
        { DomFooter }
        { DomLink }
      </Root>
    )
  }

  @Prop({ type: String })
  header: string | undefined

  @Prop({ type: String })
  body: string | undefined

  @Prop({ type: String })
  footer: string | undefined

  @Prop({ type: Boolean })
  link: boolean | undefined
}
