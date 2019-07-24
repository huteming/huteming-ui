import assert from 'assert'
import sinon from 'sinon'
import CanvasDraw, { getArrayTextWidth } from 'web-util/canvas-draw/src/main'

describe('canvas > drawText', () => {
    it('默认配置参数', () => {
        const ins = new CanvasDraw()
        const _ratio = 2
        ins.ratio = _ratio
        const options = ins.drawText(111, 1, 1)

        assert.deepStrictEqual(options, {
            actualMaxHeight: 24,
            actualMaxWidth: 1.5,
            prefix: '',
            suffix: '',
            fix: '.... ',
            maxWidth: Infinity,
            style: 'normal',
            variant: 'normal',
            weight: 'normal',
            size: 24 * _ratio,
            lineHeight: 24 * _ratio,
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
        })
    })

    it('context配置设置', () => {
        const ins = new CanvasDraw()
        const _ratio = 2
        ins.ratio = _ratio
        const _style = 'oblique'
        const _variant = 'small-caps'
        const _weight = 'bolder'
        const _size = 32
        const _lineHeight = 90
        const _lineWidth = 100
        const _type = 'stroke'
        const _color = '#abc'
        const _shadowColor = '#ccc'
        const _shadowOffsetX = 30
        const _shadowOffsetY = 30
        const _shadowBlur = 40
        const _baseline = 'bottom'
        const options = {
            style: _style,
            variant: _variant,
            weight: _weight,
            size: _size,
            lineHeight: _lineHeight,
            lineWidth: _lineWidth,
            color: _color,
            shadowColor: _shadowColor,
            shadowOffsetX: _shadowOffsetX,
            shadowOffsetY: _shadowOffsetY,
            shadowBlur: _shadowBlur,
            baseline: _baseline,
            type: _type,
        }
        ins.drawText(111, 1, 1, options)

        const { font, lineWidth, shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur, textBaseline } = ins.context

        assert.strictEqual(font, `${_style} ${_variant} ${_weight} ${_size * _ratio}px/${_lineHeight * _ratio}px arial`)
        assert.strictEqual(lineWidth, _lineWidth)
        assert.strictEqual(ins.context[`${_type}Style`], _color)
        assert.strictEqual(shadowColor, _shadowColor)
        assert.strictEqual(shadowOffsetX, _shadowOffsetX * _ratio)
        assert.strictEqual(shadowOffsetY, _shadowOffsetY * _ratio)
        assert.strictEqual(shadowBlur, _shadowBlur * _ratio)
        assert.strictEqual(textBaseline, _baseline)
    })

    it('分组绘字', () => {
        const ins = new CanvasDraw()
        const _ratio = 2
        ins.ratio = _ratio
        let _x = 1
        let _y = 10
        let _letterSpacing = 10
        const _type = 'stroke'
        const draw = sinon.fake()
        sinon.replace(ins.context, `${_type}Text`, draw)
        const options = {
            letterSpacing: _letterSpacing,
            type: _type,
        }
        ins.drawText('测a试123用a123例123a', _x, _y, options)

        assert.strictEqual(draw.callCount, 8)

        let actualX = _x * _ratio
        let actualY = _y * _ratio
        let actualSpacing = _letterSpacing * _ratio
        void ['测', 'a', '试', '123', '用', 'a123', '例', '123a'].forEach((letter, index) => {
            const letterWidth = ins.context.measureText(letter).width

            ins.context[`${_type}Text`](letter, actualX, actualY)
            assert.deepStrictEqual(draw.getCall(index).args, [letter, actualX, actualY], `第${index}次参数不匹配`)
            actualX += letterWidth + actualSpacing
        })
    })

    it('不换行 && 超出最长限制', () => {
        const ins = new CanvasDraw()
        const _ratio = 1
        ins.ratio = _ratio
        let _x = 1
        let _y = 10
        const _prefix = 'prefix'
        const _suffix = 'suffix'
        const _fix = 'fix'
        const _type = 'stroke'
        const draw = sinon.fake()
        sinon.replace(ins.context, `${_type}Text`, draw)
        const options = {
            type: _type,
            wrap: false,
            maxWidth: 17,
            prefix: _prefix, // 占据宽度 6
            suffix: _suffix, // 占据宽度 6
            fix: _fix, // 占据宽度 3
        }
        const _text1 = '测' // 占据宽度 1
        const _text2 = '试' // 占据宽度 1
        const _text3 = '用' // 占据宽度 1
        const _text4 = '例' // 占据宽度 1
        const _text5 = '补充多余文字'
        ins.drawText(`${_text1}${_text2}${_text3}${_text4}${_text5}`, _x, _y, options)

        let actualX = _x * _ratio
        let actualY = _y * _ratio
        void [_prefix, _text1, `${_text2}${_fix}`, _suffix].forEach((letter, index) => {
            const letterWidth = ins.context.measureText(letter).width

            assert.deepStrictEqual(draw.getCall(index).args, [letter, actualX, actualY], `第${index}次参数不匹配`)
            actualX += letterWidth
        })
    })

    it('align === center', () => {
        const ins = new CanvasDraw()
        const _ratio = 2
        ins.ratio = _ratio
        let _x = 100
        let _y = 10
        const _text = '测试用例'
        const draw = sinon.fake()
        sinon.replace(ins.context, 'fillText', draw)
        const options = {
            align: 'center',
        }
        ins.drawText(_text, _x, _y, options)

        let x = _x * _ratio
        const totalWidth = ins.context.measureText(_text).width
        const [letter, actualX] = draw.getCall(0).args
        assert.strictEqual(letter, '测')
        assert.strictEqual(actualX, x - totalWidth / 2)
    })

    it('align === right', () => {
        const ins = new CanvasDraw()
        const _ratio = 2
        ins.ratio = _ratio
        let _x = 100
        let _y = 10
        const _text = '测试用例'
        const draw = sinon.fake()
        sinon.replace(ins.context, 'fillText', draw)
        const options = {
            align: 'right',
        }
        ins.drawText(_text, _x, _y, options)

        let x = _x * _ratio
        const totalWidth = ins.context.measureText(_text).width
        const [letter, actualX] = draw.getCall(0).args
        assert.strictEqual(letter, '测')
        assert.strictEqual(actualX, x - totalWidth)
    })

    it('换行', () => {
        const ins = new CanvasDraw()
        const _ratio = 1
        ins.ratio = _ratio
        const _x = 1
        const _y = 10
        const _lineHeight = 20
        const draw = sinon.fake()
        sinon.replace(ins.context, 'fillText', draw)
        const options = {
            wrap: true,
            lineHeight: _lineHeight,
            maxWidth: 1,
        }
        const _text1 = '测' // 占据宽度 1
        const _text2 = '试' // 占据宽度 1
        const _text3 = '用' // 占据宽度 1
        const _text4 = '例' // 占据宽度 1
        ins.drawText(`${_text1}${_text2}${_text3}${_text4}`, _x, _y, options)

        let actualX = _x * _ratio
        let actualY = _y * _ratio
        const actualLineHeight = _lineHeight * _ratio
        void [_text1, _text2, _text3, _text4].forEach((letter, index) => {
            assert.deepStrictEqual(draw.getCall(index).args, [letter, actualX, actualY], `第${index}次参数不匹配`)
            actualY += actualLineHeight
        })
    })

    it('prefix 与 text 之间存在 letterSpacing', () => {
        const ins = new CanvasDraw()
        const _text = '测试文案'
        const _letterSpacing = 30
        const width = getArrayTextWidth.call(ins, _text.split(''), _letterSpacing, true)

        assert.strictEqual(width, ins.context.measureText(_text).width + (_text.length - 1) * _letterSpacing + _letterSpacing)
    })
})
