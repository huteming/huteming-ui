import { styled } from 'packages/ui-styles/src/main'

export const Root = styled('div', { time: Number }, () => `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
`)

export const Content = styled('div', () => `
  position: relative;
`)

export const Footer = styled('div', () => `
  width: 100%;
  margin-top: 20px;
`)

export const CancelOutRight = styled('div', () => `
  width: 20px;
  order: -1;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: center;
`)

export const CancelOutLeft = styled('div', () => `
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-100%, -100%);
  width: 25px;
  height: 25px;
`)

export const CancelInRight = styled('div', () => `
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-50%, 50%);
  width: 25px;
  height: 25px;
`)

export const CancelInLeft = styled('div', () => `
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50%, 50%);
  width: 25px;
  height: 25px;
`)

export const CancelBottom = styled('div', () => `
  position: relative;
  margin-top: 20px;
  width: 37px;
  height: 37px;
`)

export const Line = styled('div', () => `
  width: 1px;
  height: 7px;
  background: #fff;
`)
