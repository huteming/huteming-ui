import styled from 'vue-styled-components'
import ellipsis from '../mixins/ellipsis'
import { StyledComponents } from 'packages/ui-styles/types'
const rootSize = 16

const baseFont = (size: number, height: number) => {
  return styled('p', { lines: [Boolean, Number] })`
    font-size: ${size * rootSize}px;
    line-height: ${height};
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;

    ${(props: any) => props.lines && `
      height: ${Math.ceil(Number(props.lines) * height * size * rootSize)}px;
      ${ellipsis(Number(props.lines))};
    `}
  `
}

const h1 = baseFont(6, 1.167).extend`
  font-weight: 300;
  letter-spacing: -0.01562em;
`

const h2 = baseFont(3.75, 1.2).extend`
  font-weight: 300;
  letter-spacing: -0.00833em;
`

const h3 = baseFont(3, 1.167).extend`
  font-weight: 400;
  letter-spacing: 0em;
`

const h4 = baseFont(2.125, 1.235).extend`
  font-weight: 400;
  letter-spacing: 0.00735em;
`

const h5 = baseFont(1.5, 1.334).extend`
  font-weight: 400;
  letter-spacing: 0em;
`

const h6 = baseFont(1.25, 1.6).extend`
  font-weight: 500;
  letter-spacing: 0.0075em;
`

const subtitle1 = baseFont(1, 1.75).extend`
  font-weight: 400;
  letter-spacing: 0.00938em;
`

const subtitle2 = baseFont(0.875, 1.57).extend`
  font-weight: 500;
  letter-spacing: 0.00714em;
`

const body1 = baseFont(1, 1.5).extend`
  font-weight: 400;
  letter-spacing: 0.00938em;
`

const body2 = baseFont(0.875, 1.43).extend`
  font-weight: 400;
  letter-spacing: 0.01071em;
`

const button = baseFont(0.875, 1.75).extend`
  font-weight: 500;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
`

const caption = baseFont(0.75, 1.66).extend`
  font-weight: 400;
  letter-spacing: 0.03333em;
`

const overline = baseFont(0.75, 2.66).extend`
  font-weight: 400;
  letter-spacing: 0.08333em;
  text-transform: uppercase;
`

export default <StyledComponents>{
  typography: {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    body1,
    body2,
    subtitle1,
    subtitle2,
    button,
    caption,
    overline,
  },
}
