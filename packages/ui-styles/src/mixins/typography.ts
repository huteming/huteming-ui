import ellipsis from './ellipsis'
import { css } from 'vue-styled-components'
const rootSize = 16

const baseFont = (size: number, height: number, preset = '') => {
  return (lines: boolean | number) => {
    return css`
      ${preset};
      font-size: ${size * rootSize}px;
      line-height: ${height};
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;

      ${lines && `
        height: ${Math.ceil(Number(lines) * height * size * rootSize)}px;
        ${ellipsis(Number(lines))};
      `}
    `
  }
}

const maps = new Map([
  [
    'h1', baseFont(6, 1.167, `
      font-weight: 300;
      letter-spacing: -0.01562em;
    `),
  ],
  [
    'h2', baseFont(3.75, 1.2, `
      font-weight: 300;
      letter-spacing: -0.00833em;
    `),
  ],
  [
    'h3', baseFont(3, 1.167, `
      font-weight: 400;
      letter-spacing: 0em;
    `),
  ],
  [
    'h4', baseFont(2.125, 1.235, `
      font-weight: 400;
      letter-spacing: 0.00735em;
    `),
  ],
  [
    'h5', baseFont(1.5, 1.334, `
      font-weight: 400;
      letter-spacing: 0em;
    `),
  ],
  [
    'h6', baseFont(1.25, 1.6, `
      font-weight: 500;
      letter-spacing: 0.0075em;
    `),
  ],
  [
    'subtitle1', baseFont(1, 1.75, `
      font-weight: 400;
      letter-spacing: 0.00938em;
    `),
  ],
  [
    'subtitle2', baseFont(0.875, 1.57, `
      font-weight: 500;
      letter-spacing: 0.00714em;
    `),
  ],
  [
    'body1', baseFont(1, 1.5, `
      font-weight: 400;
      letter-spacing: 0.00938em;
    `),
  ],
  [
    'body2', baseFont(0.875, 1.43, `
      font-weight: 400;
      letter-spacing: 0.01071em;
    `),
  ],
  [
    'button', baseFont(0.875, 1.75, `
      font-weight: 500;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
    `),
  ],
  [
    'caption', baseFont(0.75, 1.66, `
      font-weight: 400;
      letter-spacing: 0.03333em;
    `),
  ],
  [
    'overline', baseFont(0.75, 2.66, `
      font-weight: 400;
      letter-spacing: 0.08333em;
      text-transform: uppercase;
    `),
  ],
])

export default function (type: string, lines: boolean | number = false) {
  const font = maps.get(type)
  return font ? font(lines) : ''
}
