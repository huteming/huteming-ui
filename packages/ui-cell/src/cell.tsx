
import { Vue, Prop } from 'vue-property-decorator'
import { withStyles, hairline } from 'packages/ui-styles/src'
import { StyleProps } from 'packages/ui-styles/types'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', (props: StyleProps) => `
            position: relative;
            width: 100%;
            padding: 16px;
            display: flex;
            align-items: center;
            font-size: 17px;
            line-height: 1.41176471;
            background: #fff;
            box-sizing: border-box;
            & + & {
                ${hairline(props.theme, 'top', 'rgba(0, 0, 0, 0.1)', { left: '16px' })};
            }
        `),
        Header: styled('div', () => `
            width: 105px;
            word-wrap: break-word;
            word-break: break-all;
        `),
        Body: styled('div', () => `
            flex: 1;
        `),
        Footer: styled('div', () => `
            color: rgba(0, 0, 0, 0.5);
            text-align: right;
        `),
        Link: styled('div', () => css`
            position: relative;
            margin-left: 14px;
            width: 14.2px;
            height: 14.2px;

            &:after {
                content: ' ';
                position: absolute;
                top: 50%;
                margin-top: -5px;
                height: 8px;
                width: 8px;
                border-width: 2px 2px 0 0;
                border-color: #B2B2B2;
                border-style: solid;
                transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            }
        `),
    }
}

class Cell extends Vue {
    render () {
        const { Root, Header, Body, Footer, Link } = this.styledDoms

        const DomHeader = (() => {
            const _content = this.$slots.header || this.header
            if (_content) {
                return <Header ref="header">{ _content }</Header>
            }
        })()
        const DomBody = (() => {
            const _content = this.$slots.body || this.body
            if (_content) {
                return <Body ref="body">{ _content }</Body>
            }
        })()
        const DomFooter = (() => {
            const _content = this.$slots.default || this.footer
            if (_content) {
                return <Footer ref="footer">{ _content }</Footer>
            }
        })()
        const DomLink = (() => {
            if (this.link) {
                return <Link ref="link"></Link>
            }
        })()

        return (
            <Root>
                { DomHeader }
                { DomBody }
                { DomFooter }
                { DomLink }
            </Root>
        )
    }

    @Prop({ type: String })
    header: string | undefined

    @Prop({ type: String })
    body: string | undefined

    @Prop({ type: String })
    footer: string | undefined

    @Prop({ type: Boolean })
    link: boolean | undefined
}

export default withStyles(styles)(Cell, { name: 'TmCell' })
