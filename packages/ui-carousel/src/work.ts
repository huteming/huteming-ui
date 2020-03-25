import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const CARD_SCALE = 0.83 // 非中心项目相对中心项目显示比例，这是整体比例
export const CARD_WIDTH_PERCENT = 0.85 // 中心项目显示宽度比例，高度还是父元素100%
export const CARD_STAY_PX = 10 // 子项卡片显示的宽度

export const Root = styled('div', () => `
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`)

export const ItemRoot = styled('div', { animation: Boolean, type: String, inStage: Boolean }, (props: StyleProps) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props.type === 'card' ? `${CARD_WIDTH_PERCENT * 100}%` : '100%'};
  height: 100%;
  transition: ${props.animation && 'transform 300ms ease-in-out'};
  z-index: ${props.inStage ? '2' : '1'};
`)
