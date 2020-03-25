import { styled, css, typography } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  position: relative;
  width: 160px;
  padding-bottom: 6px;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
`)

export const PosterBarRoot = styled('div', () => `
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  transform: translateY(-100%);
  background: rgba(0, 0, 0, .3);
  box-sizing: border-box;
`)

export const Container = styled('div', () => `
  position: relative;
  width: 100%;
  height: 120px;
`)

export const Poster = styled('img', () => `
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`)

export const Title = styled('div', { lines: [Boolean, Number] }, (props: StyleProps) => css`
  ${typography('subtitle2', props.lines)};
  padding: 12px 8px 2px;
  color: #202631;
`)

export const Footer = styled('div', () => `
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;
`)

export const Btn = styled('div', () => `
  font-size: 14px;
  line-height: 20px;
  color: #3A95FA;
  font-weight: bold;
`)
