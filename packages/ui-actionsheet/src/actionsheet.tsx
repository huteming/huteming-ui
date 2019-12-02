import { Mixins, Prop } from 'vue-property-decorator'
import { ActionsheetMenu, ComponentActionsheet } from '../types/index'
import { hairline, withStyles } from '@huteming/ui-styles/src/main'
import MixinModal from '@huteming/ui-modal'
import { StyleHelper } from '@huteming/ui-styles/types'

const styles = (styled: any, css: any, helper: StyleHelper) => {
    return {
        Container: styled('div', (props: any) => `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #f2f2f2;
            z-index: ${props.state.zIndex};
        `),

        Header () {
            return styled('div', (props: any) => `
                position: relative;
                padding: 15px;
                font-size: 14px;
                line-height: 21px;
                color: #888;
                text-align: center;
                ${hairline(props.theme, 'bottom', '#ddd')};
                background-color: #fff;
            `)
        },

        Menu () {
            return styled('div', { border: Boolean, spacing: Boolean }, (props: any) => css`
                ${props.border && hairline(props.theme, 'top', '#ddd')};
                margin-top: ${props.spacing ? '6px' : 0};
                position: relative;
                padding: 16px;
                font-size: 18px;
                line-height: 1;
                color: #000;
                text-align: center;
                cursor: pointer;
                background-color: #fff;
            `)
        },
    }
}

class TmActionsheet extends Mixins(MixinModal) implements ComponentActionsheet {
    render () {
        const { Container, Header, Menu } = this.styledDoms

        return (
            <transition name="slide-up" on-after-leave={ this.handleAfterLeave }>
                <Container v-show={ this.visible } class="tm-actionsheet">
                    {
                        this.title
                            ? <Header class="tm-actionsheet-title">{ this.title }</Header>
                            : null
                    }

                    {
                        this.normalizedMenu.map((item, index) => {
                            return (
                                <Menu
                                    key={ item.value }
                                    class={ item.label === this.cancelText ? 'tm-actionsheet-cancel' : 'tm-actionsheet-confirm' }
                                    spacing={ item.label === this.cancelText }
                                    border={ index > 0 && item.label !== this.cancelText }
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
        /* istanbul ignore else */
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
        this.$_openModal(this.handleClickModal, this.$el)
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

    @Prop({ type: Function, default: () => Promise.resolve })
    resolve!: Function

    @Prop({ type: Function, default: () => Promise.resolve })
    reject!: Function

    @Prop({ type: String, default: '' })
    title!: string

    @Prop({ type: Array, default: () => ([]) })
    menus!: ActionsheetMenu[]

    @Prop({ type: String, default: '取消' })
    cancelText!: string

    @Prop({ type: Boolean, default: true })
    closeOnClickModal!: boolean
}

export default withStyles(styles)(TmActionsheet, { name: 'TmActionsheet' })
