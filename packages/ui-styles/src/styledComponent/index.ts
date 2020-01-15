import Vue from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'
import styled from '../styled'
import { css } from 'vue-styled-components'
import helper from './helper'
import { StyleCreater } from '../../types'

export default function (styleCreater?: StyleCreater) {
  return (target: VueClass<Vue>) => {
    const styles: object | undefined = styleCreater && styleCreater(styled, css, helper)
    const styledComponents: any = {}

    if (styles) {
      Object.entries(styles).forEach(([tagName, creater]: any[]) => {
        styledComponents[tagName] = typeof creater === 'function' ? creater() : creater
      })
    }

    target.prototype.styledComponents = styledComponents
  }
}
