const _log = process.env.NODE_ENV !== 'test' ? console.log : () => {}

export default _log
