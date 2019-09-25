import actionsheet from 'web-ui/actionsheet/src/main'
import TmActionsheet from 'web-ui/actionsheet/src/actionsheet.vue'
import assert from 'assert'
import sinon from 'sinon'
import { mount, createWrapper, TransitionStub, createLocalVue } from '@vue/test-utils'
import { sleep, cleanModal } from '../helper'
const localVue = createLocalVue()
localVue.component(TmActionsheet.name, TmActionsheet)
const menus = [
    { label: 'label - 1', value: 'value - 1' },
    { label: 'label - 2', value: 'value - 2' }
]

describe('actionsheet', () => {
    it('create', async () => {
        actionsheet(menus)
        await sleep()
        const domAction = document.querySelector('.tm-actions')
        assert.ok(domAction)
    })

    it('create by object', async () => {
        actionsheet({ menus })
        await sleep()
        const domAction = document.querySelector('.tm-actions')
        assert.ok(domAction)
    })

    it('title', () => {
        const wrapper = mount(TmActionsheet, {
            propsData: {
                title: '',
                menus,
            },
        })
        let wrapperTitle
        wrapperTitle = wrapper.find('.tm-actions-title')
        assert.ok(!wrapperTitle.exists())
        wrapper.setProps({ title: 'title' })
        wrapperTitle = wrapper.find('.tm-actions-title')
        assert.ok(wrapperTitle.exists())
    })

    it('closeOnClickModal', async () => {
        const mockResolve = sinon.fake()
        const mockReject = sinon.fake()
        const wrapper = mount({
            template: `
                <div>
                    <TmActionsheet :menus="menus" :close-on-click-modal="closeOnClickModal" />
                </div>
            `,
            data () {
                return {
                    menus,
                    closeOnClickModal: false,
                }
            },
        }, {
            stubs: {
                transition: false,
            },
            localVue,
        })
        let wrapperAction
        wrapperAction = wrapper.find(TmActionsheet)
        wrapperAction.setData({ resolve: mockResolve, reject: mockReject })
        wrapperAction.vm.open()
        await sleep(310)
        const wrapperModal = wrapper.find('.tm-modal')
        wrapperModal.trigger('click')
        await sleep(310)
        wrapperAction = wrapper.find(TmActionsheet)
        assert.ok(wrapperAction.isVisible())
        wrapper.setData({ closeOnClickModal: true })
        wrapperModal.trigger('click')
        await sleep(310)
        wrapperAction = wrapper.find(TmActionsheet)
        assert.ok(!wrapperAction.exists())
    })

    it('confirm', async () => {
        const mockResolve = sinon.fake()
        const mockReject = sinon.fake()
        const wrapper = mount({
            template: `
                <div>
                    <TmActionsheet :menus="menus" />
                </div>
            `,
            data () {
                return {
                    menus,
                }
            },
        }, {
            stubs: {
                transition: TransitionStub,
            },
            localVue,
        })
        let wrapperAction
        wrapperAction = wrapper.find(TmActionsheet)
        wrapperAction.setData({ resolve: mockResolve, reject: mockReject })
        wrapperAction.vm.open()
        const wrapperConfirm = wrapper.find('.tm-actions-menus')
        wrapperConfirm.trigger('click')
        assert.ok(mockResolve.calledWithExactly('value - 1'))
    })

    it('cancel', async () => {
        const mockResolve = sinon.fake()
        const mockReject = sinon.fake()
        const wrapper = mount({
            template: `
                <div>
                    <TmActionsheet :menus="menus" />
                </div>
            `,
            data () {
                return {
                    menus,
                }
            },
        }, {
            stubs: {
                transition: TransitionStub,
            },
            localVue,
        })
        let wrapperAction
        wrapperAction = wrapper.find(TmActionsheet)
        wrapperAction.setData({ resolve: mockResolve, reject: mockReject })
        wrapperAction.vm.open()
        const wrapperCancel = wrapper.find('#tm-actions-cancel')
        wrapperCancel.trigger('click')
        assert.ok(mockReject.calledOnce)
    })

    afterEach(() => {
        sinon.restore()
    })

    afterEach(() => {
        const el = document.querySelector('.tm-actions')
        if (!el) return
        if (el.parentNode) {
            el.parentNode.removeChild(el)
        }
        if (el.__vue__) {
            el.__vue__.$destroy()
        }
    })

    afterEach(cleanModal)
})
