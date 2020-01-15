import { injectGlobal } from 'vue-styled-components'
import {
  TransitionDurationFadeEnter,
  TransitionDurationFadeLeave,
  TransitionEaseInOut,
} from '../common/transition'

/**
 * name: zoom-in
 * 描述: 进入时放大，弹出时没有缩小动画
 */
injectGlobal`
  .zoom-in-enter {
    transform: scale(.8);
    opacity: 0;
  }

  .zoom-in-leave-to {
    opacity: 0;
  }

  .zoom-in-enter-active {
    transition-duration: ${TransitionDurationFadeEnter};
  }

  .zoom-in-leave-active {
    transition-duration: ${TransitionDurationFadeLeave};
  }

  .zoom-in-enter-active,
  .zoom-in-leave-active {
    transition-property: all;
    transition-timing-function: ${TransitionEaseInOut};
  }
`
