let zIndex = 2000

const Manager = {
}

Object.defineProperty(Manager, 'zIndex', {
    get () {
        return zIndex++
    },
    set (val) {
        zIndex = val
    },
})

export default Manager
