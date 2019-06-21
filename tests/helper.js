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

export function mockProperty (property, value, target = window) {
    const { [property]: originalProperty } = target
    delete target[property]

    beforeAll(() => {
        Object.defineProperty(target, property, {
            configurable: true,
            writable: true,
            value,
        })
    })

    afterAll(() => {
        target[property] = originalProperty
    })
}
