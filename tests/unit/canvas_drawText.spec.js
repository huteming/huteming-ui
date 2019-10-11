import assert from 'assert'
import sinon from 'sinon'
import {
    getConfig, setContextOptions, parseUnderline, parseType, getRenderText,
    addStatistic, parseThrough, getRenderUnderlines, getRenderThroughes
} from 'web-util/canvas-draw/src/drawText'
import CanvasDraw from 'web-util/canvas-draw/src/main'

describe('canvas > drawText', () => {
    it('drawText返回配置对象', () => {
        const mockSelf = {
            context: {
                measureText () {
                    return {
                        width: 33,
                    }
                },
                fillText () {},
                save () {},
                restore () {},
                beginPath () {},
                setLineDash () {},
                moveTo () {},
                lineTo () {},
                stroke () {},
            },
            ratio: 1,
        }
        const ins = new CanvasDraw()
        ins.ratio = mockSelf.ratio
        ins.context = mockSelf.context
        const options = ins.drawText('<underline><through>hello</through></underline>', 1, 2)
        const _options = getConfig.call(mockSelf, 1, 2)
        // 这里不方便计算统计数据，删除
        // 在函数中测试
        delete options.actualMaxWidth
        delete options.actualMaxHeight
        delete _options.actualMaxWidth
        delete _options.actualMaxHeight

        assert.deepStrictEqual(options, _options)
    })

    it('addStatistic', () => {
        const ratio = 2
        const letterWidth = 10
        const size = 20
        const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 1, y: 1, letterWidth }]
        const options = { size, x: 0, y: 0 }
        const res = addStatistic.call({ ratio }, data, options)

        assert.deepStrictEqual(res, {
            ...options,
            actualMaxWidth: (2 + letterWidth) / ratio,
            actualMaxHeight: (3 + size) / ratio,
        })
    })

    describe('getConfig', () => {
        it('默认配置', () => {
            const ratio = 2
            const x = 2
            const y = 3
            const res = getConfig.call({ ratio }, x, y)
    
            assert.deepStrictEqual(res, {
                x: x * ratio,
                y: y * ratio,
                actualMaxWidth: 0,
                actualMaxHeight: 0,
                fix: '.... ',
                maxWidth: Infinity,
                style: 'normal',
                variant: 'normal',
                weight: 'normal',
                size: 24 * ratio,
                lineHeight: 24 * ratio * 1.5,
                align: 'start',
                baseline: 'top',
                letterSpacing: 0,
                lineWidth: 1,
                wrap: 0,
                shadowColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                color: '#000',
                type: 'fillText',
                underline: {
                    left: 10 * ratio,
                    right: 10 * ratio,
                    bottom: 6 * ratio,
                    dashed: [],
                    lineWidth: 1,
                },
            })
        })

        it('type = fill', () => {
            const ratio = 2
            const x = 2
            const y = 3
            const res = getConfig.call({ ratio }, x, y, { type: 'fill' })
    
            assert.deepStrictEqual(res, {
                x: x * ratio,
                y: y * ratio,
                actualMaxWidth: 0,
                actualMaxHeight: 0,
                fix: '.... ',
                maxWidth: Infinity,
                style: 'normal',
                variant: 'normal',
                weight: 'normal',
                size: 24 * ratio,
                lineHeight: 24 * ratio * 1.5,
                align: 'start',
                baseline: 'top',
                letterSpacing: 0,
                lineWidth: 1,
                wrap: 0,
                shadowColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                color: '#000',
                type: 'fillText',
                underline: {
                    left: 10 * ratio,
                    right: 10 * ratio,
                    bottom: 6 * ratio,
                    dashed: [],
                    lineWidth: 1,
                },
            })
        })

        it('type = stroke', () => {
            const ratio = 2
            const x = 2
            const y = 3
            const res = getConfig.call({ ratio }, x, y, { type: 'stroke' })
    
            assert.deepStrictEqual(res, {
                x: x * ratio,
                y: y * ratio,
                actualMaxWidth: 0,
                actualMaxHeight: 0,
                fix: '.... ',
                maxWidth: Infinity,
                style: 'normal',
                variant: 'normal',
                weight: 'normal',
                size: 24 * ratio,
                lineHeight: 24 * ratio * 1.5,
                align: 'start',
                baseline: 'top',
                letterSpacing: 0,
                lineWidth: 1,
                wrap: 0,
                shadowColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                color: '#000',
                type: 'strokeText',
                underline: {
                    left: 10 * ratio,
                    right: 10 * ratio,
                    bottom: 6 * ratio,
                    dashed: [],
                    lineWidth: 1,
                },
            })
        })
    })

    it('setContextOptions', () => {
        const mockContext = {}
        const mockScaleBySystem = 2
        const options = getConfig.call({ ratio: 1 }, 2, 3)
        setContextOptions.call({ context: mockContext, scaleBySystem: mockScaleBySystem }, options)

        assert.strictEqual(mockContext.font, `${options.style} ${options.variant} ${options.weight} ${options.size / mockScaleBySystem}px/${options.lineHeight}px arial`)
        assert.strictEqual(mockContext.lineWidth, options.lineWidth)
        assert.strictEqual(mockContext.fillStyle, options.color)
        assert.strictEqual(mockContext.strokeStyle, options.color)
        assert.strictEqual(mockContext.shadowColor, options.shadowColor)
        assert.strictEqual(mockContext.shadowOffsetX, options.shadowOffsetX)
        assert.strictEqual(mockContext.shadowOffsetY, options.shadowOffsetY)
        assert.strictEqual(mockContext.shadowBlur, options.shadowBlur)
        assert.strictEqual(mockContext.textBaseline, options.baseline)
    })

    describe('parseUnderline', () => {
        it('缺少标签', () => {
            const text = [{ letter: 'hello', other: 'other' }]
            const res = parseUnderline(text)
            assert.deepStrictEqual(res, [{ letter: 'hello', other: 'other', underline: false }])
        })

        it('缺少起始标签', () => {
            const text = [{ letter: 'hello</underline>', other: 'other' }]
            const res = parseUnderline(text)
            assert.deepStrictEqual(res, [{ letter: 'hello</underline>', other: 'other', underline: false }])
        })

        it('缺少结束标签', () => {
            const text = [{ letter: '<underline>hello', other: 'other' }]
            const res = parseUnderline(text)
            assert.deepStrictEqual(res, [{ letter: '<underline>hello', other: 'other', underline: false }])
        })

        it('标签包裹空元素', () => {
            const text = [{ letter: '<underline></underline>', other: 'other' }]
            const res = parseUnderline(text)
            assert.deepStrictEqual(res, [])
        })

        it('一组标签', () => {
            const text = [{ letter: 'before<underline>hello</underline>after', other: 'other' }]
            const res = parseUnderline(text)
            assert.deepStrictEqual(res, [
                { letter: 'before', other: 'other', underline: false },
                { letter: 'hello', other: 'other', underline: true },
                { letter: 'after', other: 'other', underline: false },
            ])
        })

        it('多组标签', () => {
            const text = [{ letter: '<underline>first</underline>before<underline>second</underline>after<underline>thrid</underline>', other: 'other' }]
            const res = parseUnderline(text)
            assert.deepStrictEqual(res, [
                { letter: 'first', other: 'other', underline: true },
                { letter: 'before', other: 'other', underline: false },
                { letter: 'second', other: 'other', underline: true },
                { letter: 'after', other: 'other', underline: false },
                { letter: 'thrid', other: 'other', underline: true },
            ])
        })
    })

    describe('parseThrough', () => {
        it('缺少标签', () => {
            const text = [{ letter: 'hello', other: 'other' }]
            const res = parseThrough(text)
            assert.deepStrictEqual(res, [{ letter: 'hello', other: 'other', through: false }])
        })

        it('缺少起始标签', () => {
            const text = [{ letter: 'hello</through>', other: 'other' }]
            const res = parseThrough(text)
            assert.deepStrictEqual(res, [{ letter: 'hello</through>', other: 'other', through: false }])
        })

        it('缺少结束标签', () => {
            const text = [{ letter: '<through>hello', other: 'other' }]
            const res = parseThrough(text)
            assert.deepStrictEqual(res, [{ letter: '<through>hello', other: 'other', through: false }])
        })

        it('标签包裹空元素', () => {
            const text = [{ letter: '<through></through>', other: 'other' }]
            const res = parseThrough(text)
            assert.deepStrictEqual(res, [])
        })

        it('一组标签', () => {
            const text = [{ letter: 'before<through>hello</through>after', other: 'other' }]
            const res = parseThrough(text)
            assert.deepStrictEqual(res, [
                { letter: 'before', other: 'other', through: false },
                { letter: 'hello', other: 'other', through: true },
                { letter: 'after', other: 'other', through: false },
            ])
        })

        it('多组标签', () => {
            const text = [{ letter: '<through>first</through>before<through>second</through>after<through>thrid</through>', other: 'other' }]
            const res = parseThrough(text)
            assert.deepStrictEqual(res, [
                { letter: 'first', other: 'other', through: true },
                { letter: 'before', other: 'other', through: false },
                { letter: 'second', other: 'other', through: true },
                { letter: 'after', other: 'other', through: false },
                { letter: 'thrid', other: 'other', through: true },
            ])
        })
    })

    describe('parseType', () => {
        it('非中文结尾', () => {
            const text = [{ letter: 'hello123中文world', other: 'other' }]
            const res = parseType(text)
            assert.deepStrictEqual(res, [
                { letter: 'hello123', other: 'other' },
                { letter: '中', other: 'other' },
                { letter: '文', other: 'other' },
                { letter: 'world', other: 'other' },
            ])
        })

        it('中文结尾', () => {
            const text = [{ letter: 'hello123中world文', other: 'other' }]
            const res = parseType(text)
            assert.deepStrictEqual(res, [
                { letter: 'hello123', other: 'other' },
                { letter: '中', other: 'other' },
                { letter: 'world', other: 'other' },
                { letter: '文', other: 'other' },
            ])
        })
    })

    describe('getRenderText', () => {
        it('不换行 && 不超过maxWidth', () => {
            const ratio = 2
            const mockX = 2
            const mockY = 3
            const mockTextWidth = 33
            const mockContext = {
                measureText () {
                    return {
                        width: mockTextWidth,
                    }
                },
            }
            const options = getConfig.call({ ratio }, mockX, mockY, { wrap: false, maxWidth: Infinity })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = getRenderText.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, x: x, y: y },
                { letter: '好', letterWidth: mockTextWidth, x: x + mockTextWidth, y: y },
                { letter: '书', letterWidth: mockTextWidth, x: x + mockTextWidth * 2, y: y },
                { letter: '院', letterWidth: mockTextWidth, x: x + mockTextWidth * 3, y: y },
            ])
        })

        it('不换行 && 超过maxWidth', () => {
            const ratio = 2
            const mockX = 2
            const mockY = 3
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: text === '.... ' ? 44 : mockTextWidth,
                    }
                },
            }
            const options = getConfig.call({ ratio }, mockX, mockY, { wrap: false, maxWidth: 50 })
            const mockText = [{ letter: '静', extra: 'other' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = getRenderText.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, x: x, y: y, extra: 'other' },
                { letter: '.... ', letterWidth: 44, x: x + mockTextWidth, y: y, extra: 'other' },
            ])
        })

        it('换行 && 不超过maxWidth', () => {
            const ratio = 2
            const mockX = 2
            const mockY = 3
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: text === '.... ' ? 44 : mockTextWidth,
                    }
                },
            }
            const options = getConfig.call({ ratio }, mockX, mockY, { wrap: true, maxWidth: Infinity })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = getRenderText.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, x: x, y: y },
                { letter: '好', letterWidth: mockTextWidth, x: x + mockTextWidth, y: y },
                { letter: '书', letterWidth: mockTextWidth, x: x + mockTextWidth * 2, y: y },
                { letter: '院', letterWidth: mockTextWidth, x: x + mockTextWidth * 3, y: y },
            ])
        })

        it('限制换行 && 超过maxWidth', () => {
            const ratio = 2
            const mockX = 2
            const mockY = 3
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: text === '.... ' ? 44 : mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const options = getConfig.call({ ratio }, mockX, mockY, { wrap: 1, maxWidth: 25, lineHeight: mockLineHeight })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = getRenderText.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, x: x, y: y },
                { letter: '好', letterWidth: mockTextWidth, x: x, y: y + lineHeight },
                { letter: '.... ', letterWidth: 44, x: x + mockTextWidth, y: y + lineHeight },
            ])
        })

        it('不限制换行 && 超过maxWidth', () => {
            const ratio = 2
            const mockX = 2
            const mockY = 3
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: text === '.... ' ? 44 : mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const options = getConfig.call({ ratio }, mockX, mockY, { wrap: true, maxWidth: 40, lineHeight: mockLineHeight })
            const mockText = [
                { letter: '静' }, { letter: '好' },
                { letter: '书' }, { letter: '院' },
                { letter: '静' }, { letter: '好' },
            ]
            const res = getRenderText.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, x: x, y: y },
                { letter: '好', letterWidth: mockTextWidth, x: x + mockTextWidth, y: y },
                { letter: '书', letterWidth: mockTextWidth, x: x, y: y + lineHeight },
                { letter: '院', letterWidth: mockTextWidth, x: x + mockTextWidth, y: y + lineHeight },
                { letter: '静', letterWidth: mockTextWidth, x: x, y: y + lineHeight * 2 },
                { letter: '好', letterWidth: mockTextWidth, x: x + mockTextWidth, y: y + lineHeight * 2 },
            ])
        })

        it('首字母下划线 && 子间距', () => {
            const mockX = 2
            const mockY = 3
            const mockTextWidth = 33
            const mockLeft = 10
            const mockRight = 11
            const mockBottom = 6
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: text === '.... ' ? 44 : mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const mockLetterSpacing = 2
            const mockText = [
                { letter: '静', underline: true },
                { letter: '好' },
                { letter: '书' },
                { letter: '院' },
            ]
            const res = getRenderText.call({ context: mockContext }, mockText, {
                x: mockX, y: mockY,
                maxWidth: 100,
                wrap: Infinity,
                lineHeight: mockLineHeight,
                letterSpacing: mockLetterSpacing,
                underline: {
                    left: mockLeft,
                    right: mockRight,
                    bottom: mockBottom,
                },
            })

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, underline: true, x: mockX + mockLeft, y: mockY },
                { letter: '好', letterWidth: mockTextWidth, x: mockX + mockLeft + mockTextWidth + mockRight + mockLetterSpacing + mockRight, y: mockY },
                { letter: '书', letterWidth: mockTextWidth, x: mockX, y: mockY + mockLineHeight },
                { letter: '院', letterWidth: mockTextWidth, x: mockX + mockTextWidth + mockLetterSpacing, y: mockY + mockLineHeight },
            ])
        })

        it('下划线换行 && 子间距', () => {
            const mockX = 2
            const mockY = 3
            const mockTextWidth = 33
            const mockLeft = 10
            const mockRight = 11
            const mockBottom = 6
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: text === '.... ' ? 44 : mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const mockLetterSpacing = 2
            const mockText = [
                { letter: '静' },
                { letter: '好', underline: true },
                { letter: '书', underline: true },
                { letter: '院' },
            ]
            const res = getRenderText.call({ context: mockContext }, mockText, {
                x: mockX, y: mockY,
                maxWidth: 100,
                wrap: Infinity,
                lineHeight: mockLineHeight,
                letterSpacing: mockLetterSpacing,
                underline: {
                    left: mockLeft,
                    right: mockRight,
                    bottom: mockBottom,
                },
            })

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, x: mockX, y: mockY },
                { letter: '好', letterWidth: mockTextWidth, underline: true, x: mockX + mockTextWidth + mockLetterSpacing + mockLeft * 2, y: mockY },
                { letter: '书', letterWidth: mockTextWidth, underline: true, x: mockX, y: mockY + mockLineHeight },
                { letter: '院', letterWidth: mockTextWidth, x: mockX + mockTextWidth + mockLetterSpacing + mockRight * 2, y: mockY + mockLineHeight },
            ])
        })

        it('尾字母下划线 && 子间距', () => {
            const mockX = 2
            const mockY = 3
            const mockTextWidth = 33
            const mockLeft = 10
            const mockRight = 11
            const mockBottom = 6
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: text === '.... ' ? 44 : mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const mockLetterSpacing = 2
            const mockText = [
                { letter: '静' },
                { letter: '好' },
                { letter: '书' },
                { letter: '院', underline: true },
            ]
            const res = getRenderText.call({ context: mockContext }, mockText, {
                x: mockX, y: mockY,
                maxWidth: 100,
                wrap: Infinity,
                lineHeight: mockLineHeight,
                letterSpacing: mockLetterSpacing,
                underline: {
                    left: mockLeft,
                    right: mockRight,
                    bottom: mockBottom,
                },
            })

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, x: mockX, y: mockY },
                { letter: '好', letterWidth: mockTextWidth, x: mockX + mockTextWidth + mockLetterSpacing, y: mockY },
                { letter: '书', letterWidth: mockTextWidth, x: mockX, y: mockY + mockLineHeight },
                { letter: '院', letterWidth: mockTextWidth, underline: true, x: mockX + mockTextWidth + mockLetterSpacing + mockLeft * 2, y: mockY + mockLineHeight },
            ])
        })

        it('文字居中', () => {
            const ratio = 2
            const mockX = 20
            const mockY = 3
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        width: mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const options = getConfig.call({ ratio }, mockX, mockY, { wrap: true, maxWidth: Infinity, lineHeight: mockLineHeight, align: 'center' })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = getRenderText.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const actualWidth = mockTextWidth * 4

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, x: x - actualWidth / 2, y: y },
                { letter: '好', letterWidth: mockTextWidth, x: x - actualWidth / 2 + mockTextWidth, y: y },
                { letter: '书', letterWidth: mockTextWidth, x: x - actualWidth / 2 + mockTextWidth * 2, y: y },
                { letter: '院', letterWidth: mockTextWidth, x: x - actualWidth / 2 + mockTextWidth * 3, y: y },
            ])
        })

        it('文字右对齐', () => {
            const ratio = 2
            const mockX = 200
            const mockY = 3
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        width: mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const options = getConfig.call({ ratio }, mockX, mockY, { wrap: true, maxWidth: Infinity, lineHeight: mockLineHeight, align: 'right' })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = getRenderText.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const actualWidth = mockTextWidth * 4

            assert.deepStrictEqual(res, [
                { letter: '静', letterWidth: mockTextWidth, x: x - actualWidth, y: y },
                { letter: '好', letterWidth: mockTextWidth, x: x - actualWidth + mockTextWidth, y: y },
                { letter: '书', letterWidth: mockTextWidth, x: x - actualWidth + mockTextWidth * 2, y: y },
                { letter: '院', letterWidth: mockTextWidth, x: x - actualWidth + mockTextWidth * 3, y: y },
            ])
        })
    })

    describe('getRenderUnderlines', () => {
        it('下划线换行', () => {
            const mockX = 20
            const mockY = 30
            const mockTextWidth = 33
            const mockLineHeight = 45
            const mockSize = 66
            const mockLeft = 10
            const mockRight = 11
            const mockBottom = 6
            const mockText = [
                { letter: '静' },
                { letter: '好', underline: true, x: mockX + 33, y: mockY, letterWidth: mockTextWidth },
                { letter: '书', underline: true, x: mockX, y: mockY + mockLineHeight, letterWidth: mockTextWidth },
                { letter: '院' },
            ]
            const res = getRenderUnderlines.call({}, mockText, {
                size: mockSize,
                underline: {
                    left: mockLeft,
                    right: mockRight,
                    bottom: mockBottom,
                },
            })

            assert.deepStrictEqual(res, [
                {
                    startLetter: '好',
                    endLetter: '好',
                    startX: mockX + 33 - mockLeft,
                    startY: mockY + mockSize + mockBottom,
                    endX: mockX + 33 + mockTextWidth,
                    endY: mockY + mockSize + mockBottom,
                },
                {
                    startLetter: '书',
                    endLetter: '书',
                    startX: mockX,
                    startY: mockY + mockLineHeight + mockSize + mockBottom,
                    endX: mockX + mockTextWidth + mockRight,
                    endY: mockY + mockLineHeight + mockSize + mockBottom,
                },
            ])
        })
    })

    describe('getRenderThroughes', () => {
        it('删除线换行', () => {
            const mockX = 20
            const mockY = 30
            const mockTextWidth = 33
            const mockLineHeight = 45
            const mockSize = 66
            const mockText = [
                { letter: '静' },
                { letter: '好', through: true, x: mockX + 99, y: mockY, letterWidth: mockTextWidth },
                { letter: '书', through: true, x: mockX, y: mockY + mockLineHeight, letterWidth: mockTextWidth },
                { letter: '院' },
            ]
            const res = getRenderThroughes.call({}, mockText, {
                size: mockSize,
            })

            assert.deepStrictEqual(res, [
                {
                    startLetter: '好',
                    endLetter: '好',
                    startX: mockX + 99,
                    startY: mockY + mockSize * 2 / 3,
                    endX: mockX + 99 + mockTextWidth,
                    endY: mockY + mockSize * 2 / 3,
                },
                {
                    startLetter: '书',
                    endLetter: '书',
                    startX: mockX,
                    startY: mockY + mockLineHeight + mockSize * 2 / 3,
                    endX: mockX + mockTextWidth,
                    endY: mockY + mockLineHeight + mockSize * 2 / 3,
                },
            ])
        })
    })
})
