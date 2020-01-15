import { typography, styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('p', { gutterBottom: Boolean, variant: String, lines: [Boolean, Number] }, (props: StyleProps) => css`
  ${typography(props.variant, props.lines)};

  ${props.gutterBottom && `
    margin-bottom: .35em;
  `}
`)
