// import { autoprefixer } from 'packages/ui-element/src/main'
import { autoprefixer } from '@huteming/ui-element/src/main'
import { Vue, Prop, Mixins } from 'vue-property-decorator'
import { withStyles } from '@huteming/ui-styles'
import { StyleProps } from '@huteming/ui-styles/types'
import { Carousel } from '../types'
import { ChildrenMixin } from 'ui/mixins/relation'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', { animation: Boolean }, (props: StyleProps) => css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: ${props.animation && 'transform 300ms ease-in-out'};
        `)
    }
}

class CarouselItem extends Mixins(ChildrenMixin('carousel')) {
    parent!: Carousel

    render () {
        const { Root } = this.styledDoms

        return (
            <Root animation={ this.animation } style={ this.styles } v-show={ this.ready }>
                { this.$slots.default }
            </Root>
        )
    }

    @Prop({ type: String, default: '' })
    name!: string

    animation = false
    translate = 0
    move = 0
    ready = false

    get parentDirection () {
        return this.parent.direction
    }

    get styles () {
        const translateType = this.parentDirection === 'vertical' ? 'translateY' : 'translateX'
        const _style = {
            transform: `${translateType}(${this.translate + this.move}px)`
        }

        return autoprefixer(_style)
    }

    processIndex (index: number, activeIndex: number, length: number) {
        if (activeIndex === 0 && index === length - 1) {
            return -1
        } else if (activeIndex === length - 1 && index === 0) {
            return length
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
            return length + 1
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
            return -2
        }
        return index
    }

    translateItem (index: number, activeIndex: number, oldIndex: number) {
        const length = this.parent.children.length
        const distance = this.parent.$el[this.parentDirection === 'vertical' ? 'offsetHeight' : 'offsetWidth']

        if (oldIndex !== -1) {
            this.animation = index === activeIndex || index === oldIndex
        }

        if (index !== activeIndex && length > 2 && this.parent.loop) {
            index = this.processIndex(index, activeIndex, length)
        }

        this.translate = distance * (index - activeIndex)
        this.move = 0
        this.ready = true
    }

    /**
     * @argument {Boolean} direction true: 回滚到右边/下边; false: 回滚到左边/上边
     */
    moveItem (index: number, activeIndex: number, move: number, direction: boolean) {
        const total = this.parent.children.length
        const loop = this.parent.loop
        const self = index === activeIndex

        this.animation = (() => {
            if (move !== 0) {
                return false
            }
            if (direction) {
                if (loop && activeIndex === total - 1) {
                    return self || index === 0
                }
                return self || index === activeIndex + 1
            }
            if (loop && activeIndex === 0) {
                return self || index === total - 1
            }
            return self || index === activeIndex - 1
        })()

        this.move = move
    }
}

export default withStyles(styles)(CarouselItem, { name: 'TmCarouselItem' })
