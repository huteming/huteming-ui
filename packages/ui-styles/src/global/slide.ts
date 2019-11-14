import { injectGlobal } from 'vue-styled-components'
import {
    TransitionDurationNormalEnter,
    TransitionDurationNormalLeave,
    TransitionEase,
} from '../common/transition'

injectGlobal`
    .slide-up-enter,
    .slide-up-leave-to {
        transform: translateY(100%);
    }

    .slide-down-enter,
    .slide-down-leave-to {
        transform: translateY(-100%);
    }

    .slide-left-enter,
    .slide-left-leave-to {
        transform: translateX(-100%);
    }

    .slide-right-enter,
    .slide-right-leave-to {
        transform: translateX(100%);
    }

    .slide-up-enter-active,
    .slide-down-enter-active,
    .slide-left-enter-active,
    .slide-right-enter-active {
        transition-duration: ${TransitionDurationNormalEnter};
    }

    .slide-up-leave-active,
    .slide-down-leave-active,
    .slide-left-leave-active,
    .slide-right-leave-active {
        transition-duration: ${TransitionDurationNormalLeave};
    }

    .slide-up-enter-active,
    .slide-up-leave-active,
    .slide-down-enter-active,
    .slide-down-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition-property: transform;
        transition-timing-function: ${TransitionEase};
    }
`
