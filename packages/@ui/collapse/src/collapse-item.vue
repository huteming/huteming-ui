<template>
<div class="tm-collapse" :class="{ 'disabled': disabled }">
    <div class="tm-collapse-header" @click.stop="handleClick">
        <slot name="header">
            <div class="tm-collapse__title">{{ header }}</div>
        </slot>
        <div class="tm-collapse__icon" :class="{ active: isActive && !disabled }" v-if="$slots.default || disabled">
            <TmIcon :icon="disabled ? 'lock' : 'arrow_forward'" />
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

<script lang="ts">
import TmCollapse from './collapse.vue'
import TmTransitionCollapse from 'web-ui/transition-collapse/src/app.vue'
import TmIcon from 'web-ui/icon/src/app.vue'
import { generateId } from 'web-util/element/src/main'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    components: {
        TmTransitionCollapse,
        TmIcon,
    },
})
export default class TmCollapseItem extends Vue {
    $parent!: TmCollapse

    @Prop({
        default () {
            return generateId()
        },
    })
    name!: string | number

    @Prop()
    header!: string

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    get isActive () {
        return (this.$parent.activeNames as any).indexOf(this.name) > -1
    }

    handleClick () {
        if (!this.disabled && this.$slots.default) {
            this.$parent.change(this.name)
        }

        this.$emit('click', this.isActive)
    }
}
</script>
