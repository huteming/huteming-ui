export const jsonToForm = (data) => {
    const params = new FormData()

    for (let key in data) {
        params.append(key, data[key])
    }

    return params
}

export async function sleep (time) {
    await new Promise(resolve => setTimeout(resolve, time))
}

export function mockWindowProperty (property, value) {
    const { [property]: originalProperty } = window
    delete window[property]

    beforeAll(() => {
        Object.defineProperty(window, property, {
            configurable: true,
            writable: true,
            value,
        })
    })

    afterAll(() => {
        window[property] = originalProperty
    })
}
