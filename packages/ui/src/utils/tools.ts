export function log (...args: any[]) {
    if (process.env.NODE_ENV !== 'test') {
        console.log('@huteming Logger [Log]:', ...args)
    }
}
