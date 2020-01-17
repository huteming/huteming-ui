import { styled, placeholder } from 'packages/ui-styles/src/main'

const BaseInput = styled('input', () => `
  display: block;
  flex: 1;
  margin: 0;
  padding: 0;
  font-size: inherit;
  line-height: 1.41176471;
  color: inherit;
  background-color: transparent;
  border: 0;
  outline: 0;
  -webkit-tap-highlight-color: transparent;
`)

export const Root = styled('div', () => `
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  ${placeholder`
    margin: 0;
    padding: 0;
    color: rgba(178, 186, 196, 1);
  `}
`)

export const Input = BaseInput.extend`
  height: 1.41176471em;
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
