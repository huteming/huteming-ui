import { styled, css, ellipsis } from 'packages/ui-styles'

const RootProps = {
  container: Boolean,

  direction: String,
  wrap: String,
  justify: String,
  align: String,
  alignContent: String,

  alignSelf: String,
  order: Number,
  grow: Number,
  shrink: Number,
  basis: String,
  gutter: String,
  ellipsis: [Number, Boolean],
}

export const Root = styled('div', RootProps, (props) => css`
  ${props.container && `
    display: flex;
  `}
  flex-flow: ${props.direction} ${props.wrap};
  align-items: ${props.align};
  align-content: ${props.alignContent};
  justify-content: ${props.justify};

  align-self: ${props.alignSelf};
  order: ${props.order};
  flex: ${props.grow} ${props.shrink} ${props.basis};

  margin: ${props.gutter};
  ${props.ellipsis && ellipsis(typeof props.ellipsis === 'number' ? props.ellipsis : 1)}
`)
