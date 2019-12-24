import { StyledComponent, DescribedComponent } from '@huteming/ui-styles/src/main'
import { Vue } from 'vue-property-decorator'

const styles = (styled: any, css: any) => ({
  Root: styled('div', () => `
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    transform: translateY(-100%);
    background: rgba(0, 0, 0, .3);
    box-sizing: border-box;
  `),
})

@DescribedComponent({
  name: 'TmCardPosterBar',
})
@StyledComponent(styles)
export default class CardPosterBar extends Vue {
  render () {
    const { Root } = this.styledComponents
    return (
      <Root class="tm-card-poster-bar">{ this.$slots.default }</Root>
    )
  }
}
