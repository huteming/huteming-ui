
import { Vue, Prop } from 'vue-property-decorator'
import { withStyles } from '@huteming/ui-styles/src/main'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', () => `
            min-height: 150px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `),
        Container: styled('div', () => `
            height: 100px;
            margin-bottom: 9px;

            img {
                height: 100%;
                vertical-align: middle;
                border-style: none;
            }
        `),
        Description: styled('div', () => `
            font-size: 16px;
            line-height: 22px;
            color: rgba(178, 186, 196, 1);
        `),
    }
}

class Empty extends Vue {
    render () {
        const { Root, Container, Description } = this.styledDoms
        return (
            <Root class="tm-empty">
                <Container style={ this.imageStyle }>
                    <img src={ this.image } alt="" />
                </Container>

                <Description style={ this.descriptionStyle }>
                    { this.$slots.description || this.description }
                </Description>
            </Root>
        )
    }

    @Prop({ type: String, default: 'http://jhsy-img.caizhu.com/empty-default.png' })
    image!: string

    @Prop({ type: Object })
    imageStyle: object | undefined

    @Prop({ type: String, default: '暂无数据' })
    description!: string

    @Prop({ type: Object })
    descriptionStyle: object | undefined
}

export default withStyles(styles)(Empty, {
    inheritAttrs: false,
    name: 'TmEmpty',
})
