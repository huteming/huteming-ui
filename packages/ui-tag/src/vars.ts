import { styled, css, hairline } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

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

export const Root = styled('div', RootProps, (props: StyleProps) => css`
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
`)
