import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Vue } from 'vue-property-decorator'
import { Root, Container } from './work'
const bem = createBEM('picker')

@DescribedComponent({
  name: 'TmPicker',
})
export default class Picker extends Vue {
  render () {
    return (
      <Root class={ bem() }>
        <Container class={ bem('container') }>
          { this.$slots.default }
        </Container>
      </Root>
    )
  }
}
