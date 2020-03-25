import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('label', { disabled: Boolean }, (props: StyleProps) => css`
  position: relative;
  display: block;
  ${props.disabled && `
    opacity: .3;
  `}
`)

export const Core = styled('div', { checked: Boolean }, (props: StyleProps) => css`
  position: relative;
  width: 52px;
  height: 32px;
  border: 2px solid #d9d9d9;
  border-radius: 16px;
  background: #d9d9d9;
  box-sizing: border-box;

  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fdfdfd;
    border-radius: 15px;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }

  &::after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }

  ${props.checked && `
    border-color: #409eff;
    background-color: #409eff;

    &::before {
      transform: scale(0);
    }

    &::after {
      transform: translateX(20px);
    }
  `}
`)
