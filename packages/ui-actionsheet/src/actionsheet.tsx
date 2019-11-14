import MixinsModal from 'packages/ui-modal/index'
import { Mixins, Component } from 'vue-property-decorator'
import { ActionsheetMenu } from '../types/index'
import { useZindex, hairline, withTheme } from '@huteming/ui-styles'
import styled from 'vue-styled-components'

const Container = styled('div')`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${useZindex()};
    background-color: #f2f2f2;
`

const Header = styled.div`
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

const Menu = styled('div', MenuProps)`
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

@Component({
    name: 'TmActionsheet',
})
export default class TmActionsheet extends Mixins(MixinsModal) {
    render () {
        return (
            <transition name="slide-up" on-after-leave={ this.handleAfterLeave }>
                <Container v-show={ this.visible } class="tm-actionsheet">
                    {
                        this.title
                            ? <Header>{ this.title }</Header>
                            : null
                    }

                    {
                        this.normalizedMenu.map((item, index) => {
                            return (
                                <Menu
                                    key={ item.value }
                                    cancel={ item.label === this.cancelText }
                                    border={ index > 0 }
                                    on-click={ this.handleClickMenu.bind(this, item.value) }>
                                    <span>{ item.label }</span>
                                </Menu>
                            )
                        })
                    }
                </Container>
            </transition>
        )
    }

    get normalizedMenu (): ActionsheetMenu[] {
        const res = this.menus.concat()
        if (this.cancelText) {
            res.push({
                label: this.cancelText,
                value: '',
            })
        }
        return res
    }

    handleClickMenu (actionValue: any) {
        this.close(actionValue)
    }

    handleClickModal () {
        if (this.closeOnClickModal) {
            this.close()
        }
    }

    handleAfterLeave () {
        this.destroyElement()
    }

    open () {
        this.$_openModal({
            callbackClick: this.handleClickModal,
        })

        // 必须在调用 openModal 之后
        // 为了获取动态 zindex
        this.visible = true
    }

    close (actionValue?: any) {
        this.$_closeModal()
        this.visible = false

        actionValue ? this.resolve(actionValue) : this.reject()
    }

    destroyElement () {
        this.$destroy()
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    }

    visible: boolean = false
    resolve!: Function
    reject!: Function

    title: string = ''
    menus: ActionsheetMenu[] = []
    cancelText: string = '取消'
    closeOnClickModal: boolean = true
}
