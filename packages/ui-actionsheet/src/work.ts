import { styled, css, hairline } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Container = styled('div', (props: StyleProps) => `
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f2f2f2;
  z-index: ${props.state.zIndex};
`)

export const Header = styled('div', (props: StyleProps) => `
  position: relative;
  padding: 15px;
  font-size: 14px;
  line-height: 21px;
  color: #888;
  text-align: center;
  ${hairline(props.theme, 'bottom', '#ddd')};
  background-color: #fff;
`)

export const Menu = styled('div', { border: Boolean, spacing: Boolean }, (props: StyleProps) => css`
  ${props.border && hairline(props.theme, 'top', '#ddd')};
  margin-top: ${props.spacing ? '6px' : 0};
  position: relative;
  padding: 16px;
  font-size: 18px;
  line-height: 1;
  color: #000;
  text-align: center;
  cursor: pointer;
  background-color: #fff;
`)
