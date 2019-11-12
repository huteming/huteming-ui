<template>
<div class="tm-white" :class="classes" :style="styles">
    <slot></slot>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TmWhiteSpace extends Vue {
    @Prop({ type: String, default: 'md' })
    size!: string

    get classes (): string {
        // 预设值
        if (['xs', 'sm', 'md', 'lg', 'xl'].includes(this.size)) {
            return `tm-white-${this.size}`
        }
        return ''
    }

    get styles (): object {
        const { classes, size } = this
        if (classes) return {}

        return {
            height: size,
        }
    }
}
</script>
