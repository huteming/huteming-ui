import Vue from 'vue'

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

export interface ImagePickerOptions {
  multiple?: boolean
  max?: number
  disabled?: boolean
  onload?: Function
  onerror?: Function
  before?: Function
  after?: Function
}

export interface ImagePickerConfig {
  multiple: boolean
  max: number
  disabled: boolean
  onload?: Function
  onerror?: Function
  before?: Function
  after?: Function
}

export interface ImagePickerInput extends Vue {
  max: number
  disabled: boolean
}

export interface ImagePickerScope {
  options: ImagePickerConfig
  instance: ImagePickerInput
}
