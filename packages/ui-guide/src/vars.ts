import { styled, css } from 'packages/ui-styles/src/main'

export const Root = styled('div', () => `
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 9999;
`)

export const Container = styled('div', () => `
  position: absolute;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 0px 10000px;
`)

export const Line = styled('div', () => `
  position: absolute;
  top: -3px;
  left: -3px;
  bottom: -3px;
  right: -3px;
  border-radius: 11px;
  border: 3px dotted #fff;
  box-sizing: border-box;
`)
