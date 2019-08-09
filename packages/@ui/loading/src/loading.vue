<template>
<transition
    name="loading-fade"
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
            return this.openAnimation ? 'tm-loading-transition' : ''
        },
        leaveActiveClass () {
            return this.closeAnimation ? 'tm-loading-transition' : ''
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

<style lang="scss" scoped>
.tm-loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 1);

    &-content {
        height: rem(300);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    &-text {
        margin-top: 3px;
    }

    &-transition {
        transition: opacity .3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
}

.loading-fade-enter,
.loading-fade-leave-to {
    opacity: 0;
}
</style>
