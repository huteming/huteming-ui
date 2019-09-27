import assert from 'assert'
import sinon from 'sinon'
import drawText, { getOptions, setContextOptions, parseUnderline, parseType, parsePosition, addStatistic } from 'web-util/canvas-draw/src/drawText'

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
        const options = drawText.call(mockSelf, '<underline>hello</underline>', 1, 2)
        // 这里不方便计算统计数据，删除
        // 在函数中测试
        delete options.actualMaxWidth
        delete options.actualMaxHeight
        const _options = getOptions.call(mockSelf, 1, 2)
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

    it('getOptions', () => {
        const ratio = 2
        const x = 2
        const y = 3
        const res = getOptions.call({ ratio }, x, y)

        assert.deepStrictEqual(res, {
            x: x * ratio,
            y: y * ratio,
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
            wrap: false,
            shadowColor: '',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            color: '#000',
            type: 'fill',
            underline: {
                left: 10 * ratio,
                right: 10 * ratio,
                bottom: 6 * ratio,
                dashed: [],
                lineWidth: 1,
            },
        })
    })

    it('setContextOptions', () => {
        const mockContext = {}
        const mockScaleBySystem = 2
        const options = getOptions.call({ ratio: 1 }, 2, 3)
        setContextOptions.call({ context: mockContext, scaleBySystem: mockScaleBySystem }, options)

        assert.strictEqual(mockContext.font, `${options.style} ${options.variant} ${options.weight} ${options.size / mockScaleBySystem}px/${options.lineHeight}px arial`)
        assert.strictEqual(mockContext.lineWidth, options.lineWidth)
        assert.strictEqual(mockContext[`${options.type}Style`], options.color)
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

    describe('parsePosition.letters', () => {
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
            const options = getOptions.call({ ratio }, mockX, mockY, { wrap: false, maxWidth: Infinity })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio

            assert.deepStrictEqual(res[0], [
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
            const options = getOptions.call({ ratio }, mockX, mockY, { wrap: false, maxWidth: 50 })
            const mockText = [{ letter: '静', extra: 'other' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio

            assert.deepStrictEqual(res[0], [
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
            const options = getOptions.call({ ratio }, mockX, mockY, { wrap: true, maxWidth: Infinity })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio

            assert.deepStrictEqual(res[0], [
                { letter: '静', letterWidth: mockTextWidth, x: x, y: y },
                { letter: '好', letterWidth: mockTextWidth, x: x + mockTextWidth, y: y },
                { letter: '书', letterWidth: mockTextWidth, x: x + mockTextWidth * 2, y: y },
                { letter: '院', letterWidth: mockTextWidth, x: x + mockTextWidth * 3, y: y },
            ])
        })

        it('换行 && 超过maxWidth', () => {
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
            const options = getOptions.call({ ratio }, mockX, mockY, { wrap: true, maxWidth: 50, lineHeight: mockLineHeight })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio

            assert.deepStrictEqual(res[0], [
                { letter: '静', letterWidth: mockTextWidth, x: x, y: y },
                { letter: '好', letterWidth: mockTextWidth, x: x + mockTextWidth, y: y },
                { letter: '书', letterWidth: mockTextWidth, x: x + mockTextWidth * 2, y: y },
                { letter: '院', letterWidth: mockTextWidth, x: x, y: y + lineHeight },
            ])
        })

        it('换行 && 超过maxWidth && 下划线 && 子间距', () => {
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
            const mockLetterSpacing = 2
            const options = getOptions.call({ ratio }, mockX, mockY, { wrap: true, maxWidth: 50, lineHeight: mockLineHeight, letterSpacing: mockLetterSpacing })
            const mockText = [
                { letter: '静', underline: true },
                { letter: '好', underline: true },
                { letter: '书', underline: true },
                { letter: '院', underline: true },
            ]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const letterSpacing = mockLetterSpacing * ratio
            const left = 10 * ratio

            assert.deepStrictEqual(res[0], [
                { letter: '静', letterWidth: mockTextWidth, x: x + left, y: y, underline: true },
                { letter: '好', letterWidth: mockTextWidth, x: x + left + mockTextWidth + letterSpacing, y: y, underline: true },
                { letter: '书', letterWidth: mockTextWidth, x: x, y: y + lineHeight, underline: true },
                { letter: '院', letterWidth: mockTextWidth, x: x + mockTextWidth + letterSpacing, y: y + lineHeight, underline: true },
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
            const options = getOptions.call({ ratio }, mockX, mockY, { wrap: true, maxWidth: Infinity, lineHeight: mockLineHeight, align: 'center' })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const actualWidth = mockTextWidth * 4

            assert.deepStrictEqual(res[0], [
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
            const options = getOptions.call({ ratio }, mockX, mockY, { wrap: true, maxWidth: Infinity, lineHeight: mockLineHeight, align: 'right' })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const actualWidth = mockTextWidth * 4

            assert.deepStrictEqual(res[0], [
                { letter: '静', letterWidth: mockTextWidth, x: x - actualWidth, y: y },
                { letter: '好', letterWidth: mockTextWidth, x: x - actualWidth + mockTextWidth, y: y },
                { letter: '书', letterWidth: mockTextWidth, x: x - actualWidth + mockTextWidth * 2, y: y },
                { letter: '院', letterWidth: mockTextWidth, x: x - actualWidth + mockTextWidth * 3, y: y },
            ])
        })
    })

    describe('parsePosition.underlines', () => {
        it('段落首字母下划线', () => {
            const ratio = 2
            const mockX = 20
            const mockY = 30
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const mockLetterSpacing = 2
            const mockSize = 66
            const options = getOptions.call({ ratio }, mockX, mockY, {
                wrap: true,
                maxWidth: 100,
                lineHeight: mockLineHeight,
                letterSpacing: mockLetterSpacing,
                size: mockSize,
            })
            const mockText = [{ letter: '静', underline: true }, { letter: '好' }, { letter: '书' }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const letterSpacing = mockLetterSpacing * ratio
            const left = 10 * ratio
            const right = 10 * ratio
            const bottom = 6 * ratio
            const size = mockSize * ratio

            assert.deepStrictEqual(res[1], [
                {
                    startLetter: '静',
                    endLetter: '静',
                    startX: x,
                    startY: y + size + bottom,
                    endX: x + left + mockTextWidth + right,
                    endY: y + size + bottom,
                },
            ])
        })

        it('行首字母下划线', () => {
            const ratio = 2
            const mockX = 20
            const mockY = 30
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const mockLetterSpacing = 2
            const mockSize = 66
            const options = getOptions.call({ ratio }, mockX, mockY, {
                wrap: true,
                maxWidth: 40,
                lineHeight: mockLineHeight,
                letterSpacing: mockLetterSpacing,
                size: mockSize,
            })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书', underline: true }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const letterSpacing = mockLetterSpacing * ratio
            const left = 10 * ratio
            const right = 10 * ratio
            const bottom = 6 * ratio
            const size = mockSize * ratio

            assert.deepStrictEqual(res[1], [
                {
                    startLetter: '书',
                    endLetter: '书',
                    startX: x,
                    startY: y + lineHeight + size + bottom,
                    endX: x + left + mockTextWidth + right,
                    endY: y + lineHeight + size + bottom,
                },
            ])
        })

        it('下划线换行', () => {
            const ratio = 2
            const mockX = 20
            const mockY = 30
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const mockLetterSpacing = 2
            const mockSize = 66
            const options = getOptions.call({ ratio }, mockX, mockY, {
                wrap: true,
                maxWidth: 40,
                lineHeight: mockLineHeight,
                letterSpacing: mockLetterSpacing,
                size: mockSize,
            })
            const mockText = [{ letter: '静' }, { letter: '好', underline: true }, { letter: '书', underline: true }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const letterSpacing = mockLetterSpacing * ratio
            const left = 10 * ratio
            const right = 10 * ratio
            const bottom = 6 * ratio
            const size = mockSize * ratio

            assert.deepStrictEqual(res[1], [
                {
                    startLetter: '好',
                    endLetter: '好',
                    startX: x + mockTextWidth + letterSpacing + left,
                    startY: y + size + bottom,
                    endX: x + mockTextWidth + letterSpacing + left * 2 + mockTextWidth,
                    endY: y + size + bottom,
                },
                {
                    startLetter: '书',
                    endLetter: '书',
                    startX: x,
                    startY: y + lineHeight + size + bottom,
                    endX: x + mockTextWidth + right,
                    endY: y + lineHeight + size + bottom,
                },
            ])
        })

        it('尾字母下划线', () => {
            const ratio = 2
            const mockX = 20
            const mockY = 30
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const mockLetterSpacing = 2
            const mockSize = 66
            const options = getOptions.call({ ratio }, mockX, mockY, {
                wrap: true,
                maxWidth: 200,
                lineHeight: mockLineHeight,
                letterSpacing: mockLetterSpacing,
                size: mockSize,
            })
            const mockText = [{ letter: '静' }, { letter: '好' }, { letter: '书' }, { letter: '院', underline: true }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const letterSpacing = mockLetterSpacing * ratio
            const left = 10 * ratio
            const right = 10 * ratio
            const bottom = 6 * ratio
            const size = mockSize * ratio

            assert.deepStrictEqual(res[1], [
                {
                    startLetter: '院',
                    endLetter: '院',
                    startX: x + mockTextWidth * 3 + letterSpacing * 3 + left,
                    startY: y + size + bottom,
                    endX: x + mockTextWidth * 3 + letterSpacing * 3 + left * 2 + mockTextWidth + right,
                    endY: y + size + bottom,
                },
            ])
        })

        it('自定义下划线参数', () => {
            const ratio = 2
            const mockX = 20
            const mockY = 30
            const mockTextWidth = 33
            const mockContext = {
                measureText (text) {
                    return {
                        // fix文案的长度更长，模拟出现添加fix之后不会超过maxWidth
                        width: mockTextWidth,
                    }
                },
            }
            const mockLineHeight = 45
            const mockLetterSpacing = 2
            const mockSize = 66
            const options = getOptions.call({ ratio }, mockX, mockY, {
                wrap: true,
                maxWidth: 40,
                lineHeight: mockLineHeight,
                letterSpacing: mockLetterSpacing,
                size: mockSize,
                underline: {
                    left: 12,
                },
            })
            const mockText = [{ letter: '静' }, { letter: '好', underline: true }, { letter: '书', underline: true }, { letter: '院' }]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const letterSpacing = mockLetterSpacing * ratio
            const left = 12 * ratio
            const right = 10 * ratio
            const bottom = 6 * ratio
            const size = mockSize * ratio

            assert.deepStrictEqual(res[1], [
                {
                    startLetter: '好',
                    endLetter: '好',
                    startX: x + mockTextWidth + letterSpacing + left,
                    startY: y + size + bottom,
                    endX: x + mockTextWidth + letterSpacing + left * 2 + mockTextWidth,
                    endY: y + size + bottom,
                },
                {
                    startLetter: '书',
                    endLetter: '书',
                    startX: x,
                    startY: y + lineHeight + size + bottom,
                    endX: x + mockTextWidth + right,
                    endY: y + lineHeight + size + bottom,
                },
            ])
        })

        it('文字居中 && 全部下划线', () => {
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
            const mockSize = 55
            const options = getOptions.call({ ratio }, mockX, mockY, {
                wrap: true,
                maxWidth: Infinity,
                lineHeight: mockLineHeight,
                align: 'center',
                size: mockSize,
            })
            const mockText = [
                { letter: '静', underline: true },
                { letter: '好', underline: true },
                { letter: '书', underline: true },
                { letter: '院', underline: true },
            ]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const left = 10 * ratio
            const right = 10 * ratio
            const bottom = 6 * ratio
            const size = mockSize * ratio
            const actualWidth = mockTextWidth * 4 + left + right

            assert.deepStrictEqual(res[1], [
                {
                    startLetter: '静',
                    endLetter: '院',
                    startX: x - actualWidth / 2,
                    startY: y + size + bottom,
                    endX: x + actualWidth / 2,
                    endY: y + size + bottom,
                },
            ])
        })

        it('文字居中 && 局部下划线', () => {
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
            const mockSize = 55
            const options = getOptions.call({ ratio }, mockX, mockY, {
                wrap: true,
                maxWidth: Infinity,
                lineHeight: mockLineHeight,
                align: 'center',
                size: mockSize,
            })
            const mockText = [
                { letter: '静' },
                { letter: '好', underline: true },
                { letter: '书', underline: true },
                { letter: '院' },
            ]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const left = 10 * ratio
            const right = 10 * ratio
            const bottom = 6 * ratio
            const size = mockSize * ratio
            const actualWidth = mockTextWidth * 4 + left * 2 + right * 2

            assert.deepStrictEqual(res[1], [
                {
                    startLetter: '好',
                    endLetter: '书',
                    startX: x - actualWidth / 2 + mockTextWidth + left,
                    startY: y + size + bottom,
                    endX: x + actualWidth / 2 - mockTextWidth - right,
                    endY: y + size + bottom,
                },
            ])
        })

        it('文字右对齐 && 全部下划线', () => {
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
            const mockSize = 55
            const options = getOptions.call({ ratio }, mockX, mockY, {
                wrap: true,
                maxWidth: Infinity,
                lineHeight: mockLineHeight,
                align: 'right',
                size: mockSize,
            })
            const mockText = [
                { letter: '静', underline: true },
                { letter: '好', underline: true },
                { letter: '书', underline: true },
                { letter: '院', underline: true },
            ]
            const res = parsePosition.call({ context: mockContext }, mockText, options)
            const x = mockX * ratio
            const y = mockY * ratio
            const lineHeight = mockLineHeight * ratio
            const left = 10 * ratio
            const right = 10 * ratio
            const bottom = 6 * ratio
            const size = mockSize * ratio
            const actualWidth = mockTextWidth * 4 + left + right

            assert.deepStrictEqual(res[1], [
                {
                    startLetter: '静',
                    endLetter: '院',
                    startX: x - actualWidth,
                    startY: y + size + bottom,
                    endX: x,
                    endY: y + size + bottom,
                },
            ])
        })
    })
})
