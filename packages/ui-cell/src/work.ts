import { styled, css, hairline } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', (props: StyleProps) => `
  position: relative;
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  font-size: 17px;
  line-height: 1.41176471;
  background: #fff;
  box-sizing: border-box;
  & + & {
    ${hairline(props.theme, 'top', 'rgba(0, 0, 0, 0.1)', { left: '16px' })};
  }
`)

export const Header = styled('div', () => `
  width: 105px;
  word-wrap: break-word;
  word-break: break-all;
`)

export const Body = styled('div', () => `
  flex: 1;
`)

export const Footer = styled('div', () => `
  color: rgba(0, 0, 0, 0.5);
  text-align: right;
`)

export const Link = styled('div', () => css`
  position: relative;
  margin-left: 14px;
  width: 14.2px;
  height: 14.2px;

  &:after {
    content: ' ';
    position: absolute;
    top: 50%;
    margin-top: -5px;
    height: 8px;
    width: 8px;
    border-width: 2px 2px 0 0;
    border-color: #B2B2B2;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  }
`)
