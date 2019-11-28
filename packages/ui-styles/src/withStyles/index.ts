import { Component } from 'vue-property-decorator'
import Vue, { ComponentOptions } from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'
import withTheme from '../withTheme'
import withPropsState from '../withPropsState'
import styled, { css } from 'vue-styled-components'
import { PropsState, StyleProps, StyleCreater, WithStyles, StyleHelper } from '../../types'

interface DomProps {
    state?: PropsState
    [key: string]: any
}

const _styled = (tagName: string, domProps: DomProps | Function, cssRules: Function) => {
    if (typeof domProps === 'function') {
        cssRules = domProps
        domProps = {}
    }
    // 每个组件注入共享状态 state
    domProps.state = withPropsState()

    return styled(tagName, domProps)`${(props: StyleProps) => {
        props.theme = Object.assign({}, withTheme(), props.theme)
        return cssRules(props)
    }}`
}

const helper: StyleHelper = {
    autofit (px: number) {
        return document.documentElement.clientWidth / 750 * px
    },
}

const withStyles: WithStyles = function wrapper<V extends Vue> (styleCreater: StyleCreater) {
    return function (CompConstructor: VueClass<V>, options: ComponentOptions<V> = {}) {
        const styles: object = styleCreater(_styled, css, helper)
        const styledDoms: any = {}
        Object.entries(styles).forEach(([tagName, creater]: any[]) => {
            styledDoms[tagName] = typeof creater === 'function' ? creater() : creater
        })
        CompConstructor.prototype.styledDoms = styledDoms
        CompConstructor.registName = options.name || CompConstructor.name

        return Component(options)(CompConstructor)
    }
}

export default withStyles
