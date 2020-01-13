import Vue from 'vue'

export interface LoadingScope {
  instance: LoadingComp | null
}

export interface LoadingOptions {
  loading: boolean
  openAnimation?: boolean
  text?: string
  theme?: object
}

export interface LoadingComp extends Vue {
  visible: boolean
  loading: boolean
  text: string
  openAnimation: boolean
  theme: object
  show (): void
  hide (): void
}
