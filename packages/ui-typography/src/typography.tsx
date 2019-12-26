import { StyledComponent, DescribedComponent } from 'packages/ui-styles/src/main'
import { StyleProps, StyledComponents } from 'packages/ui-styles/types'
import { Vue, Prop } from 'vue-property-decorator'

const styles = (styled: any, css: any, components: StyledComponents) => {
  const rootSize = 16
  const mapVariant: any = {
    h1: `
      font-size: ${6 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 300;
      line-height: 1.167;
      letter-spacing: -0.01562em;
    `,
    h2: `
      font-size: ${3.75 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 300;
      line-height: 1.2;
      letter-spacing: -0.00833em;
    `,
    h3: `
      font-size: ${3 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.167;
      letter-spacing: 0em;
    `,
    h4: `
      font-size: ${2.125 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.235;
      letter-spacing: 0.00735em;
    `,
    h5: `
      font-size: ${1.5 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.334;
      letter-spacing: 0em;
    `,
    h6: `
      font-size: ${1.25 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
    `,
    subtitle1: `
      font-size: ${1 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.75;
      letter-spacing: 0.00938em;
    `,
    subtitle2: `
      font-size: ${0.875 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      line-height: 1.57;
      letter-spacing: 0.00714em;
    `,
    body1: `
      font-size: ${1 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.00938em;
    `,
    body2: `
      font-size: ${0.875 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.43;
      letter-spacing: 0.01071em;
    `,
    button: `
      font-size: ${0.875 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
    `,
    caption: `
      font-size: ${0.75 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.66;
      letter-spacing: 0.03333em;
    `,
    overline: `
      font-size: ${0.75 * rootSize}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 2.66;
      letter-spacing: 0.08333em;
      text-transform: uppercase;
    `,
  }

  return {
    Root: styled('div', { gutterBottom: Boolean, variant: String }, (props: StyleProps) => css`
      ${mapVariant[props.variant]}

      ${props.gutterBottom && `
        margin-bottom: .35em;
      `}
    `),
  }
}

@DescribedComponent({
  name: 'TmTypography',
})
@StyledComponent(styles)
export default class Typography extends Vue {
  render () {
    const { Root } = this.styledComponents
    return (
      <Root gutterBottom={ this.gutterBottom } variant={ this.variant } class="tm-typography">{ this.$slots.default }</Root>
    )
  }

  /**
   * 字体类型
   * https://material.io/design/typography/the-type-system.html#applying-the-type-scale
   */
  @Prop({
    type: String,
    default: 'body1',
    validator (val) {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline', 'inherit'].includes(val)
    },
  })
  variant!: string

  @Prop({ type: Boolean, default: false })
  gutterBottom!: boolean
}
