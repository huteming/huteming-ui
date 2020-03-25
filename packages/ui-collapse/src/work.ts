import { styled, css, hairline } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  width: 100%;
  box-sizing: border-box;
`)

export const ItemRoot = styled('div', (props: StyleProps) => css`
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  & + & {
    ${hairline(props.theme, 'top', 'rgb(214, 214, 214)', { left: '18px', right: '18px' })};
  }
`)

export const Header = styled('div', () => `
  position: relative;
  width: 100%;
  height: 52px;
  padding: 0 18px 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 2;
`)

export const Title = styled('div', { disabled: Boolean }, (props: StyleProps) => `
  font-size: 16px;
  line-height: 52px;
  color: ${props.disabled ? 'rgba(142, 146, 150, 1)' : 'rgba(32, 38, 49, 1)'};
  font-weight: bold;
`)

export const Icon = styled('div', { active: Boolean, disabled: Boolean }, (props: StyleProps) => css`
  font-size: ${props.disabled ? '18px' : '15px'};
  color: ${props.disabled ? '#C9CCD4' : 'rgba(142, 146, 150, 1)'};
  transition: transform 100ms cubic-bezier(0.4, 0.0, 0.2, 1);
  transform: ${props.active && !props.disabled && 'rotate(90deg)'};
`)

export const Wrap = styled('div', () => `
  position: relative;
  will-change: height;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 1;
`)

export const Content = styled('div', () => `
  font-size: 13px;
  color: #303133;
  line-height: 1.769230769230769;
`)
