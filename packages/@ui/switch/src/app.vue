<template>
<label class="tm-switch" :class="disabled ? 'disabled' : ''">
    <input class="tm-switch-input" type="checkbox" :disabled="disabled" v-model="currentValue" />
    <div class="tm-switch-core"></div>
</label>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TmSwitch extends Vue {
    @Prop({ type: Boolean, default: false })
    value!: boolean

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    currentValue: boolean = this.value

    @Watch('value')
    onValueChange (val: boolean) {
        this.currentValue = val
    }

    @Watch('currentValue')
    onCurrentValueChange (val: boolean) {
        this.$emit('input', val)
        this.$emit('change', val)
    }
}
</script>
