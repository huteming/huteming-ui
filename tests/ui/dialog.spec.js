import TmDialog from 'web-ui/dialog/src/dialog'
import assert from 'assert'
import { mount } from '@vue/test-utils'
import { sleep } from '../helper'

describe('dialog', () => {
    it('create', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmDialog v-model="visible" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
            components: {
                TmDialog,
            },
        })
        await sleep()
        const wrapperDialog = wrapper.find('.tm-dialog')
        assert.strictEqual(wrapperDialog.isVisible(), true)
    })
})
