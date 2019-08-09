<template>
<div class="tm-image">
    <slot v-if="state === 'hold'" name="placeholder">
        <div class="tm-image__placeholder"></div>
    </slot>

    <slot v-if="state === 'loading'" name="loading">
        <div class="tm-image__loading">
            <TmIcon icon="loading" />
        </div>
    </slot>

    <slot v-if="state === 'error'" name="error">
        <div class="tm-image__error">加载失败</div>
    </slot>

    <img
        v-if="state === 'success'"
        class="tm-image__inner"
        v-bind="$attrs"
        v-on="$listeners"
        :src="src"
        :style="imageStyle">
</div>
</template>

<script>
import { isHtmlElement, isString } from 'web-util/types/src'
import { getScrollContainer, on, off, isInContainer } from 'web-util/element/src/main'
import throttle from 'throttle-debounce/throttle'
import TmIcon from 'web-ui/icon/index'

export default {
    name: 'TmImage',
    inheritAttrs: false,

    props: {
        src: String,
        fit: String,
        lazy: Boolean,
        hold: Boolean,
        scrollContainer: {}
    },

    data () {
        return {
            state: this.hold && !this.src ? 'hold' : 'loading',
            readyToShow: !this.lazy,
            imageWidth: 0,
            imageHeight: 0,
        }
    },

    computed: {
        imageStyle () {
            const { fit } = this
            const styles = {}

            if (fit) {
                styles['object-fit'] = fit
            }

            return styles
        },
    },

    watch: {
        src (val) {
            this.readyToShow && this.loadImage()
        },
        readyToShow (val) {
            val && this.loadImage()
        },
    },

    mounted () {
        if (this.lazy) {
            this.addLazyLoadListener()
        } else if (this.state !== 'hold') {
            this.loadImage()
        }
    },

    beforeDestroy () {
        this.lazy && this.removeLazyLoadListener()
    },

    methods: {
        loadImage () {
            // 重置状态
            this.state = 'loading'

            const img = new Image()
            img.onload = e => this.handleLoad(e, img)
            img.onerror = e => this.handleError(e)

            Object
                .keys(this.$attrs)
                .forEach((key) => {
                    const value = this.$attrs[key]
                    img.setAttribute(key, value)
                })

            img.src = this.src
        },
        handleLoad (e, img) {
            this.imageWidth = img.width
            this.imageHeight = img.height

            this.state = 'success'
        },
        handleError (e) {
            this.state = 'error'
            this.$emit('error', e)
        },
        addLazyLoadListener () {
            const { scrollContainer } = this
            let _scrollContainer = null

            if (isHtmlElement(scrollContainer)) {
                _scrollContainer = scrollContainer
            } else if (isString(scrollContainer)) {
                _scrollContainer = document.querySelector(scrollContainer)
            } else {
                _scrollContainer = getScrollContainer(this.$el)
            }

            if (_scrollContainer) {
                this._scrollContainer = _scrollContainer
                this._lazyLoadHandler = throttle(200, this.lazyLoad)
                on(_scrollContainer, 'scroll', this._lazyLoadHandler)
                this.lazyLoad()
            } else {
                console.warn('未找到可滚动区域')
            }
        },
        removeLazyLoadListener () {
            const { _scrollContainer, _lazyLoadHandler } = this
            if (!_scrollContainer || !_lazyLoadHandler) return

            off(_scrollContainer, 'scroll', _lazyLoadHandler)
            this._scrollContainer = null
            this._lazyLoadHandler = null
        },
        lazyLoad () {
            if (isInContainer(this.$el, this._scrollContainer)) {
                this.readyToShow = true
                this.removeLazyLoadListener()
            }
        },
    },

    components: {
        TmIcon,
    },
}
</script>
