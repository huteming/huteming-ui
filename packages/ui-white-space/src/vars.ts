import { styled, css } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'

export const Root = styled('div', { size: String }, (props: StyleProps) => css`
  ${props.size === 'xs' && `
    height: 10px;
  `}
  ${props.size === 'sm' && `
    height: 15px;
  `}
  ${props.size === 'md' && `
    height: 20px;
  `}
  ${props.size === 'lg' && `
    height: 25px;
  `}
  ${props.size === 'xl' && `
    height: 30px;
  `}
`)
