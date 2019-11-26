import actionsheet from '../src/main'
import TmActionsheet from '../src/actionsheet'
import { closeModal } from '../../ui-modal/src/main'
import assert from 'assert'
import sinon from 'sinon'
import { mount, TransitionStub, createLocalVue } from '@vue/test-utils'
import { sleep, cleanDom } from 'tests/helper'
const localVue = createLocalVue()
localVue.component(TmActionsheet.name, TmActionsheet)
const menus = [
    { label: 'label - 1', value: 'value - 1' },
    { label: 'label - 2', value: 'value - 2' }
]

describe('actionsheet', () => {
    it('install', () => {
        localVue.use(actionsheet)
        assert.strictEqual(localVue.prototype.$actionsheet, actionsheet)
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
        wrapperAction.vm.open()
        const wrapperModal = wrapper.find('.tm-modal')
        wrapperModal.trigger('click')
        await sleep(300)
        wrapperAction = wrapper.find(TmActionsheet)
        assert.ok(wrapperAction.isVisible())

        wrapper.setData({ closeOnClickModal: true })
        wrapperModal.trigger('click')
        await sleep(300)
        wrapperAction = wrapper.find(TmActionsheet)
        assert.ok(!wrapperAction.exists())
    })

    it('create', async () => {
        actionsheet(menus)
        await sleep()
        const domAction = document.querySelector('.tm-actionsheet')
        assert.ok(domAction)
    })

    it('create by object', async () => {
        actionsheet({ title: 'qwe4' })
        await sleep()
        const domAction = document.querySelector('.tm-actionsheet')
        assert.ok(domAction)
    })

    it('title', async () => {
        const wrapper = mount(TmActionsheet, {
            propsData: {
                title: 'wewrqwe',
                menus,
            },
            stubs: {
                transition: false,
            },
            localVue,
        })
        let wrapperAction
        wrapperAction = wrapper.find(TmActionsheet)

        let wrapperTitle
        wrapperTitle = wrapper.find('.tm-actionsheet-title')
        assert.ok(wrapperTitle.exists())
        wrapper.setProps({ title: '' })
        await sleep()
        wrapperTitle = wrapper.find('.tm-actionsheet-title')
        assert.ok(!wrapperTitle.exists())

        // 可删。为了测试覆盖 resolve 默认值
        const wrapperConfirm = wrapper.find('.tm-actionsheet-confirm')
        wrapperConfirm.trigger('click')
    })

    it('confirm', async () => {
        const mockResolve = sinon.fake()
        const mockReject = sinon.fake()
        const wrapper = mount(TmActionsheet, {
            propsData: {
                menus,
                resolve: mockResolve,
                reject: mockReject,
            },
            stubs: {
                transition: TransitionStub,
            },
            localVue,
        })
        const wrapperAction = wrapper.find(TmActionsheet)
        wrapperAction.vm.open()
        const wrapperConfirm = wrapper.find('.tm-actionsheet-confirm')
        wrapperConfirm.trigger('click')
        assert.ok(mockResolve.calledWithExactly('value - 1'))
    })

    it('cancel', () => {
        const mockResolve = sinon.fake()
        const mockReject = sinon.fake()
        const wrapper = mount(TmActionsheet, {
            propsData: {
                menus,
                resolve: mockResolve,
                reject: mockReject,
            },
            stubs: {
                transition: TransitionStub,
            },
            localVue,
        })
        let wrapperAction
        wrapperAction = wrapper.find(TmActionsheet)
        wrapperAction.vm.open()
        const wrapperCancel = wrapper.find('.tm-actionsheet-cancel')
        wrapperCancel.trigger('click')
        assert.ok(mockReject.calledOnce)
    })

    afterEach(() => {
        sinon.restore()
        closeModal()
        cleanDom('.tm-actionsheet')
        cleanDom('.tm-modal')
    })
})
