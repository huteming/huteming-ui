import { styled } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Container = styled('div', (props: StyleProps) => `
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props.theme.modal.background};
`)
