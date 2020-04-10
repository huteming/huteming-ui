import { VueClass } from 'vue-class-component/lib/declarations'
import Vue, { ComponentOptions } from 'vue'

export interface Theme {
  dpr: number
  modal: ThemeModal
  button: ThemeButton
  color: ThemeColor
  font: ThemeFont
  tag: ThemeTag
  loading: ThemeLoading
  field: ThemeField
  placeholder: ThemePlaceholder
}

export interface ThemePlaceholder {
  margin: string
  padding: string
  color: string
}

export interface ThemeField {
  fontSize: string
  lineHeight: string
  color: string
  textAlign: string
}

export interface ThemeLoading {
  colorIcon: string
  colorText: string
  background: string
}

export interface ThemeTag {
  colorDefault: string
  colorPrimary: string
  colorSuccess: string
  colorDanger: string
  colorWarning: string
}

export interface ThemeButton {
  height: string
  fontSize: string
  lineHeight: string
  borderRadius: string
  colorDefault: string
  colorPrimary: string
  colorInfo: string
  colorWarning: string
  colorDanger: string
  backgroundColorDefault: string
  backgroundColorPrimary: string
  backgroundColorInfo: string
  backgroundColorWarning: string
  backgroundColorDanger: string
  borderWidth: string
  borderColorDefault: string
  borderColorPrimary: string
  borderColorInfo: string
  borderColorWarning: string
  borderColorDanger: string
  heightLarge: string
  fontSizeNormal: string
  minWidthSmall: string
  heightSmall: string
  paddingSmall: string
  fontSizeSmall: string
  minWidthMini: string
  heightMini: string
  fontSizeMini: string
  backgroundColorPlain: string
}

export interface ThemeModal {
  background: string
}

export interface ThemeFont {
  sizeMini: string
  sizeSmall: string
  sizeNormal: string
  sizeLarge: string
}

export interface ThemeColor {
  text: string
  border: string
  black: string
  white: string
  red: string;
  blue: string
  orange: string
  orangeDark: string
  orangeLight: string
  green: string
  gray: string
  grayLight: string
  grayDarker: string
  grayDark: string
  'gray-1': string
  'gray-2': string
  'gray-3': string
  'gray-4': string
  'gray-5': string
  'gray-6': string
  'gray-7': string
  'gray-8': string
}

export interface State {
  zIndex: number
}

export interface PropsState {
  type: Object
  default: () => State
}

export interface StyleProps {
  theme: Theme
  state: State
  [key: string]: any
}

export interface StyleCreater {
  (styled: any, css: any, helper: StyleHelper): object
}

export interface WithStyles {
  <V extends Vue>(styleCreater?: StyleCreater): (CompConstructor: VueClass<V>, options: ComponentOptions<V>) => VueClass<V>
}

export interface StyleHelper {
  autofit (px: number): number
}

export interface StyledComponents {
  typography: {
    h1: any
    h2: any
    h3: any
    h4: any
    h5: any
    h6: any
    subtitle1: any
    subtitle2: any
    body1: any
    body2: any
    button: any
    caption: any
    overline: any
  }
}

export interface ComponentProps {
  state?: PropsState
  [key: string]: any
}

export interface CssRules {
  (props: StyleProps): any
}
