import anime from 'animejs'
import * as tsx from 'vue-tsx-support'
import { mergeListeners } from 'ui/utils/tools'
import { RenderContext } from 'vue'

export default tsx.componentFactory.create({
  functional: true,
  props: {
  },

  render (createElement, context: RenderContext) {
    const data = {
      props: {
        css: false,
        name: 'tm-transition-fade',
      },
      on: {
        beforeEnter: mergeListeners(context, 'before-enter', (el: HTMLElement) => {
          el.style.opacity = '0'
        }),
        enter (el: HTMLElement, done: Function) {
          anime({
            targets: el,
            opacity: '1',
            duration: 150,
            easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
            complete (anim) {
              done()
            },
          })
        },
        afterEnter: mergeListeners(context, 'after-enter', (el: HTMLElement) => {
          el.style.opacity = ''
        }),

        beforeLeave: mergeListeners(context, 'before-leave', (el: HTMLElement) => {
          el.style.opacity = '1'
        }),
        leave (el: HTMLElement, done: Function) {
          anime({
            targets: el,
            opacity: '0',
            duration: 75,
            easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
            complete (anim) {
              done()
            },
          })
        },
        afterLeave: mergeListeners(context, 'after-leave', (el: HTMLElement) => {
          el.style.opacity = ''
        }),
      },
    }
    return createElement('transition', data, context.children)
  },
})
