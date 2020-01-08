/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

import Vue from 'vue'

const DIVIDER_ELEMENT = '__'
const DIVIDER_MODIFIER = '--'

type Modifier = string | {[key: string]: any}
type Modifiers = Modifier | Modifier[]

export default function createBEM (block: string) {
  let hasInitScope = false

  return function (el?: Modifiers, modifier?: Modifiers) {
    if (!hasInitScope) {
      const scope = (Vue.prototype.$HUTEMING || {}).scopeClass || 'tm'
      block = `${scope}-${block}`
      hasInitScope = true
    }
    if (el && typeof el !== 'string') {
      modifier = el
      el = ''
    }
    el = join(block, el, DIVIDER_ELEMENT)
    return modifier ? [el, suffix(el, modifier)] : el
  }
}

function join (block: string, str?: string, divider?: string): string {
  return str ? `${block}${divider}${str}` : block
}

function suffix (block: string, modifier: Modifiers): Modifiers {
  if (typeof modifier === 'string') {
    return join(block, modifier, DIVIDER_MODIFIER)
  }
  if (Array.isArray(modifier)) {
    return modifier.map(item => suffix(block, item))
  }

  const output: Modifier = {}
  Object.keys(modifier).forEach(item => {
    const key = join(block, item, DIVIDER_MODIFIER)
    output[key] = modifier[item]
  })
  return output
}
