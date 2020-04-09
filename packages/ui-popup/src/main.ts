import Component from './popup'
import { installComponent } from 'utils/tools'
import { ofType } from 'utils/component'
import { PopupProps, PopupEvents } from '../types'

Component.install = installComponent('Popup', Component)

export default ofType<PopupProps, PopupEvents>(Component)
