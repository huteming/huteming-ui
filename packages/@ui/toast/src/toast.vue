<template>
<transition name="fade" @after-leave="handleAfterLeave" ref="transition">
    <div class="tm-toast" :class="classes" :style="styles" v-show="visible">
        <div class="tm-toast-content" v-if="message" v-html="message">
        </div>
    </div>
</transition>
</template>

<script>
import zindexManager from 'web/assets/js/zindex-manager'

export default {
    name: 'TmToast',

    props: {
        message: String,
        icon: String,
        position: {
            type: String,
            default: 'middle',
            validator (val) {
                return ['top', 'middle', 'bottom'].indexOf(val) > -1
            }
        },
        duration: {
            type: Number,
            default: 3000
        },
        onClose: Function
    },

    data () {
        return {
            zIndex: 9999,
            visible: false,
        }
    },

    computed: {
        classes () {
            return [`tm-toast-${this.position}`]
        },
        styles () {
            return {
                'z-index': this.zIndex,
            }
        },
    },

    methods: {
        handleAfterLeave () {
            this.destroyElement()
        },
        open () {
            this.zIndex = zindexManager.zIndex
            this.visible = true
        },
        close () {
            if (typeof this.onClose === 'function') {
                this.onClose()
            }

            this.visible = false
        },
        destroyElement () {
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },
    },

    mounted () {
        if (this.duration > 0) {
            setTimeout(this.close, this.duration)
        }
    },
}
</script>
