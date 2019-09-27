import { mount } from '@vue/test-utils'
import CompBtnPay from 'web-ui/btn-pay/src/btn-pay'
import WorkBasic from '../components/basic'
import assert from 'assert'
import sinon from 'sinon'

describe('btn-pay', () => {
    it('disabled', () => {
        const wrapper = mount(CompBtnPay, {
            propsData: {
                btn: 'btn',
                disabled: true,
            },
        })
        const wrapperBtn = wrapper.find('.tm-pay-btn')
        assert.strictEqual(wrapperBtn.attributes('style'), `background: rgb(201, 204, 212);`)
        wrapperBtn.trigger('click')
        assert.ok(!wrapper.emitted('click'))
    })

    describe('title', () => {
        it('string类型title', () => {
            const title = 'this is an title'
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    title,
                },
            })

            const wrapperTitle = wrapper.find('.tm-pay-title')
            assert.ok(wrapperTitle.exists())
            assert.strictEqual(wrapperTitle.text(), title)
        })

        it('title小数点大于2位', () => {
            const title = 1.23456
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    title,
                },
            })

            const wrapperTitle = wrapper.find('.tm-pay-price')
            assert.ok(wrapperTitle.exists())
            assert.strictEqual(wrapperTitle.text(), title.toFixed(2))
        })

        it('title小数点等于1位', () => {
            const title = 1.2
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    title,
                },
            })

            const wrapperTitle = wrapper.find('.tm-pay-price')
            assert.ok(wrapperTitle.exists())
            assert.strictEqual(wrapperTitle.text(), '1.20')
        })

        it('title是int类型', () => {
            const title = 10
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    title,
                },
            })

            const wrapperTitle = wrapper.find('.tm-pay-price')
            assert.ok(wrapperTitle.exists())
            assert.strictEqual(wrapperTitle.text(), '10')
        })
    })

    describe('titlePrefix', () => {
        it('title类型string,不处理titlePrefix', () => {
            const titlePrefix = 'ppp'
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    title: 'string',
                    titlePrefix,
                },
            })

            const wrapperTitle = wrapper.find('.tm-pay-prefix')
            assert.strictEqual(wrapperTitle.text(), titlePrefix)
        })

        it('title类型number,titlePrefix默认为￥', () => {
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    title: 1,
                },
            })

            const wrapperTitle = wrapper.find('.tm-pay-prefix')
            assert.strictEqual(wrapperTitle.text(), '￥')
        })

        it('title类型插槽,不处理titlePrefix', () => {
            const titlePrefix = 'llll'
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    titlePrefix,
                },
                slots: {
                    title: WorkBasic,
                },
            })

            const wrapperTitle = wrapper.find('.tm-pay-prefix')
            assert.strictEqual(wrapperTitle.text(), titlePrefix)
        })
    })

    describe('titleStyle', () => {
        it('不处理', () => {
            const color = 'rgb(170, 187, 204)'
            const titleStyle = { color }
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    titleStyle,
                },
            })

            const wrapperTitle = wrapper.find('.tm-pay-title')
            assert.strictEqual(wrapperTitle.attributes('style'), `color: ${color};`)
        })
    })

    describe('tip', () => {
        it('不处理', () => {
            const tip = 'llll'
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    tip,
                },
            })

            const wrapperTip = wrapper.find('.tm-pay-tip')
            assert.strictEqual(wrapperTip.text(), tip)
        })
    })

    describe('tipStyle', () => {
        it('不处理', () => {
            const color = 'rgb(170, 187, 204)'
            const tipStyle = { color }
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    tipStyle,
                },
            })

            const wrapperTip = wrapper.find('.tm-pay-tip')
            assert.strictEqual(wrapperTip.attributes('style'), `color: ${color};`)
        })
    })

    describe('tipThrough', () => {
        it('tip添加class', () => {
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    tipThrough: true,
                },
            })

            const wrapperTip = wrapper.find('.tm-pay-tip')
            assert.ok(wrapperTip.classes('through'))
        })
    })

    describe('desc', () => {
        it('不处理', () => {
            const desc = 'llll'
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    desc,
                },
            })

            const wrapperDesc = wrapper.find('.tm-pay-desc')
            assert.strictEqual(wrapperDesc.text(), desc)
        })
    })

    describe('descStyle', () => {
        it('不处理', () => {
            const color = 'rgb(170, 187, 204)'
            const descStyle = { color }
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    descStyle,
                },
            })

            const wrapperDesc = wrapper.find('.tm-pay-desc')
            assert.strictEqual(wrapperDesc.attributes('style'), `color: ${color};`)
        })
    })

    describe('descThrough', () => {
        it('desc添加class', () => {
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    descThrough: true,
                },
            })

            const wrapperTip = wrapper.find('.tm-pay-desc')
            assert.ok(wrapperTip.classes('through'))
        })
    })

    describe('btn', () => {
        it('不处理', () => {
            const btn = 'llll'
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    btn,
                },
            })

            const wrapperBtn = wrapper.find('.tm-pay-btn')
            assert.strictEqual(wrapperBtn.text(), btn)
        })
    })

    describe('btnStyle', () => {
        it('只显示按钮', () => {
            const color = 'rgb(170, 187, 204)'
            const btnStyle = { color }
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    btnStyle,
                    btnOnly: true,
                },
            })

            const wrapperBtn = wrapper.find('.tm-pay-btn')
            assert.strictEqual(wrapperBtn.attributes('style'), `border-radius: 0; color: ${color};`)
        })

        it('显示文案', () => {
            const color = 'rgb(170, 187, 204)'
            const btnStyle = { color }
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    btnStyle,
                    btnOnly: false,
                },
            })

            const wrapperBtn = wrapper.find('.tm-pay-btn')
            assert.strictEqual(wrapperBtn.attributes('style'), `color: ${color};`)
        })
    })

    describe('btnOnly', () => {
        it('只显示按钮', () => {
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    btnOnly: true,
                },
            })
            const wrapperContainer = wrapper.find('.tm-pay-container')

            assert.strictEqual(wrapperContainer.exists(), false)
        })

        it('显示文案区域', () => {
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    btnOnly: false,
                },
            })
            const wrapperContainer = wrapper.find('.tm-pay-container')

            assert.strictEqual(wrapperContainer.exists(), true)
        })
    })

    describe('slot', () => {
        it('btn', () => {
            const wrapper = mount(CompBtnPay, {
                slots: {
                    btn: WorkBasic,
                }
            })

            assert.strictEqual(wrapper.contains(WorkBasic), true)
        })
    })

    describe('events', () => {
        it('click', () => {
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    btn: 'btn',
                },
            })
            const wrapperBtn = wrapper.find('.tm-pay-btn')
            wrapperBtn.trigger('click')

            assert.ok(wrapper.emitted('click'))
        })
    })
})
