import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  display: flex;
  align-items: center;
`)

export const Content = styled('div', { disabled: Boolean }, (props: StyleProps) => css`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  opacity: ${props.disabled && '.5'};
`)

export const Progress = styled('div', () => `
  margin-right: -7px;
  padding-right: 7px;
  background: #2A73FD;
  border-radius: 2px 0 0 2px;
  box-sizing: content-box;
  z-index: 1;
`)

export const Finger = styled('div', () => `
  flex: 0 0 auto;
  z-index: 2;
  margin: -20px;
  padding: 20px;
`)

export const Thumb = styled('div', () => `
  width: 10px;
  height: 10px;
  background: #2A73FD;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: move;
`)

export const Runway = styled('div', () => `
  flex: 1;
  margin-left: -7px;
  background: rgba(247, 247, 247, 1);
  border-radius: 0 2px 2px 0;
  box-sizing: content-box;
  z-index: 1;
`)

export const Min = styled('div', () => `
  margin-right: 4px;
`)

export const Max = styled('div', () => `
  margin-left: 4px;
`)
