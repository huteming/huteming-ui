import { isInContainer } from '../src/main'
import assert from 'assert'
import { mockProperty } from 'tests/helper'

describe('element > inInContainer', () => {
    mockProperty(window, 'innerWidth', {
        value: 375,
    })
    mockProperty(window, 'innerHeight', {
        value: 1034,
    })

    it('el 不存在', () => {
        const valid = isInContainer()
        assert.strictEqual(valid, false)
    })

    it('container 不存在', () => {
        const valid = isInContainer(true)
        assert.strictEqual(valid, false)
    })

    it('container is html', () => {
        const el = {
            getBoundingClientRect () {
                return {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                }
            },
        }
        void [window, document, document.documentElement].forEach(container => {
            const valid = isInContainer(el, container)
            assert.ok(valid)
        })
    })

    it('container is node', () => {
        const el = {
            getBoundingClientRect () {
                return {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                }
            },
        }
        const container = {
            getBoundingClientRect () {
                return {
                    top: 0,
                    bottom: 20,
                    left: 0,
                    right: 20,
                }
            },
        }
        const valid = isInContainer(el, container)
        assert.ok(valid)
    })

    it('top > bottom', () => {
        const el = {
            getBoundingClientRect () {
                return {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                }
            },
        }
        const container = {
            getBoundingClientRect () {
                return {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 20,
                }
            },
        }
        const valid = isInContainer(el, container)
        assert.strictEqual(valid, false)
    })

    it('bottom < top', () => {
        const el = {
            getBoundingClientRect () {
                return {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                }
            },
        }
        const container = {
            getBoundingClientRect () {
                return {
                    top: 20,
                    bottom: 20,
                    left: 0,
                    right: 20,
                }
            },
        }
        const valid = isInContainer(el, container)
        assert.strictEqual(valid, false)
    })

    it('right < left', () => {
        const el = {
            getBoundingClientRect () {
                return {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                }
            },
        }
        const container = {
            getBoundingClientRect () {
                return {
                    top: 0,
                    bottom: 20,
                    left: 20,
                    right: 20,
                }
            },
        }
        const valid = isInContainer(el, container)
        assert.strictEqual(valid, false)
    })

    it('left > right', () => {
        const el = {
            getBoundingClientRect () {
                return {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                }
            },
        }
        const container = {
            getBoundingClientRect () {
                return {
                    top: 0,
                    bottom: 20,
                    left: 0,
                    right: 0,
                }
            },
        }
        const valid = isInContainer(el, container)
        assert.strictEqual(valid, false)
    })
})
