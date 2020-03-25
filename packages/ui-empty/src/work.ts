import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`)

export const Container = styled('div', () => `
  height: 100px;
  margin-bottom: 9px;

  img {
    height: 100%;
    vertical-align: middle;
    border-style: none;
  }
`)

export const Description = styled('div', () => `
  font-size: 16px;
  line-height: 22px;
  color: rgba(178, 186, 196, 1);
`)
