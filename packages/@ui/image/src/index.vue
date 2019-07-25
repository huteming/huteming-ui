<template>
<div class="tm-image">
    <slot v-if="state === 'hold'" name="placeholder">
        <div class="tm-image__placeholder"></div>
    </slot>

    <slot v-if="state === 'loading'" name="loading">
        <div class="tm-image__loading">
            <div class="tm-icon-loading"></div>
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
}
</script>

<style lang="scss" scoped>
@import 'web/assets/style/icon.scss';

.tm-image {
    position: relative;
    overflow: hidden;

    &__placeholder {
        position: relative;
        border-radius: 3px;
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
    }

    &__loading {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__error {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #c0c4cc;
        vertical-align: middle;
    }

    &__inner {
        vertical-align: top;
    }

    &__placeholder,
    &__loading,
    &__error,
    &__inner {
        width: 100%;
        height: 100%;
    }
}
</style>
