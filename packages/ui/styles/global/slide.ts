import { injectGlobal } from 'vue-styled-components'
import {
    transition_duration_normal_enter,
    transition_duration_normal_leave,
    transition_ease,
} from '../common/transition'

injectGlobal`
    .slide-up-enter,
    .slide-up-leave-to {
        transform: translateY(100%);
    }

    .slide-up-enter-active,
    .slide-down-enter-active,
    .slide-left-enter-active,
    .slide-right-enter-active {
        transition-duration: ${transition_duration_normal_enter};
    }

    .slide-up-leave-active,
    .slide-down-leave-active,
    .slide-left-leave-active,
    .slide-right-leave-active {
        transition-duration: ${transition_duration_normal_leave};
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
        transition-timing-function: ${transition_ease};
    }
`
