export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

export interface TextareaCalcResult {
  minHeight?: string
  height: string
}

export interface PropAutosize {
  minRows?: number
  maxRows?: number
}
