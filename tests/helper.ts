import { IMG_FAILURE_SRC, IMG_SUCCESS_SRC, BLOG_FAILURE, DATAURI, IMG_FAILURE_DATAURI, IMG_LOADING_SRC } from './constant'
import sinon from 'sinon'

export function cleanDom (selector: any) {
    const el = document.querySelector(selector)
    if (!el) return
    if (el.parentNode) {
        el.parentNode.removeChild(el)
    }
    if (el.__vue__) {
        el.__vue__.$destroy()
    }
}

export function getLastDateOfMonth (year: any, month: any) {
    return new Date(year, month + 1, 0).getDate()
}

export const jsonToForm = (data: any) => {
    const params = new FormData()

    for (let key in data) {
        params.append(key, data[key])
    }

    return params
}

export async function sleep (time = 20) {
    await new Promise(resolve => setTimeout(resolve, time))
}

export class Mock {
    target: any
    property: any
    originDescriptor: any
    defineDescriptor: any

    constructor (target: any, property: any, define: any) {
        this.target = target
        this.property = property
        this.originDescriptor = Object.getOwnPropertyDescriptor(target, property) || {
            enumerable: false,
            writable: true,
            configurable: true,
            value: null,
        }
        this.defineDescriptor = Object.assign({ configurable: true }, define)

        this.replace = this.replace.bind(this)
        this.restore = this.restore.bind(this)
    }

    replace () {
        Object.defineProperty(this.target, this.property, this.defineDescriptor)
    }

    restore () {
        Object.defineProperty(this.target, this.property, this.originDescriptor)
    }
}

export function mockProperty (target: any, property: any, define: any) {
    const mock = new Mock(target, property, define)

    beforeAll(() => {
        mock.replace()
    })

    afterAll(() => {
        mock.restore()
    })
}

export function mockCancelable (value = true) {
    const mock = new Mock(Event.prototype, 'cancelable', {
        value,
    })
    mock.replace()

    return mock.restore
}

export function mockImage () {
    mockProperty(Image.prototype, 'src', {
        set (src: any) {
            if (src && (src.indexOf(IMG_FAILURE_SRC) > -1 || src.indexOf(IMG_FAILURE_DATAURI) > -1)) {
                setTimeout(() => this.onerror(new Error('mocked image error')))
            } else if (src === IMG_LOADING_SRC) {
                // hold
            } else {
                setTimeout(() => this.onload())
            }
            this.setAttribute('src', src)
        },
        get () {
            return this.getAttribute('src')
        },
    })
}

export function mockFileReader () {
    const mock = new Mock(FileReader.prototype, 'readAsDataURL', {
        value (file: any) {
            if (file && file === BLOG_FAILURE) {
                setTimeout(() => this.onerror(new Error('mocked FileReader error')))
            } else {
                setTimeout(() => {
                    sinon.replaceGetter(this, 'result', () => {
                        return DATAURI
                    })
                    this.onload()
                })
            }
        },
    })

    beforeAll(() => {
        mock.replace()
    })

    afterAll(() => {
        sinon.restore()
        mock.restore()
    })
}
