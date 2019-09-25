import assert from 'assert'
import TmCell from 'web-ui/cell/src/app.vue'

describe('cell', () => {
    it('name', () => {
        assert.strictEqual(TmCell.name, 'TmCell')
    })
})
