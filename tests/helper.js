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

export function mockProperty (target, property, define) {
    // const { [property]: originalProperty } = target
    const originDescriptor = Object.getOwnPropertyDescriptor(target, property)
    // delete target[property]
    define = Object.assign({ configurable: true }, define)

    beforeAll(() => {
        Object.defineProperty(target, property, define)
    })

    afterAll(() => {
        // target[property] = originalProperty
        Object.defineProperty(target, property, originDescriptor)
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
