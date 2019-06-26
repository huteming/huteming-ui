import { IMG_FAILURE_SRC, IMG_SUCCESS_SRC } from './constant'

export const jsonToForm = (data) => {
    const params = new FormData()

    for (let key in data) {
        params.append(key, data[key])
    }

    return params
}

export async function sleep (time = 50) {
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
            if (src && src.indexOf(IMG_FAILURE_SRC) > -1) {
                setTimeout(() => this.onerror(new Error('mocked image error')))
            } else if (src && src.indexOf(IMG_SUCCESS_SRC) > -1) {
                setTimeout(() => this.onload())
            }
            this.setAttribute('src', src)
        },
        get () {
            return this.getAttribute('src')
        },
    })
}
