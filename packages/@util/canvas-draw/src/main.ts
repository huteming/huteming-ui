import { autobind, time } from 'core-decorators'
import drawArc from './drawArc'
import drawText from './drawText'
import drawRect from './drawRect'
import drawLine from './drawLine'
import drawImage from './drawImage'
import getBlurryArea from './getBlurryArea'
import { Draw, Render } from './declare/abstract'
import { ImageTypes } from './declare/enum'
import { DrawArcOption, DrawArcConfig } from './declare/drawArc'
import { DrawImageOption, DrawImageConfig } from './declare/drawImage'

@autobind
export default class CanvasDraw extends Draw implements Render {
    @time('drawImage')
    drawImage (this: Draw, image: HTMLImageElement | HTMLCanvasElement, x: number, y: number, width: number, height: number, options: DrawImageOption): DrawImageConfig {
        return drawImage.call(this, image, x, y, width, height, options)
    }

    @time('drawArc')
    drawArc (this: Draw, x: number, y: number, r: number, options: DrawArcOption): DrawArcConfig {
        return drawArc.call(this, x, y, r, options)
    }

    drawText = drawText.bind(this)
    drawRect = drawRect.bind(this)
    drawLine = drawLine.bind(this)
    getBlurryArea = getBlurryArea.bind(this)

    add (callback: (instance?: Draw) => void): Draw {
        if (typeof callback !== 'function') {
            return this
        }
        this._callbacks.push(callback)
        return this
    }

    onerror (callback: Function): void {
        this._onerror = callback
    }

    done (type = ImageTypes.PNG): string {
        this._callbacks.forEach(handler => {
            try {
                this.context.save()
                handler(this)
            } catch (err) {
                this._onerror(err)
            } finally {
                this.context.restore()
            }
        })
        const dataURL = this.canvas.toDataURL(`image/${type}`, 1.0)

        return dataURL
    }
}
