import { css } from 'vue-styled-components'

export default function (cssRule: object) {
    const rule = css(cssRule)

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
