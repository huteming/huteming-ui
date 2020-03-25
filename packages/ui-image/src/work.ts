import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', () => `
  position: relative;
  overflow: hidden;
`)

export const Placeholder = styled('div', () => `
  position: relative;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  background-color: #fff;
  box-sizing: border-box;

  &:before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 25px;
    transform: translate(-50%,-50%);
    background-color: #ccc;
  }

  &:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25px;
    height: 1px;
    transform: translate(-50%,-50%);
    background-color: #ccc;
  }
`)

export const Loading = styled('div', () => `
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`)

export const ImageError = styled('div', () => `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #c0c4cc;
  vertical-align: middle;
`)

export const ImageInner = styled('img', () => `
  width: 100%;
  height: 100%;
  vertical-align: top;
`)
