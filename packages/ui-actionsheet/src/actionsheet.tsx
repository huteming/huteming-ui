import MixinsModal from 'packages/ui-modal/index'
import zindexManager from 'ui/utils/zindex-manager'
import { Mixins, Component } from 'vue-property-decorator'
import { IMenu } from '../types/index'
import styled from 'vue-styled-components'
import 'ui/styles/global/slide'

@Component({
    name: 'TmActionsheet',
})
export default class TmActionsheet extends Mixins(MixinsModal) {
    render () {
        const DomContainer = styled.div`
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: ${this.zIndex};
            background-color: #fff;
        `
        const DomTitle = styled.div`
            padding: .3rem;
            font-size: 14px;
            line-height: 21px;
            color: #888;
            text-align: center;
            border-bottom: 1px solid #ddd;
            background-color: #fff;
        `
        const DomMenu = styled.div`
            margin-top: ${(props: any) => props.cancel && '6px'};
            padding: .32rem;
            font-size: 18px;
            line-height: 1;
            color: #000;
            text-align: center;
            cursor: pointer;
            background-color: #fff;

            &.cancel {
                margin-top: rem(12);
            }

            & + & {
                border-top: 1px solid #ddd;
            }
        `

        return (
            <transition name="slide-up" on-after-leave={ this.handleAfterLeave }>
                <DomContainer v-show={ this.visible }>
                    {
                        this.title
                        ? <DomTitle>{ this.title }</DomTitle>
                        : null
                    }

                    {
                        this.menus.map(item => {
                            return (
                                <DomMenu key={ item.value } on-click={ this.handleClickMenu.bind(this, item.value) }>
                                    <span>{ item.label }</span>
                                </DomMenu>
                            )
                        })
                    }

                    {
                        this.cancelText
                        ? (
                            <DomMenu cancel on-click={ this.handleClickMenu.bind(this) }>
                                <span>{ this.cancelText }</span>
                            </DomMenu>
                        )
                        : null
                    }
                </DomContainer>
            </transition>
        )
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
        }, this.$el)

        // 必须在调用 openModal 之后
        // 为了获取动态 zindex
        this.zIndex = zindexManager.zIndex
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
    zIndex: number = 9999

    title: string = ''
    menus: IMenu[] = []
    cancelText: string = '取消'
    closeOnClickModal: boolean = true
}
