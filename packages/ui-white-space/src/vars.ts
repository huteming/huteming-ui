import { styled, css } from 'packages/ui-styles/src/main'

export const Root = styled('div', { size: String }, (props) => css`
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
