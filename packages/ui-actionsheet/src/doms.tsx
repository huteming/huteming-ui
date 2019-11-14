import styled from 'vue-styled-components'
import { useZindex, hairline, withTheme } from '@huteming/ui-styles'

export const Container = styled('div')`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${useZindex()};
    background-color: #f2f2f2;
`

export const Header = styled.div`
    padding: .3rem;
    font-size: 14px;
    line-height: 21px;
    color: #888;
    text-align: center;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
`

const MenuProps = {
    cancel: Boolean,
    border: Boolean,
}

export const Menu = styled('div', MenuProps)`
    ${(props: any) => props.border && !props.cancel && hairline(withTheme(props.theme), 'top', '#ddd')};
    margin-top: ${(props: any) => props.cancel ? '6px' : 0};
    position: relative;
    padding: .32rem;
    font-size: 18px;
    line-height: 1;
    color: #000;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
`
