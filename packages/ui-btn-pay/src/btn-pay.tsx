import { Vue, Prop } from 'vue-property-decorator'
import { withStyles } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', (props: StyleProps) => `
            position: relative;
            width: 100%;
            height: 60px;
            display: flex;
            align-items: flex-end;
            box-sizing: border-box;
        `),
        Container: styled('div', (props: StyleProps) => `
            width: 246px;
            height: 50px;
            display: flex;
            align-items: center;
            padding: 0 10px 0 24px;
            box-shadow: 0 -4px 10px -10px rgba(99, 150, 247, 0.6);
            background-color: #fff;
            box-sizing: border-box;
        `),
        Button: styled('div', (props: StyleProps) => `
            flex: 1;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
            line-height: 24px;
            color: rgba(255, 255, 255, 1);
            font-weight: bold;
            background: linear-gradient(153deg, rgba(78,173,243,1) 0%, rgba(157,230,255,1) 100%);
            border-radius: 11px 11px 0 0;
            box-sizing: border-box;
        `),
        Prefix: styled('div', (props: StyleProps) => `
            font-size: 20px;
            line-height: 28px;
            color: rgba(34, 34, 34, 1);
        `),
        Title: styled('div', { large: Boolean }, (props: StyleProps) => `
            display: flex;
            align-items: center;
            font-size: ${props.large ? '28px' : '18px'};
            line-height: 25px;
            color: rgba(34, 34, 34, 1);
            font-weight: bold;
            white-space: nowrap;
        `),
        Group: styled('div', () => `
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 10px;
        `),
        Tip: styled('div', { through: Boolean }, (props: StyleProps) => css`
            position: relative;
            display: flex;
            align-items: center;
            font-size: 12px;
            line-height: 17px;
            color: ${props.through ? 'rgba(153, 153, 153, 1)' : 'rgba(34, 34, 34, 1)'};
            letter-spacing: .5px;
            white-space: nowrap;
            text-decoration: ${props.through && 'line-through'};
        `),
        Desc: styled('div', { through: Boolean }, (props: StyleProps) => css`
            position: relative;
            display: flex;
            align-items: center;
            font-size: 12px;
            line-height: 17px;
            color: ${props.through ? 'rgba(153, 153, 153, 1)' : 'rgba(34, 34, 34, 1)'};
            letter-spacing: .5px;
            white-space: nowrap;
            text-decoration: ${props.through && 'line-through'};
        `)
    }
}

class BtnPay extends Vue {
    render () {
        const { Root, Container, Button, Prefix, Title, Group, Tip, Desc } = this.styledDoms

        const DomButtonContent = (() => {
            return this.$slots.btn || this.btn
        })()
        const DomPrefix = (() => {
            return this.titlePrefix && <Prefix>{ this.titlePrefix }</Prefix>
        })()
        const DomTitleContent = (() => {
            return this.$slots.title || this.title
        })()
        const DomTipContent = (() => {
            return this.$slots.tip || this.tip
        })()
        const DomDescContent = (() => {
            return this.$slots.desc || this.desc
        })()

        return (
            <Root>
                <Container class="tm-btnpay-container">
                    { DomPrefix }

                    <Title ref="title" large={ !this.titlePrefix } style={ this.titleStyle }>
                        { DomTitleContent }
                    </Title>

                    <Group>
                        <Tip ref="tip" through={ this.tipThrough } style={ this.tipStyle }>
                            { DomTipContent }
                        </Tip>
                        <Desc ref="desc" through={ this.descThrough } style={ this.descStyle }>
                            { DomDescContent }
                        </Desc>
                    </Group>
                </Container>

                <Button ref="btn" class="tm-btnpay-btn" style={ this.normalizedBtnStyle } on-click={ this.handleClick }>
                    { DomButtonContent }
                </Button>
            </Root>
        )
    }

    get normalizedBtnStyle () {
        const _style: any = {}

        if (this.disabled) {
            _style['background'] = 'rgba(201, 204, 212, 1)'
        }

        return Object.assign(_style, this.btnStyle)
    }

    handleClick (event: Event) {
        event.stopPropagation()

        // if (this.disabled) {
        //     return false
        // }
        this.$emit('click')
    }

    @Prop({ type: [String, Number], default: '' })
    title!: string | number

    @Prop({ type: String, default: '￥' })
    titlePrefix!: string

    @Prop({ type: Object })
    titleStyle?: object

    @Prop({ type: String, default: '' })
    tip!: string

    @Prop({ type: Object })
    tipStyle?: object

    @Prop({ type: Boolean, default: true })
    tipThrough!: boolean

    @Prop({ type: String, default: '' })
    desc!: string

    @Prop({ type: Object })
    descStyle?: object

    @Prop({ type: Boolean, default: false })
    descThrough!: boolean

    @Prop({ type: String, default: '' })
    btn!: string

    @Prop({ type: Object })
    btnStyle?: object

    @Prop({ type: Boolean, default: false })
    disabled!: boolean
}

export default withStyles(styles)(BtnPay, { name: 'TmBtnPay' })
