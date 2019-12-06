import { injectGlobal } from 'vue-styled-components'
import {
    TransitionDurationNormalEnter,
    TransitionDurationFadeLeave,
    TransitionEase,
} from '../common/transition'

injectGlobal`
    .dialog-enter {
        transform: translate(-50%, calc(-100% - 50vh));
    }

    .dialog-leave-to {
        opacity: 0;
    }

    .dialog-enter-active,
    .dialog-leave-active {
        transition-timing-function: ${TransitionEase};
    }

    .dialog-enter-active {
        transition-duration: ${TransitionDurationNormalEnter};
    }

    .dialog-leave-active {
        transition-duration: ${TransitionDurationFadeLeave};
    }
`
