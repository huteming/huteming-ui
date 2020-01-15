import withPropsState from '../withPropsState'
import styled from 'vue-styled-components'
import withTheme from '../withTheme'
import { ComponentProps, StyleProps } from '../../types'

export default function (tagName: string, domProps: ComponentProps | Function, cssRules: Function) {
  if (typeof domProps === 'function') {
    cssRules = domProps
    domProps = {}
  }
  // 每个组件注入共享状态 state
  domProps.state = withPropsState()

  return styled(tagName, domProps)`${(props: StyleProps) => {
    props.theme = withTheme(props.theme)
    return cssRules(props)
  }}`
}
