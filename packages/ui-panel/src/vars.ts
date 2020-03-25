import { styled, css, ellipsis } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  position: relative;
  width: 335px;
  height: 114px;
  margin-left: auto;
  margin-right: auto;
  padding: 11px 20px 10px 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 6px 24px 0px rgba(69,125,193,0.14);
  border-radius: 8px;
  box-sizing: border-box;

  & + & {
    margin-top: 30px;
  }
`)

export const Poster = styled('div', () => `
  position: absolute;
  top: -10px;
  left: 10px;
  width: 85px;
  height: 114px;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
`)

export const PosterImg = styled('img', () => `
  display: block;
  width: 100%;
  object-fit: contain;
`)

export const Title = styled('div', () => `
  font-size: 14px;
  line-height: 20px;
  color: #2C3349;
  font-weight: bold;
  ${ellipsis(2)}
`)

export const Footer = styled('div', () => `
  display: flex;
  align-items: flex-end;
`)

export const Tip = styled('div', () => `
  font-size: 10px;
  line-height: 15px;
  color: #C9CCD4;
`)

export const Decoration = styled('div', () => `
  flex: 1;
  margin-left: 5px;
  font-size: 12px;
  line-height: 15px;
  color: #B2BAC4;
  text-align: right;
  text-decoration: line-through;
`)

export const Btn = styled('div', () => `
  margin-left: 5px;
  font-size: 14px;
  line-height: 16px;
  color: #3A95FA;
  font-weight: bold;
`)
