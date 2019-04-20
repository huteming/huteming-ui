<template>
<div class="tm-tab-pane" :class="{ 'tm-tab-active': active }" :style="styles" @click="handleClick">
    <slot>
        <i class="iconfont" :class="`icon-${icon}`" v-if="icon"></i>
        <span v-if="title">{{ title }}</span>

        <transition name="spread-center">
            <div class="tm-tab-pane-line" v-show="active"></div>
        </transition>
    </slot>
</div>
</template>

<script>
export default {
    name: 'TmTabPane',

    props: {
        icon: String,
        title: String,
        name: {
            type: String,
            required: true
        },
        // flex 布局的 flex-grow 属性
        grow: {
            type: Number,
        },
    },

    data () {
        return {
        }
    },

    computed: {
        active () {
            return this.$parent.value === this.name
        },
        styles () {
            return {
                'flex-grow': this.grow || this.$parent.grow,
            }
        },
    },

    methods: {
        handleClick () {
            this.$parent.$emit('change', this.name)
        },
    },
}
</script>

<style lang="scss" scoped>
.tm-tab-pane {
    position: relative;
    // padding: .25rem 0 .2rem;
    // flex: 1;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // flex-flow: column nowrap;
    // line-height: 1.4;

    // &-active {
    //     color: #108EE9;
    //     transition: color .2s;
    // }

    &-line {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background-color: #108EE9;
    }
}

.spread-center-enter-active,
.spread-center-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.6, 1);
    transform-origin: center;
}

.spread-center-enter,
.spread-center-leave-to {
    transform: scale3d(0, 1, 1);
}

.spread-center-enter-to,
.spread-center-leave {
    transform: scale3d(1, 1, 1);
}
</style>
