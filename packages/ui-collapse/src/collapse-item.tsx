import TmTransitionCollapse from '@huteming/ui-transition-collapse/src/main'
import TmIcon from '@huteming/ui-icon/src/main'
import { generateId } from '@huteming/ui-tools/src/main'
import { Prop, Vue, Mixins } from 'vue-property-decorator'
import TmCollapse from '../types/collapse'
import { hairline, withStyles } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'
import { ChildrenMixin } from 'ui/mixins/relation'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', (props: StyleProps) => css`
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            & + & {
                ${hairline(props.theme, 'top', 'rgb(214, 214, 214)', { left: '18px', right: '18px' })};
            }
        `),
        Header: styled('div', () => `
            position: relative;
            width: 100%;
            height: 52px;
            padding: 0 18px 0 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            box-sizing: border-box;
            z-index: 2;
        `),
        Title: styled('div', { disabled: Boolean }, (props: StyleProps) => `
            font-size: 16px;
            line-height: 52px;
            color: ${props.disabled ? 'rgba(142, 146, 150, 1)' : 'rgba(32, 38, 49, 1)'};
            font-weight: bold;
        `),
        Icon: styled('div', { active: Boolean, disabled: Boolean }, (props: StyleProps) => css`
            font-size: ${props.disabled ? '18px' : '15px'};
            color: ${props.disabled ? '#C9CCD4' : 'rgba(142, 146, 150, 1)'};
            transition: transform 100ms cubic-bezier(0.4, 0.0, 0.2, 1);
            transform: ${props.active && !props.disabled && 'rotate(90deg)'};
        `),
        Wrap: styled('div', () => `
            position: relative;
            will-change: height;
            background-color: #fff;
            overflow: hidden;
            box-sizing: border-box;
            z-index: 1;
        `),
        Content: styled('div', () => `
            font-size: 13px;
            color: #303133;
            line-height: 1.769230769230769;
        `)
    }
}

class CollapseItem extends Mixins(ChildrenMixin('collapse')) {
    render () {
        const { Root, Header, Title, Icon, Wrap, Content } = this.styledDoms
        const DomHeader = (() => {
            return this.$slots.header || <Title disabled={ this.disabled }>{ this.header }</Title>
        })()
        const DomIcon = (() => {
            if (this.$slots.default || this.disabled) {
                return <Icon disabled={ this.disabled } active={ this.isActive }>
                    <TmIcon icon={ this.disabled ? 'lock' : 'arrow_forward' } />
                </Icon>
            }
        })()
        return (
            <Root>
                <Header class="tm-collapse-header" on-click={ this.handleClick }>
                    { DomHeader }
                    { DomIcon }
                </Header>

                <TmTransitionCollapse>
                    <Wrap class="tm-collapse-wrap" v-show={ this.isActive }>
                        <Content>{ this.$slots.default }</Content>
                    </Wrap>
                </TmTransitionCollapse>
            </Root>
        )
    }

    @Prop({
        default () {
            return generateId()
        },
    })
    name!: string | number

    @Prop()
    header!: string

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    get isActive () {
        return (this.parent.activeNames as any).includes(this.name)
    }

    handleClick (event: Event) {
        event.stopPropagation()

        if (!this.disabled && this.$slots.default) {
            this.parent.change(this.name)
        }

        this.$emit('click', this.isActive)
    }
}

export default withStyles(styles)(CollapseItem, { name: 'TmCollapseItem' })
