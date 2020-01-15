import withPropsState from '../withPropsState'
import _styled from 'vue-styled-components'
import withTheme from '../withTheme'
import { ComponentProps, StyleProps } from '../../types'

function styled (tagName: string, cssRules: Function): any
function styled (tagName: string, componentProps: ComponentProps, cssRules: Function): any
function styled (tagName: string, componentProps: ComponentProps | Function, cssRules?: Function): any {
  if (typeof componentProps === 'function') {
    cssRules = componentProps
    componentProps = {}
  }
  // 每个组件注入共享状态 state
  componentProps.state = withPropsState()

  return _styled(tagName, componentProps)`${(props: StyleProps) => {
    props.theme = withTheme(props.theme)
    return (cssRules as Function)(props)
  }}`
}

export default styled
