import { styled, css, hairline } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`)

export const Wrap = styled('div', () => `
  width: 315px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`)

export const Container = styled('div', () => `
  padding: 20px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`)

export const Title = styled('div', () => `
  font-size: 18px;
  line-height: 25px;
  color: rgba(0, 0, 0, 1);
  font-weight: 400;
`)
export const Subtitle = styled('div', { isTop: Boolean }, (props: StyleProps) => css`
  margin-top: ${!props.isTop && '9px'};
  font-size: 16px;
  line-height: 24px;
  color: rgba(93, 93, 103, 1);
  font-weight: 400;
`)
export const Field = styled('div', { isTop: Boolean }, (props: StyleProps) => css`
  width: 100%;
  margin-top: ${!props.isTop && '9px'};
`)

export const FieldInput = styled('input', () => `
  width: 100%;
  padding: 11px 12px;
  color: #bbb;
  font-size: 14px;
  line-height: 14px;
  background: rgba(255,255,255,1);
  border-radius: 8px;
  border: 1px solid rgba(221,221,221,1);
  outline: none;
  appearance: none;
  -webkit-user-modify: read-write-plaintext-only;
  box-sizing: border-box;

  &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    font-size: 14px;
    line-height: 1.4;
    color: #bbb;
  }
`)

export const Footer = styled('div', (props: StyleProps) => `
  position: relative;
  display: flex;
  align-items: center;
  ${hairline(props.theme, 'top', 'rgba(227, 227, 227, 1)')};
`)

export const FooterBtn = styled('div', { isCancel: Boolean, isConfirm: Boolean, isHighlight: Boolean }, (props: StyleProps) => css`
  flex: 1;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  line-height: 24px;
  font-weight: ${props.isHighlight && 'bold'};

  ${props.isCancel && `
    position: relative;
    color: rgba(32, 38, 49, 1);
    ${hairline(props.theme, 'right', 'rgba(227, 227, 227, 1)')};
  `}

  ${props.isConfirm && `
    color: rgba(58, 149, 250, 1);
  `}
`)
