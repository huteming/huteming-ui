<template>
<div class="tm-cell">
    <div class="tm-cell__hd" v-if="header || $slots.header">
        <slot name="header">{{ header }}</slot>
    </div>

    <div class="tm-cell__bd" v-if="body || $slots.body">
        <slot name="body">{{ body }}</slot>
    </div>

    <div class="tm-cell__ft" v-if="footer || $slots.default">
        <slot>{{ footer }}</slot>
    </div>

    <div class="tm-cell__link" v-if="link"></div>
</div>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator'

export default class TmCell extends Vue {
    @Prop({ type: String })
    header: string | undefined

    @Prop({ type: String })
    body: string | undefined

    @Prop({ type: String })
    footer: string | undefined

    @Prop({ type: Boolean })
    link: boolean | undefined
}
</script>
