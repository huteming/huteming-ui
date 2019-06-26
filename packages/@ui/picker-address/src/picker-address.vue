<template>
<tm-popup v-model="normalizedVisible" position="bottom" ref="popup">
    <div class="tm-picker-address">
        <TmToolbar @confirm="handleConfirm" @cancel="handleCancel" />

        <tm-picker>
            <TmPickerItem :options="provinces" v-model="provinceCode" />
            <TmPickerItem :options="cities" v-model="cityCode" />
            <TmPickerItem :options="areas" v-model="areaCode" />
        </tm-picker>
    </div>
</tm-popup>
</template>

<script>
import TmPopup from 'web-ui/popup/index.js'
import TmPicker from 'web-ui/picker/index.js'
import TmPickerItem from 'web-ui/picker-item/index.js'
import TmToolbar from 'web-ui/toolbar/index.js'

import provinceOptions from './json/provinces.min.json'
import citieOptions from './json/cities.min.json'
import areaOptions from './json/areas.min.json'

export default {
    name: 'TmPickerAddress',

    props: {
        visible: Boolean,
        value: {
            type: Array,
            default () {
                return []
            },
        },
        valueText: {
            type: Array,
            default () {
                return []
            },
        },
    },

    data () {
        return {
            normalizedVisible: this.visible,

            provinceCode: '',
            cityCode: '',
            areaCode: '',
        }
    },

    computed: {
        // 省级
        provinces () {
            return provinceOptions
        },
        // 城市
        cities () {
            return citieOptions.filter(item => item.provinceCode === this.provinceCode)
        },
        // 地区
        areas () {
            return areaOptions.filter(item => item.cityCode === this.cityCode)
        },
    },

    watch: {
        visible (val) {
            this.normalizedVisible = val
        },
        normalizedVisible (val) {
            this.$emit('update:visible', val)

            if (val) {
                this.initValue()
            }
        },
    },

    created () {
    },

    methods: {
        handleConfirm () {
            console.log('confirm')

            const { provinces, provinceCode, cities, cityCode, areas, areaCode } = this

            const _values = [provinceCode, cityCode, areaCode]

            const _valueText = [
                provinces.find(item => item.value === provinceCode).label,
                cities.find(item => item.value === cityCode).label,
                areas.find(item => item.value === areaCode).label,
            ]

            this.$emit('input', _values)
            this.$emit('update:valueText', _valueText)

            this.$nextTick(() => {
                this.$emit('change', _values, _valueText)
            })

            this.normalizedVisible = false
        },
        handleCancel () {
            console.log('cancel')

            this.normalizedVisible = false
        },
        async initValue () {
            let [provinceCodeInit, cityCodeInit, areaCodeInit] = this.value

            provinceCodeInit = String(provinceCodeInit)
            cityCodeInit = String(cityCodeInit)
            areaCodeInit = String(areaCodeInit)

            // 如果 provinceCode 不存在，重置为第一项 value
            this.provinceCode = (() => {
                const codeDefault = this.provinces[0].value
                const one = this.provinces.find(item => item.value === provinceCodeInit)

                return one ? provinceCodeInit : codeDefault
            })()

            // await this.$nextTick()

            this.cityCode = (() => {
                const codeDefault = this.cities[0].value
                const one = this.cities.find(item => item.value === cityCodeInit)

                return one ? cityCodeInit : codeDefault
            })()

            // await this.$nextTick()

            this.areaCode = (() => {
                const codeDefault = this.areas[0].value
                const one = this.areas.find(item => item.value === areaCodeInit)

                return one ? areaCodeInit : codeDefault
            })()
        },
    },

    components: {
        TmPopup,
        TmPicker,
        TmPickerItem,
        TmToolbar,
    },
}
</script>

<style lang="scss" scoped>
</style>
