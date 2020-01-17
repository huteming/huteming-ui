import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 32px;
  color: rgba(255, 255, 255, 1);
  font-weight: 500;
  letter-spacing: .7px;
  background: rgba(87, 180, 244, 1);
  overflow: hidden;
  box-sizing: border-box;
`)

export const Icon = styled('div', () => `
  margin-left: 10px;
`)

export const Action = styled('div', () => `
  padding-right: 8px;
`)

export const Content = styled('div', { isTop: Boolean }, (props: StyleProps) => css`
  flex: 1;
  margin-right: 15px;
  margin-left: 10px;
  overflow: hidden;
  margin-left: ${!props.isTop && '5px'};
`)

export const Wrap = styled('div', () => `
  position: relative;
  display: inline-block;
  white-space: nowrap;
`)
