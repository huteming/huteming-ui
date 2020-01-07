import { StyledComponent, DescribedComponent, createBEM, hairline } from 'packages/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { StyleProps } from 'packages/ui-styles/types'
const bem = createBEM('tag')

const RootProps = {
  type: String,
  plain: Boolean,
  round: Boolean,
  size: String,
}
const mapColor: any = {
  default: 'colorDefault',
  primary: 'colorPrimary',
  success: 'colorSuccess',
  danger: 'colorDanger',
  warning: 'colorWarning',
}
const mapSize: any = {
  xs: 'sizeMini',
  sm: 'sizeSmall',
  md: 'sizeNormal',
}

const styles = (styled: any, css: any) => {
  return {
    Root: styled('div', RootProps, (props: StyleProps) => css`
      position: relative;
      display: inline-block;
      padding: .2em .5em;
      line-height: normal;
      box-sizing: border-box;

      font-size: ${(props.theme.font as any)[mapSize[props.size]]};
      color: ${(props.plain && (props.theme.tag as any)[mapColor[props.type]]) || props.theme.color.white};
      background-color: ${(!props.plain && (props.theme.tag as any)[mapColor[props.type]]) || props.theme.color.white};
      border-radius: ${props.round ? '999px' : '.2em'};

      ${hairline(props.theme, 'all', (props.theme.tag as any)[mapColor[props.type]])}
    `),
  }
}

@DescribedComponent({
  name: 'TmTag',
})
@StyledComponent(styles)
export default class Tag extends Vue {
  render () {
    const { Root } = this.styledComponents
    return (
      <Root type={ this.type } plain={ this.plain } round={ this.round } size={ this.size } class={ bem() }>
        { this.$slots.default }
      </Root>
    )
  }

  @Prop({
    type: String,
    default: 'default',
    validator (val) {
      return ['primary', 'success', 'danger', 'warning', 'default'].includes(val)
    },
  })
  type!: string

  @Prop({
    type: String,
    default: 'xs',
    validator (val) {
      return ['md', 'sm', 'xs'].includes(val)
    },
  })
  size!: string

  @Prop({ type: Boolean, default: false })
  plain!: boolean

  @Prop({ type: Boolean, default: false })
  round!: boolean
}
