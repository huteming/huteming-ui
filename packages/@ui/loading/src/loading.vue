<template>
<transition
    name="loading-fade"
    @after-leave="handleAfterLeave">
    <div class="tm-loading" :style="styles" v-show="visible" @click.stop @touchmove.prevent.stop>
        <div class="tm-loading-icon"></div>
        <div class="tm-loading-text" :style="textStyle" v-if="text">{{ text }}</div>
    </div>
</transition>
</template>

<script>
import zindexManager from 'web/assets/js/zindex-manager'

export default {
    name: 'TmLoading',

    props: {
        text: String,
        textStyle: Object,
        background: String,
    },

    data () {
        return {
            zIndex: 9999,
            visible: false,
        }
    },

    computed: {
        styles () {
            return {
                'z-index': this.zIndex,
                'background': this.background,
            }
        },
    },

    methods: {
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
}
</script>

<style lang="scss" scoped>
@import 'web/assets/style/icon.scss';

.tm-loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
    transition: opacity .3s cubic-bezier(0.4, 0.0, 0.2, 1);

    &-icon {
        @extend .tm-icon-loading;
    }

    &-text {
        margin-top: 3px;
    }
}

.loading-fade-enter,
.loading-fade-leave-to {
    opacity: 0;
}
</style>
