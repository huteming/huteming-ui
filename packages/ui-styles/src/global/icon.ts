import { injectGlobal } from 'vue-styled-components'

injectGlobal`
    @impor url(//at.alicdn.com/t/font_1301011_f8zmdjt44d.css);

    .tm-icon {
        display: inline-block;
        font-size: inherit;
        // line-height: inherit;
        line-height: 1.2;
        color: inherit;
    
        &-loading {
            animation: loading 2.3s linear infinite;
        }
    }
    
    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
    
        to {
            transform: rotate(1turn);
        }
    }
`
