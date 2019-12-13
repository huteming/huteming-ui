import Vue from 'vue'

export default interface TmFlex extends Vue {
    gutter: string
}

export type FlexJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'

export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch'

export type FlexContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'stretch'

export type FlexAlignSelf = 'auto' | 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch'
