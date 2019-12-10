import { isHtmlElement, isString } from '@huteming/ui-types/src/main'
import { getScrollContainer, on, off, isInContainer } from 'packages/ui-element/src/main'
import { throttle } from 'throttle-debounce'
import TmIcon from 'packages/ui-icon/src/main'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { withStyles } from 'packages/ui-styles/src/main'

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', () => `
            position: relative;
            overflow: hidden;
        `),
        Placeholder: styled('div', () => `
            position: relative;
            border-radius: 3px;
            width: 100%;
            height: 100%;
            border: 1px solid #ddd;
            background-color: #fff;
            box-sizing: border-box;

            &:before {
                content: " ";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 1px;
                height: 25px;
                transform: translate(-50%,-50%);
                background-color: #ccc;
            }

            &:after {
                content: " ";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 25px;
                height: 1px;
                transform: translate(-50%,-50%);
                background-color: #ccc;
            }
        `),
        Loading: styled('div', () => `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        `),
        ImageError: styled('div', () => `
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #c0c4cc;
            vertical-align: middle;
        `),
        ImageInner: styled('img', () => `
            width: 100%;
            height: 100%;
            vertical-align: top;
        `),
    }
}

class Image extends Vue {
    render () {
        const { Root, Placeholder, Loading, ImageError, ImageInner } = this.styledDoms
        const DomHolder = (() => {
            if (this.state === 'hold') {
                if (this.$slots.placeholder) {
                    return this.$slots.placeholder
                }
                return <Placeholder class="tm-image__placeholder"></Placeholder>
            }
            return null
        })()
        const DomLoading = (() => {
            if (this.state === 'loading') {
                if (this.$slots.loading) {
                    return this.$slots.loading
                }
                return <Loading class="tm-image__loading">
                    <TmIcon icon="loading" />
                </Loading>
            }
            return null
        })()
        const DomError = (() => {
            if (this.state === 'error') {
                return this.$slots.error || (
                    <ImageError class="tm-image__error">加载失败</ImageError>
                )
            }
            return null
        })()
        const DomImg = (() => {
            return this.state === 'success' && <ImageInner
                class="tm-image__inner"
                src={ this.src }
                style={ this.imageStyle }
                attrs={ this.$attrs }
                on={ this.$listeners } >
            </ImageInner>
        })()

        return (
            <Root class="tm-image">
                { DomHolder }
                { DomLoading }
                { DomError }
                { DomImg }
            </Root>
        )
    }

    get imageStyle () {
        const { fit } = this
        const styles = {}

        if (fit) {
            (styles as any)['object-fit'] = fit
        }

        return styles
    }

    @Watch('src')
    onSrcChange (val: string) {
        this.readyToShow && this.loadImage()
    }

    @Watch('readyToShow')
    onReadhChange (val: boolean) {
        val && this.loadImage()
    }

    mounted () {
        if (this.lazy) {
            this.addLazyLoadListener()
        } else if (this.state !== 'hold') {
            this.loadImage()
        }
    }

    beforeDestroy () {
        this.lazy && this.removeLazyLoadListener()
    }

    loadImage () {
        // 重置状态
        this.state = 'loading'

        const img = document.createElement('img')
        img.onload = (event: Event) => this.handleLoad(event, img)
        img.onerror = (event: Event) => this.handleError(event)

        Object
            .keys(this.$attrs)
            .forEach((key) => {
                const value = this.$attrs[key]
                img.setAttribute(key, value)
            })

        img.src = this.src
    }

    handleLoad (event: Event, img: HTMLImageElement) {
        this.imageWidth = img.width
        this.imageHeight = img.height

        this.state = 'success'
    }

    handleError (event: Event) {
        this.state = 'error'
        this.$emit('error', event)
    }

    addLazyLoadListener () {
        const { scrollContainer } = this
        let _scrollContainer = null

        if (isHtmlElement(scrollContainer)) {
            _scrollContainer = scrollContainer
        } else if (isString(scrollContainer)) {
            _scrollContainer = document.querySelector((scrollContainer as string))
        } else {
            _scrollContainer = getScrollContainer(this.$el)
        }

        if (_scrollContainer) {
            this.domScrollContainer = _scrollContainer
            this.lazyLoadHandler = throttle(200, this.lazyLoad.bind(this, _scrollContainer))
            on(_scrollContainer, 'scroll', this.lazyLoadHandler)
            this.lazyLoad(_scrollContainer)
        } else {
            console.warn('未找到可滚动区域')
        }
    }

    removeLazyLoadListener () {
        const { domScrollContainer, lazyLoadHandler } = this
        if (!domScrollContainer || !lazyLoadHandler) return

        off(domScrollContainer, 'scroll', lazyLoadHandler)
        this.domScrollContainer = null
        this.lazyLoadHandler = null
    }

    lazyLoad (scrollContainer: Element) {
        if (isInContainer(this.$el, scrollContainer)) {
            this.readyToShow = true
            this.removeLazyLoadListener()
        }
    }

    @Prop({ type: String, required: true })
    src!: string

    @Prop({ type: String })
    fit?: string

    @Prop({ type: Boolean })
    lazy?: boolean

    @Prop({ type: Boolean })
    hold?: boolean

    @Prop({ type: [String, Element] })
    scrollContainer?: string | Element

    state: string = this.hold && !this.src ? 'hold' : 'loading'
    readyToShow: boolean = !this.lazy
    imageWidth: number = 0
    imageHeight: number = 0
    lazyLoadHandler: Function | null = null
    domScrollContainer: Element | null = null
}

export default withStyles(styles)(Image, {
    name: 'TmImage',
    inheritAttrs: false,
})
