import { styled, placeholder, css } from 'packages/ui-styles/src/main'

export const Root = styled('div', () => `
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`)

const BaseInput = styled('input', (props) => `
  display: block;
  flex: 1;
  margin: 0;
  padding: 0;
  font-size: ${props.theme.field.fontSize};
  line-height: ${props.theme.field.lineHeight};
  color: ${props.theme.field.color};
  background-color: transparent;
  border: 0;
  outline: 0;
  -webkit-tap-highlight-color: transparent;
  ${placeholder(props.theme)};
`)

export const Input = BaseInput.extend`
  // height: 1.41176471em;
  -webkit-appearance: none;
`

export const Textarea = BaseInput.withComponent('textarea').extend`
  resize: none;
`

export const Clear = styled('div', () => `
  margin-left: 7px;
  font-size: 15px;
  line-height: 1;
  color: #C1C1C1;
`)
