import { injectGlobal } from 'vue-styled-components'
import {
    TransitionDurationFadeEnter,
    TransitionDurationFadeLeave,
    TransitionEase,
} from '../common/transition'

injectGlobal`
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active {
        transition-duration: ${TransitionDurationFadeEnter};
    }

    .fade-leave-active {
        transition-duration: ${TransitionDurationFadeLeave};
    }

    .fade-enter-active,
    .fade-leave-active {
        transition-property: opacity;
        transition-timing-function: ${TransitionEase};
    }
`
