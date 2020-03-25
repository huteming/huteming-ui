import { DescribedComponent } from '@huteming/ui-styles/src/main'
import { Vue } from 'vue-property-decorator'
import { PosterBarRoot } from './work'

@DescribedComponent({
  name: 'CardPosterBar',
})
export default class CardPosterBar extends Vue {
  render () {
    return (
      <PosterBarRoot class="tm-card-poster-bar">{ this.$slots.default }</PosterBarRoot>
    )
  }
}
