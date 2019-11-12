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
