<template>
<div class="tm-collapse">
    <div class="tm-collapse-header" @click.stop="handleClick">
        <slot name="header">
            <span>{{ header }}</span>
            <TmIcon class="tm-collapse-header-icon" :class="{ active: isActive }" icon="arrow_forward" />
        </slot>
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

<style lang="scss" scoped>
$collapse-header-height: rem(88);

.tm-collapse {
    overflow: hidden;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;

    &-header {
        position: relative;
        width: 100%;
        height: $collapse-header-height;
        padding: 0 rem(30);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: rem(34);
        line-height: $collapse-header-height;
        color: #303133;
        background-color: #fff;
        box-sizing: border-box;
        z-index: 2;

        &-icon {
            color: #c7c7cc;
            transition: transform 100ms $transition-ease;

            &.active {
                transform: rotate(90deg);
            }
        }
    }

    &-wrap {
        position: relative;
        will-change: height;
        background-color: #fff;
        overflow: hidden;
        box-sizing: border-box;
        z-index: 1;
    }

    &-content {
        font-size: rem(26);
        color: #303133;
        line-height: 1.769230769230769;
    }
}
</style>
