import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  position: relative;
  width: 100%;
`)

export const Container = styled('div', () => `
  display: flex;
`)

export const ItemRoot = styled('div', () => `
  position: relative;
  width: 100%;
  height: 220px;
  text-align: center;
  overflow: hidden;
  background: #fff;
  box-sizing: border-box;
`)

export const ItemContainer = styled('div', () => `
  position: absolute;
  top: 93px;
  width: 100%;
  height: 34px;
  transform-style: preserve-3d;
  z-index: 1;
`)

export const Piece = styled('div', { hidden: Boolean }, (props: StyleProps) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 16px;
  line-height: 34px;
  backface-visibility: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  visibility: ${props.hidden && 'hidden'};
`)

export const Line = styled('div', { position: String }, (props: StyleProps) => css`
  position: absolute;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, .5);
  box-sizing: border-box;
  z-index: 2;

  ${props.position === 'top' && `
    top: 0;
    height: 93px;
    border-bottom: 1px solid #2c97f1;
  `}

  ${props.position === 'bottom' && `
    top: 127px;
    bottom: 0;
    border-top: 1px solid #2c97f1;
  `}
`)
