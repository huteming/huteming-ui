import { PropsState } from '../../types'

let zIndex = 2000

const state = {
    zIndex: zIndex,
}

Object.defineProperty(state, 'zIndex', {
    get () {
        return zIndex++
    },
    set (val) {
        zIndex = val
    },
})

function withState (): PropsState {
    return {
        type: Object,
        default () {
            return state
        },
    }
}

withState.state = state

export default withState
