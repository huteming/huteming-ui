import TmPopup from '@huteming/ui-popup/src/main'
import TmPicker from '@huteming/ui-picker/src/main'
import TmToolbar from '@huteming/ui-toolbar/src/main'
import provinceOptions from './json/provinces.min.json'
import citieOptions from './json/cities.min.json'
import areaOptions from './json/areas.min.json'
import { withStyles } from '@huteming/ui-styles/src/main'
import { Vue, Prop, Watch } from 'vue-property-decorator'
import { Province, City, Area } from '../types/index.js'

const styles = (styled: any) => {
    return {
        Root: styled('div', () => `
            background: #fff;
        `),
    }
}

class PickerAddress extends Vue {
    render () {
        const { Root } = this.styledDoms
        const Toolbar = TmToolbar as any
        const TmPickerItem = TmPicker.item as any
        return (
            <TmPopup value={ this.normalizedVisible } on-input={ (val: boolean) => (this.normalizedVisible = val) } position="bottom" ref="popup">
                <Root class="tm-picker-address">
                    <Toolbar title={ this.title } on-confirm={ this.handleConfirm } on-cancel={ this.handleCancel } />

                    <TmPicker>
                        <TmPickerItem options={ this.provinces } value={ this.provinceCode } on-input={ (val: string) => (this.provinceCode = val) } />
                        <TmPickerItem options={ this.cities } value={ this.cityCode } on-input={ (val: string) => (this.cityCode = val) } />
                        <TmPickerItem options={ this.areas } value={ this.areaCode } on-input={ (val: string) => (this.areaCode = val) } />
                    </TmPicker>
                </Root>
            </TmPopup>
        )
    }

    @Prop({ type: Boolean, default: false })
    visible!: boolean

    @Prop({ type: Array, default: () => [] })
    value!: string[]

    @Prop({ type: Array, default: () => [] })
    valueText!: string[]

    @Prop({ type: String, default: '请选择区域' })
    title!: string

    normalizedVisible = this.visible
    provinceCode = ''
    cityCode = ''
    areaCode = ''

    // 省级
    get provinces (): Province[] {
        return provinceOptions
    }
    // 城市
    get cities (): City[] {
        return (citieOptions as City[]).filter(item => item.provinceCode === this.provinceCode)
    }
    // 地区
    get areas (): Area[] {
        return (areaOptions as Area[]).filter(item => item.cityCode === this.cityCode)
    }

    @Watch('visible')
    onVisible (val: boolean) {
        this.normalizedVisible = val
    }

    @Watch('normalizedVisible')
    onNormalizedVisible (val: boolean) {
        if (val) {
            this.initValue()
        }
        this.$emit('update:visible', val)
    }

    handleConfirm () {
        const { provinces, provinceCode, cities, cityCode, areas, areaCode } = this

        const _values = [provinceCode, cityCode, areaCode]

        const _valueText = [
            (provinces.find(item => item.value === provinceCode) as Province).label,
            (cities.find(item => item.value === cityCode) as City).label,
            (areas.find(item => item.value === areaCode) as Area).label,
        ]

        this.$emit('input', _values)
        this.$emit('update:valueText', _valueText)

        this.$nextTick(() => {
            this.$emit('change', _values, _valueText)
        })

        this.normalizedVisible = false
        console.log('confirm', _values, _valueText)
    }
    handleCancel () {
        this.normalizedVisible = false
        console.log('cancel')
    }
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
    }
}

export default withStyles(styles)(PickerAddress, { name: 'TmPickerAddress' })
