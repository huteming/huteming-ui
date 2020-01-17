import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid rgba(246, 246, 247, 1);
`)

export const Title = styled('div', () => `
  flex-shrink: 0;
  font-size: 18px;
  line-height: 25px;
  color: rgba(32, 38, 49, 1);
`)

export const Action = styled('div', { type: String }, (props: StyleProps) => css`
  flex: 1;
  padding-top: 18px;
  padding-bottom: 18px;
  font-size: 15px;
  line-height: 21px;

  ${props.type === 'confirm' && `
    padding-right: 20px;
    color: rgba(58, 149, 250, 1);
    text-align: right;
  `}

  ${props.type === 'cancel' && `
    padding-left: 20px;
    color: rgba(142, 146, 150, 1);
  `}
`)
