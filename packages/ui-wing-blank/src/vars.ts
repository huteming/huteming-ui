import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', { size: String }, (props: StyleProps) => css`
  position: relative;
  width: 100%;
  box-sizing: border-box;

  ${props.size === 'xs' && `
    padding-left: 10px;
    padding-right: 10px;
  `}

  ${props.size === 'sm' && `
    padding-left: 15px;
    padding-right: 15px;
  `}

  ${props.size === 'md' && `
    padding-left: 20px;
    padding-right: 20px;
  `}

  ${props.size === 'lg' && `
    padding-left: 25px;
    padding-right: 25px;
  `}

  ${props.size === 'xl' && `
    padding-left: 30px;
    padding-right: 30px;
  `}
`)
