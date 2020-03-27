import withPropsState from '../withPropsState'
import _styled from 'vue-styled-components'
import withTheme from '../withTheme'
import { ComponentProps, StyleProps, CssRules } from '../../types'
import { noop } from 'utils/tools'

function styled (tagName: string, cssRules: CssRules): any
function styled (tagName: string, componentProps: ComponentProps, cssRules: CssRules): any
function styled (tagName: string, componentProps: ComponentProps | CssRules, cssRules: CssRules = noop): any {
  if (typeof componentProps === 'function') {
    cssRules = componentProps
    componentProps = {}
  }
  // 每个组件注入共享状态 state
  componentProps.state = withPropsState()

  return _styled(tagName, componentProps)`${(props: StyleProps) => {
    props.theme = withTheme(props.theme)
    return cssRules(props)
  }}`
}

export default styled
