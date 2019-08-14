<template>
<div class="tm-collapse">
    <div class="tm-collapse-header" @click.stop="handleClick">
        <slot name="header">
            <div class="tm-collapse__title">{{ header }}</div>
        </slot>
        <div class="tm-collapse__icon" :class="{ active: isActive }">
            <TmIcon icon="arrow_forward" />
        </div>
    </div>

    <tm-transition-collapse>
        <div class="tm-collapse-wrap" :key="name" v-show="isActive">
            <div class="tm-collapse-content">
                <slot></slot>
            </div>
        </div>
    </tm-transition-collapse>
</div>
</template>

<script>
import TmTransitionCollapse from 'web-ui/transition-collapse/src'
import TmIcon from 'web-ui/icon/src'
import { generateId } from 'web-util/element/src/main'

export default {
    name: 'TmCollapseItem',

    props: {
        name: {
            type: [String, Number],
            default () {
                return generateId()
            },
        },
        header: String,
        disabled: Boolean,
    },

    data () {
        return {
        }
    },

    computed: {
        isActive () {
            return this.$parent.activeNames.indexOf(this.name) > -1
        },
    },

    methods: {
        handleClick () {
            !this.disabled && this.$parent.change(this.name)
        },
    },

    components: {
        TmTransitionCollapse,
        TmIcon,
    },
}
</script>
