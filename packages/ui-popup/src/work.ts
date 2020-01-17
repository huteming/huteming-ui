import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', { position: String }, (props: StyleProps) => css`
  position: fixed;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  ${props.position === 'middle' && `
      left: 50%;
      transform: translate(-50%, 10px);
      width: 200px;
      padding: 10px;
      border-radius: 8px;
      background: #fff;

      &::before {
        display: inline-block;
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 10px;
        border-bottom-color: #fff;
        content: "";
        position: absolute;
        top: -20px;
        right: 50px;
      }
  `}

  ${props.position === 'top' && `
    top: 0;
    left: 0;
    right: 0;
    padding: 8px;
    font-size: 14px;
    line-height: 1.8;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, .7);
  `}

  ${props.position === 'bottom' && `
    left: 0;
    right: 0;
    bottom: 0;
  `}

  ${props.position === 'left' && `
    top: 0;
    bottom: 0;
    left: 0;
    width: 300px;
  `}

  ${props.position === 'right' && `
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `}
`)
