<template>
<transition
    name="fade"
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    @after-enter="handleAfterEnter"
    @after-leave="handleAfterLeave">
    <div class="tm-loading" :style="styles" v-show="visible" @click.stop @touchmove.prevent.stop>
        <div class="tm-loading-content">
            <TmIcon icon="loading" />
            <div class="tm-loading-text" :style="textStyle" v-if="text">{{ text }}</div>
        </div>
    </div>
</transition>
</template>

<script>
import zindexManager from 'web/assets/js/zindex-manager'
import TmIcon from 'web-ui/icon/index'

export default {
    name: 'TmLoading',

    data () {
        return {
            zIndex: 9999,
            visible: false,
            openTime: 0,

            text: '',
            textStyle: {},
            background: '',
            openAnimation: true,
            closeAnimation: true,
        }
    },

    computed: {
        styles () {
            return {
                'z-index': this.zIndex,
                'background': this.background,
            }
        },
        enterActiveClass () {
            return this.openAnimation ? 'fade-enter-active' : ''
        },
        leaveActiveClass () {
            return this.closeAnimation ? 'fade-leave-active' : ''
        },
    },

    methods: {
        handleAfterEnter () {
            this.$emit('after-enter')
        },
        handleAfterLeave () {
            this.destroyElement()
        },
        show () {
            this.zIndex = zindexManager.zIndex
            this.visible = true
        },
        hide () {
            this.visible = false
        },
        destroyElement () {
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },
    },

    components: {
        TmIcon,
    },
}
</script>
