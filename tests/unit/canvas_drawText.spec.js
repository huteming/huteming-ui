import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw, { getOptions, setContextOptions, parseUnderline, parseType } from 'web-util/canvas-draw/src/drawText'

describe('canvas > drawText', () => {
    it('getOptions', () => {
        const ratio = 2
        const x = 2
        const y = 3
        const res = getOptions.call({ ratio }, x, y)

        assert.deepStrictEqual(res, {
            x: x * ratio,
            y: y * ratio,
            prefix: '',
            suffix: '',
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

    it('parseType', () => {
        const text = [{ letter: 'hello123中文world', other: 'other' }]
        const res = parseType(text)
        assert.deepStrictEqual(res, [
            { letter: 'hello123', other: 'other' },
            { letter: '中', other: 'other' },
            { letter: '文', other: 'other' },
            { letter: 'world', other: 'other' },
        ])
    })
})
