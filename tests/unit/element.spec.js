import { mount } from '@vue/test-utils'
import WorkComponent from '../components/element'
import BasicComponent from '../components/basic'
import assert from 'assert'
import { getScrollEventTarget, scrollX, scrollY, attached, getScrollTop, getScrollLeft, isXScrollable, isYScrollable } from 'web-util/element/src/main'
const wrapper = mount(WorkComponent)
const eleContainer = wrapper.vm.$refs.container
const eleEmpty = wrapper.vm.$refs.empty
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

    describe('isYScrollable', () => {
        it('可滚动区域', () => {
            const result = isYScrollable(eleContainer)
            assert.strictEqual(result, true)
        })

        it('不可滚动区域', () => {
            const result = isYScrollable(eleEmpty)
            assert.strictEqual(result, false)
        })
    })

    describe('isXScrollable', () => {
        it('可滚动区域', () => {
            const result = isXScrollable(eleContainer)
            assert.strictEqual(result, true)
        })

        it('不可滚动区域', () => {
            const result = isXScrollable(eleEmpty)
            assert.strictEqual(result, false)
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

    describe('getScrollEventTarget', () => {
        it('获取滚动元素', () => {
            const eleContainer = wrapper.vm.$refs.container
            const eleOver = wrapper.vm.$refs.over

            const actual = getScrollEventTarget(eleOver)
            assert.strictEqual(actual, eleContainer)
        })

        it('获取window元素', () => {
            const eleEmpty = wrapper.vm.$refs.empty

            const actual = getScrollEventTarget(eleEmpty)
            assert.strictEqual(actual, window)
        })
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
