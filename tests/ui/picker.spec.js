import { mount } from '@vue/test-utils'
import TmPicker from 'web-ui/picker/src/picker'
import TmPickerItem from 'web-ui/picker/src/picker-item'
import assert from 'assert'

describe('picker', () => {
    it('create', () => {
        const wrapper = mount({
            template: `
                <tm-picker>
                    <tm-picker-item :options="picker1"></tm-picker-item>
                    <tm-picker-item :options="picker2"></tm-picker-item>
                </tm-picker>
            `,
            data () {
                return {
                    picker1: [
                        {
                            label: '1',
                            value: '1',
                        },
                        {
                            label: '2',
                            value: '2',
                        },
                        {
                            label: '3',
                            value: '3',
                        },
                    ],
                    picker2: [
                        {
                            label: '4',
                            value: '4',
                        },
                        {
                            label: '5',
                            value: '5',
                        },
                    ],
                }
            },
            components: {
                TmPicker,
                TmPickerItem,
            },
        })
        const wrapperItem = wrapper.findAll('.tm-picker-item')
        const wrapperPiece = wrapper.findAll('.tm-picker-item__container-piece')
        assert.strictEqual(wrapperItem.length, 2)
        assert.strictEqual(wrapperPiece.length, wrapperItem.length * 18)
    })
})
