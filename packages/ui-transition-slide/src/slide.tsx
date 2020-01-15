import Vue from 'vue'
import anime from 'animejs'
import { SlideDirection } from '../types'
import * as tsx from 'vue-tsx-support'
import { mergeListeners } from 'utils/tools'

export default tsx.componentFactory.create({
  functional: true,
  props: {
    enterDirection: {
      type: String,
      default: 'bottom',
    },
    leaveDirection: {
      type: String,
      default: 'bottom',
    },
  },

  render (createElement, context) {
    const enterDirection = context.props.enterDirection as SlideDirection
    const leaveDirection = context.props.leaveDirection as SlideDirection
    const data = {
      props: {
        css: false,
        name: 'tm-transition-slide',
        // mode: 'out-in'
      },
      on: {
        beforeEnter: mergeListeners(context, 'before-enter', (el: HTMLElement) => {
          const mapTranslateX = {
            top: '0',
            bottom: '0',
            left: '-100%',
            right: '100%',
          }
          const mapTranslateY = {
            top: '-100%',
            bottom: '100%',
            left: '0',
            right: '0',
          }
          el.style.transform = `translateX(${mapTranslateX[enterDirection]}) translateY(${mapTranslateY[enterDirection]})`
        }),
        enter (el: HTMLElement, done: Function) {
          anime({
            targets: el,
            translateX: 0,
            translateY: 0,
            duration: 250,
            easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
            complete (anim) {
              done()
            },
          })
        },
        afterEnter: mergeListeners(context, 'after-enter', (el: HTMLElement) => {
          el.style.transform = ''
        }),

        beforeLeave: mergeListeners(context, 'before-leave', (el: HTMLElement) => {
          el.style.transform = `translateX(0) translateY(0)`
        }),
        leave (el: HTMLElement, done: Function) {
          const mapTranslateX = {
            top: '0',
            bottom: '0',
            left: '-100%',
            right: '100%',
          }
          const mapTranslateY = {
            top: '-100%',
            bottom: '100%',
            left: '0',
            right: '0',
          }
          anime({
            targets: el,
            translateX: mapTranslateX[leaveDirection],
            translateY: mapTranslateY[leaveDirection],
            duration: 200,
            easing: 'cubicBezier(0.4, 0.0, 0.2, 1)',
            complete (anim) {
              done()
            },
          })
        },
        afterLeave: mergeListeners(context, 'after-leave', (el: HTMLElement) => {
          el.style.transform = ''
        }),
      },
    }
    return createElement('transition', data, context.children)
  },
})
