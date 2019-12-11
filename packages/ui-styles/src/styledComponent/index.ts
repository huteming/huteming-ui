import { createDecorator } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import Vue, { ComponentOptions } from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'
import withTheme from '../withTheme'
import withPropsState from '../withPropsState'
import styled, { css } from 'vue-styled-components'
import { PropsState, StyleProps, StyleCreater, StyleHelper } from '../../types'

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
        props.theme = withTheme(props.theme)
        return cssRules(props)
    }}`
}

const helper: StyleHelper = {
    autofit (px: number) {
        return document.documentElement.clientWidth / 750 * px
    },
}

export default function (styleCreater?: StyleCreater) {
    return (target: VueClass<Vue>) => {
        const styles: object | undefined = styleCreater && styleCreater(_styled, css, helper)
        const styledComponents: any = {}

        if (styles) {
            Object.entries(styles).forEach(([tagName, creater]: any[]) => {
                styledComponents[tagName] = typeof creater === 'function' ? creater() : creater
            })
        }

        target.prototype.styledComponents = styledComponents
    }
}
