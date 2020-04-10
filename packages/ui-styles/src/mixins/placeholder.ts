import { Theme } from 'packages/ui-styles/types'

export default function (theme: Theme) {
  const rule = `
    margin: ${theme.placeholder.margin};
    padding: 20px;
    color: ${theme.placeholder.color};
  `

  return `
    ::placeholder {
      opacity: 1;
      ${rule};
    }
    :-ms-input-placeholder {
      ${rule};
    }
    ::-ms-input-placeholder {
      ${rule};
    }
  `
}
