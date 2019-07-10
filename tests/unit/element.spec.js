import { mount } from '@vue/test-utils'
import WorkComponent from '../components/element.vue'
import BasicComponent from '../components/basic.vue'
import assert from 'assert'
import sinon from 'sinon'
import { autoprefixer, scrollX, scrollY, attached, getScrollTop, getScrollLeft, getElementTop, __RewireAPI__ as RewireAPI } from 'web-util/element/src/main'
const wrapper = mount(WorkComponent)
const eleContainer = wrapper.vm.$refs.container
let wrapperBasic

describe('element', () => {
    beforeEach(() => {
        eleContainer.scrollTop = 0
        eleContainer.scrollLeft = 0
        window.scrollTop = 0
        window.scrollLeft = 0
    })

    afterEach(() => {
        wrapperBasic && wrapperBasic.destroy()
    })

    describe('getElementTop', () => {
        let mockGetScrollTop

        beforeEach(() => {
            mockGetScrollTop = sinon.fake()
            RewireAPI.__Rewire__('getScrollTop', (...args) => {
                mockGetScrollTop(...args)
                return -1
            })
        })

        afterEach(() => {
            RewireAPI.__ResetDependency__('getScrollTop')
        })

        it('window', () => {
            const res = getElementTop(window)

            assert.strictEqual(res, -1)
            assert.strictEqual(mockGetScrollTop.getCall(0).args[0], window)
        })

        it('element', () => {
            const mockElement = {
                getBoundingClientRect () {
                    return {
                        top: -2,
                    }
                },
            }
            const res = getElementTop(mockElement)

            assert.strictEqual(res, -3)
        })
    })

    describe('autoprefixer', () => {
        it('不是对象不处理', () => {
            const data = 'hello'
            const res = autoprefixer(data)

            assert.strictEqual(res, data)
        })

        it('transform添加前缀', () => {
            const value = 'value'
            const data = {
                transform: value,
            }
            const res = autoprefixer(data)

            assert.deepStrictEqual(res, {
                'transform': value,
                'ms-transform': value,
                'webkit-transform': value,
            })
        })

        it('transition添加前缀', () => {
            const value = 'value'
            const data = {
                transition: value,
            }
            const res = autoprefixer(data)

            assert.deepStrictEqual(res, {
                'transition': value,
                'ms-transition': value,
                'webkit-transition': value,
            })
        })

        it('animation添加前缀', () => {
            const value = 'value'
            const data = {
                animation: value,
            }
            const res = autoprefixer(data)

            assert.deepStrictEqual(res, {
                'animation': value,
                'ms-animation': value,
                'webkit-animation': value,
            })
        })
    })

    describe('scrollX', () => {
        it('window', () => {
            scrollX(window, 10)
            assert.strictEqual(getScrollLeft(window), 10)
        })

        it('element', () => {
            scrollX(eleContainer, 11)
            assert.strictEqual(getScrollLeft(eleContainer), 11)
        })
    })

    describe('scrollY', () => {
        it('window', () => {
            scrollY(window, 20)
            assert.strictEqual(getScrollTop(window), 20)
        })

        it('element', () => {
            scrollY(eleContainer, 20)
            assert.strictEqual(getScrollTop(eleContainer), 20)
        })
    })

    it('scrollTo', () => {
        const btnScroll = wrapper.find({ ref: 'scroll' })
        btnScroll.trigger('click')

        const eleContainer = wrapper.vm.$refs.container
        assert.strictEqual(eleContainer.scrollLeft, 40)
        assert.strictEqual(eleContainer.scrollTop, 40)
    })

    describe('getScrollTop', () => {
        it('window', () => {
            scrollY(window, 30)

            const _result = getScrollTop(window)
            assert.strictEqual(_result, 30)
        })

        it('element', () => {
            const element = wrapper.vm.$refs.container
            scrollY(element, 35)

            const _result = getScrollTop(element)
            assert.strictEqual(_result, 35)
        })
    })

    describe('attached', () => {
        it('等待插入dom', done => {
            attached('#uniqueID', (tryCount) => {
                assert.strictEqual(tryCount, 1)
                done()
            }, { timeout: 5 })

            wrapperBasic = mount(BasicComponent, {
                attachToDocument: true,
            })
        })

        it('已经在dom中', done => {
            wrapperBasic = mount(BasicComponent, {
                attachToDocument: true,
            })

            attached(wrapperBasic.element, (tryCount) => {
                assert.strictEqual(tryCount, 0)
                done()
            })
        })

        it('限制最多渲染次数', done => {
            attached(
                '#uniqueID',
                () => {
                    done(new Error('非期望一场'))
                },
                (tryCount) => {
                    assert.strictEqual(tryCount, 3)
                    done()
                },
                { maxCount: 2, timeout: 5 }
            )
        })

        it('第三个参数可以是配置对象', (done) => {
            attached(
                '#uniqueID',
                () => {
                    done(new Error('非期望异常'))
                },
                {
                    maxCount: -1,
                    timeout: 5,
                }
            )

            setTimeout(done, 10)
        })

        it('没有parentNode失败', done => {
            const originQuery = document.querySelector
            document.querySelector = () => {
                return {
                    nodeType: 11,
                }
            }

            attached(
                '#div',
                () => {
                    document.querySelector = originQuery
                    done(new Error('非期望异常'))
                },
                (tryCount) => {
                    document.querySelector = originQuery
                    assert.strictEqual(tryCount, 3)
                    done()
                },
                {
                    maxCount: 2,
                    timeout: 5
                }
            )
        })

        it('DocumentFragment失败', done => {
            const originQuery = document.querySelector
            document.querySelector = () => {
                return {
                    parentNode: {
                        nodeType: 11,
                    }
                }
            }

            attached(
                '#div',
                () => {
                    document.querySelector = originQuery
                    done(new Error('非期望异常'))
                },
                (tryCount) => {
                    document.querySelector = originQuery
                    assert.strictEqual(tryCount, 3)
                    done()
                },
                {
                    maxCount: 2,
                    timeout: 5
                }
            )
        })
    })
})
