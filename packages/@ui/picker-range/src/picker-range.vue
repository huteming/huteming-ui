<template>
<base-popup v-model="normalizedVisible" position="bottom" ref="popup">
    <div class="tm-picker-range">
        <TmToolbar v-bind="$attrs" @confirm="handleConfirm" @cancel="handleCancel" :show-confirm="isValid" />

        <base-picker>
            <base-picker-item v-bind="$attrs" :options="item" v-model="current[index]" v-for="(item, index) in options" :key="index"></base-picker-item>
        </base-picker>
    </div>
</base-popup>
</template>

<script>
import BasePopup from 'web-ui/popup/index.js'
import Picker from 'web-ui/picker/index.js'
import PickerItem from 'web-ui/picker-item/index.js'
import TmToolbar from 'web-ui/toolbar/index.js'

export default {
    name: 'TmPickerRange',

    props: {
        visible: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            required: true,
        },
        value: {
            type: Array,
            default () {
                return []
            },
        },
    },

    data () {
        return {
            normalizedVisible: this.visible,
            current: this.value.concat(),
        }
    },

    computed: {
        isValid () {
            return !!this.options.length && this.options.every(item => item.length)
        },
    },

    watch: {
        visible (val) {
            this.normalizedVisible = val
        },
        normalizedVisible (val) {
            this.$emit('update:visible', val)

            if (val) {
                this.current = this.value.concat()
            }
        },
    },

    methods: {
        handleConfirm () {
            console.log('confirm', this.current)
            this.$emit('input', this.current)
            this.normalizedVisible = false

            this.$nextTick(() => {
                this.$emit('change', this.current, this.options)
            })
        },
        handleCancel () {
            console.log('cancel')
            this.normalizedVisible = false
        },
    },

    components: {
        BasePopup,
        BasePicker: Picker,
        BasePickerItem: PickerItem,
        TmToolbar,
    },
}
</script>

<style lang="scss" scoped>
.tm-picker-range {
    position: static;
}
</style>
