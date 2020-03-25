import { styled, css } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'

export const Root = styled('div', (props: StyleProps) => `
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
`)

export const Container = styled('div', (props: StyleProps) => `
  width: 246px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px 0 24px;
  box-shadow: 0 -4px 10px -10px rgba(99, 150, 247, 0.6);
  background-color: #fff;
  box-sizing: border-box;
`)

export const Button = styled('div', { disabled: Boolean }, (props: StyleProps) => `
  flex: 1;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
  background: ${props.disabled ? 'rgba(201, 204, 212, 1)' : 'linear-gradient(153deg, rgba(78,173,243,1) 0%, rgba(157,230,255,1) 100%)'};
  border-radius: 11px 11px 0 0;
  box-sizing: border-box;
`)

export const Prefix = styled('div', (props: StyleProps) => `
  font-size: 20px;
  line-height: 28px;
  color: rgba(34, 34, 34, 1);
`)

export const Title = styled('div', { large: Boolean }, (props: StyleProps) => `
  display: flex;
  align-items: center;
  font-size: ${props.large ? '28px' : '18px'};
  line-height: 25px;
  color: rgba(34, 34, 34, 1);
  font-weight: bold;
  white-space: nowrap;
`)

export const Group = styled('div', () => `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`)

export const Tip = styled('div', { through: Boolean }, (props: StyleProps) => css`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 17px;
  color: ${props.through ? 'rgba(153, 153, 153, 1)' : 'rgba(34, 34, 34, 1)'};
  letter-spacing: .5px;
  white-space: nowrap;
  text-decoration: ${props.through && 'line-through'};
`)

export const Desc = styled('div', { through: Boolean }, (props: StyleProps) => css`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 17px;
  color: ${props.through ? 'rgba(153, 153, 153, 1)' : 'rgba(34, 34, 34, 1)'};
  letter-spacing: .5px;
  white-space: nowrap;
  text-decoration: ${props.through && 'line-through'};
`)
