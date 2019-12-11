import TmIcon from '@huteming/ui-icon/src/main'
import { linear } from '@huteming/ui-animation/src/main'
import { withStyles } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { StyleProps } from '@huteming/ui-styles/types'
const TIME_DELAY = 2000
const TIME_RESTORE = 1000
const PX_TIME_CONSUMING = 25 // 移动每像素耗时，毫秒
const EXTRA_DISTANCE = 15 // 额外移动的距离

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', () => `
            width: 100%;
            height: 32px;
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 32px;
            color: rgba(255, 255, 255, 1);
            font-weight: 500;
            letter-spacing: .7px;
            background: rgba(87, 180, 244, 1);
            overflow: hidden;
            box-sizing: border-box;
        `),
        Icon: styled('div', () => `
            margin-left: 10px;
        `),
        Action: styled('div', () => `
            padding-right: 8px;
        `),
        Content: styled('div', { isTop: Boolean }, (props: StyleProps) => css`
            flex: 1;
            margin-right: 15px;
            margin-left: 10px;
            overflow: hidden;
            margin-left: ${!props.isTop && '5px'};
        `),
        Wrap: styled('div', () => `
            position: relative;
            display: inline-block;
            white-space: nowrap;
        `),
    }
}

class NoticeBar extends Vue {
    render () {
        const { Root, Wrap, Content, Icon, Action } = this.styledDoms
        return (
            <Root class="tm-notice-bar">
                { this.icon && <Icon class="tm-notice-bar-icon"><TmIcon icon={ this.icon }/></Icon> }

                <Content class="tm-notice-bar-content" is-top={ !this.icon } ref="content">
                    <Wrap class="tm-notice-bar-wrap" style={ this.styleWrap } ref="wrap">
                        { this.$slots.default }
                    </Wrap>
                </Content>

                {
                    (this.actionIcon || this.$slots.action) && (
                        <Action class="tm-notice-bar-action" on-click={ this.handleClick }>
                            {
                                this.$slots.action || (
                                    this.actionIcon && <TmIcon icon={ this.actionIcon } />
                                )
                            }
                        </Action>
                    )
                }
            </Root>
        )
    }

    @Prop({ type: String })
    mode: string | undefined

    @Prop({ type: String, default: 'volume_up' })
    icon!: string

    @Prop({
        type: [Number, String],
        validator (val) {
            return !isNaN(Number(val))
        },
    })
    duration!: number | string

    @Prop({ type: Boolean, default: true })
    loop!: boolean

    moveLeft = 0
    timerMove = 0
    timerRestore = 0

    get actionIcon () {
        switch (this.mode) {
        case 'closeable':
            return 'clear'
        case 'link':
            return 'arrow_forward'
        default:
            return this.mode
        }
    }
    get styleWrap () {
        return {
            transform: `translateX(-${this.moveLeft}px)`,
        }
    }

    mounted () {
        this.start()
    }

    beforeDestroy () {
        clearTimeout(this.timerMove)
        clearTimeout(this.timerRestore)
    }

    handleClick () {
        this.$emit('click')

        if (this.mode === 'closeable') {
            this.destroyElement()
        }
    }
    start () {
        const contentComp = this.$refs.content as Vue
        const contentDom = contentComp.$el as HTMLElement
        const widthContent = contentDom.offsetWidth
        const wrapComp = this.$refs.wrap as Vue
        const wrapDom = wrapComp.$el as HTMLElement
        const widthWrap = wrapDom.offsetWidth
        const diff = widthWrap - widthContent
        if (diff > 0) {
            const distance = diff + EXTRA_DISTANCE
            const duration = Number(this.duration) || distance * PX_TIME_CONSUMING
            this.move(distance, duration)
        }
    }
    move (distance: number, duration: number) {
        this.timerMove = setTimeout(() => {
            linear(0, distance, (position: number, isFinish: boolean) => {
                this.moveLeft = position

                if (isFinish) {
                    this.restore()

                    if (this.loop) {
                        this.move(distance, duration)
                    }
                }
            }, duration)
        }, TIME_DELAY)
    }
    restore () {
        this.timerRestore = setTimeout(() => {
            this.moveLeft = 0
        }, TIME_RESTORE)
    }
    destroyElement () {
        this.$destroy()
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    }
}

export default withStyles(styles)(NoticeBar, { name: 'TmNoticeBar' })
