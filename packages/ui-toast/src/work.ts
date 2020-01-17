import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', { position: String, zIndex: String }, (props: StyleProps) => css`
  position: fixed;
  max-width: 225px;
  padding: 8px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  box-sizing: border-box;
  z-index: ${props.zIndex};

  ${props.position === 'top' && `
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  `}

  ${props.position === 'middle' && `
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `}

  ${props.position === 'bottom' && `
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  `}
`)

export const Icon = styled('div', { hasText: Boolean }, (props: StyleProps) => `
  order: 1;
  font-size: ${props.hasText ? '50px' : '25px'};
`)

export const Text = styled('div', () => `
  order: 2;
  font-size: 14px;
  line-height: 21px;
`)
