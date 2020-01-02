import { TextareaCalcResult } from '../types'

/**
 * 来自 element-ui input 组件
 * https://github.com/ElemeFE/element/blob/dev/packages/input/src/calcTextareaHeight.js
 */

let hiddenTextarea: HTMLTextAreaElement | null

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
]

function calculateNodeStyling (targetElement: HTMLTextAreaElement) {
  const style = window.getComputedStyle(targetElement)

  const boxSizing = style.getPropertyValue('box-sizing')

  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  )

  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  )

  const contextStyle = CONTEXT_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';')

  return { contextStyle, paddingSize, borderSize, boxSizing }
}

export default function calcTextareaHeight (targetElement: HTMLTextAreaElement, minRows = 1, maxRows = 0): TextareaCalcResult {
  /* istanbul ignore else */
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }

  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle,
  } = calculateNodeStyling(targetElement)

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`)
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || ''

  let height = hiddenTextarea.scrollHeight
  const result: TextareaCalcResult = {
    height: '',
  }

  if (boxSizing === 'border-box') {
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize
  }

  hiddenTextarea.value = ''
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize

  /* istanbul ignore else */
  if (minRows > 0) {
    let minHeight = singleRowHeight * minRows
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize
    }
    height = Math.max(minHeight, height)
    result.minHeight = `${minHeight}px`
  }
  if (maxRows > 0) {
    let maxHeight = singleRowHeight * maxRows
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize
    }
    height = Math.min(maxHeight, height)
  }
  result.height = `${height}px`
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea)
  hiddenTextarea = null
  return result
}
