import { IMG_FAILURE_SRC, IMG_SUCCESS_SRC, BLOG_FAILURE, imgURI, IMG_FAILURE_DATAURI } from './constant'
import sinon from 'sinon'

export function cleanModal () {
    const el = document.querySelector('.tm-modal')
    if (!el) return
    if (el.parentNode) {
        el.parentNode.removeChild(el)
    }
    if (el.__vue__) {
        el.__vue__.$destroy()
    }
}

export function getLastDateOfMonth (year, month) {
    return new Date(year, month + 1, 0).getDate()
}

export const jsonToForm = (data) => {
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
    constructor (target, property, define) {
        this.target = target
        this.property = property
        this.originDescriptor = Object.getOwnPropertyDescriptor(target, property)
        this.defineDescriptor = Object.assign({ configurable: true }, define)
    }

    replace () {
        Object.defineProperty(this.target, this.property, this.defineDescriptor)
    }

    restore () {
        Object.defineProperty(this.target, this.property, this.originDescriptor)
    }
}

export function mockProperty (target, property, define) {
    const mock = new Mock(target, property, define)

    beforeAll(() => {
        mock.replace()
    })

    afterAll(() => {
        mock.restore()
    })
}

export function mockImage () {
    mockProperty(Image.prototype, 'src', {
        set (src) {
            if (src && (src.indexOf(IMG_FAILURE_SRC) > -1 || src.indexOf(IMG_FAILURE_DATAURI) > -1)) {
                setTimeout(() => this.onerror(new Error('mocked image error')))
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
        value (file) {
            if (file && file === BLOG_FAILURE) {
                setTimeout(() => this.onerror(new Error('mocked FileReader error')))
            } else {
                setTimeout(() => {
                    sinon.replaceGetter(this, 'result', () => {
                        return imgURI
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
