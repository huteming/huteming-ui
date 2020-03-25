import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', { zIndex: String }, (props: StyleProps) => `
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props.theme.loading.background};
  z-index: ${props.zIndex};
`)

export const Icon = styled('div', (props: StyleProps) => `
  font-size: 25px;
  color: ${props.theme.loading.colorIcon};
`)

export const Content = styled('div', () => `
  height: 100%;
  max-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`)

export const Text = styled('div', (props: StyleProps) => `
  margin-top: 3px;
  color: ${props.theme.loading.colorText};
`)
