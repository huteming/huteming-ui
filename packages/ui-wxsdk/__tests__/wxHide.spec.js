import { wxHide } from '../src/main'
import assert from 'assert'
import sinon from 'sinon'

describe('wxsdk > wxHide', () => {
  let hideMenuItems

  beforeEach(() => {
    hideMenuItems = sinon.fake()

    global.wx = {
      hideMenuItems,
    }
  })

  afterEach(() => {
    sinon.restore()
    global.wx = null
  })

  it('调用参数格式', () => {
    wxHide()

    const actual = hideMenuItems.getCall(0).args[0]
    const expect = {
      menuList: [
        'menuItem:share:timeline',
        'menuItem:share:appMessage',
      ]
    }
    assert.deepStrictEqual(actual, expect)
  })
})
