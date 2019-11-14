import { isHtmlElement, isString } from 'packages/ui-types/src'
import { getScrollContainer, on, off, isInContainer } from 'packages/ui-element/src/main'
import { throttle } from 'throttle-debounce'
import TmIcon from 'packages/ui-icon/src/main'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'TmImage',
    inheritAttrs: false,
})
export default class TmImage extends Vue {
    render () {
        const DomHolder = (() => {
            if (this.state === 'hold') {
                if (this.$slots.placeholder) {
                    return this.$slots.placeholder
                }
                return <div class="tm-image__placeholder"></div>
            }
            return null
        })()
        const DomLoading = (() => {
            if (this.state === 'loading') {
                if (this.$slots.loading) {
                    return this.$slots.loading
                }
                return <div class="tm-image__loading">
                    <TmIcon icon="loading" />
                </div>
            }
            return null
        })()
        const DomError = (() => {
            if (this.state === 'error') {
                return this.$slots.error || <div class="tm-image__error">加载失败</div>
            }
            return null
        })()
        const DomImg = (() => {
            return this.state === 'success'
            ? <img
                class="tm-image__inner"
                src={ this.src }
                style={ this.imageStyle }
                { ...this.$attrs }
                { ...this.$listeners } />
            : null
        })

        return (
            <div class="tm-image">
                { DomHolder }
                { DomLoading }
                { DomError }
                { DomImg }
            </div>
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

        const img = new Image()
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