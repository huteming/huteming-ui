<template>
<transition :name="transition" @after-leave="handleAfterLeave">
    <div class="tm-popup" v-show="normalizedVisible" :class="classes" :style="styles" v-smart-scroll="handlePreventMove">
        <slot></slot>
    </div>
</transition>
</template>

<script>
import MixinsModal from 'web-ui/modal/index'
import zindexManager from 'web/assets/js/zindex-manager'
import SmartScroll from 'web-ui/smart-scroll/index'

export default {
    name: 'TmPopup',
    inheritAttrs: false,
    mixins: [MixinsModal],

    props: {
        // 显示弹框
        value: {
            type: Boolean,
            default: false
        },
        beforeClose: Function,
        // 显示位置
        position: {
            type: String,
            default: 'middle',
            validator (val) {
                return ['middle', 'top', 'bottom', 'left', 'right'].indexOf(val) > -1
            },
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
        /**
         * 定时消失
         * postion = top 时，生效
         */
        duration: {
            type: Number,
            default: 3000,
        },
        // 是否在 smart-scroll 阻止滚动事件后关闭
        closeOnMove: [Number, Boolean],
    },

    data () {
        return {
            zIndex: 9999,

            visible: this.value,
            normalizedVisible: false,
        }
    },

    computed: {
        transition () {
            switch (this.position) {
            case 'top':
                return 'slide-down'
            case 'bottom':
                return 'slide-up'
            case 'left':
                return 'slide-left'
            case 'right':
                return 'slide-right'
            default:
                return 'fade'
            }
        },
        classes () {
            return {
                [`tm-popup-${this.position}`]: true
            }
        },
        styles () {
            return {
                'z-index': this.zIndex,
            }
        },
        normalizedCloseOnMove () {
            const _closeOnMove = this.closeOnMove
            // smart-scroll 暂时只支持竖向滚动检测，所以这里只能支持 bottom 位置
            if (this.position !== 'bottom') {
                return Infinity
            }
            if (typeof _closeOnMove === 'number') {
                return _closeOnMove <= 0 ? Infinity : _closeOnMove
            }
            if (typeof _closeOnMove === 'boolean') {
                return _closeOnMove ? 70 : Infinity
            }
            return Infinity
        },
    },

    watch: {
        value (val) {
            this.visible = val
        },
        visible (val) {
            val ? (this.show()) : (this.hide())

            this.$emit('input', val)
        },
    },

    mounted () {
        if (this.value) {
            this.show()
        }
    },

    methods: {
        handlePreventMove ({ moveY }) {
            if (moveY > this.normalizedCloseOnMove) {
                this.visible = false
            }
        },
        handleAfterLeave () {
            this.$emit('closed')
        },
        handleClickModal () {
            if (this.closeOnClickModal) {
                this.visible = false
            }
        },
        show () {
            if (['middle', 'bottom', 'left'].indexOf(this.position) > -1) {
                this.$_openModal({
                    callbackClick: this.handleClickModal,
                }, this.$el)
            }
            this.normalizedVisible = true

            // 必须在调用 openModal 之后
            // 为了获取动态 zindex
            this.zIndex = zindexManager.zIndex

            if (this.position === 'top') {
                setTimeout(this.hide, this.duration)
            }

            this.$emit('open')
        },
        hide () {
            const done = () => {
                this.$_closeModal()
                this.normalizedVisible = false

                this.$emit('close')
            }

            if (typeof this.beforeClose === 'function') {
                this.beforeClose(done)
            } else {
                done()
            }
        },
    },

    directives: {
        SmartScroll,
    },
}
</script>
