/**
 * fix: 事件监听
 * https://github.com/styled-components/vue-styled-components/blob/master/src/providers/ThemeProvider.js
 */
import { Component, Vue, Prop, ProvideReactive } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

interface ProviderProps {
    theme: object
}

@Component({
    name: 'ThemeProvider',
    provide () {
        return {
            $theme: () => (this as any).theme
        }
    },
})
export default class ThemeProvider extends tsx.Component<ProviderProps> {
    @Prop({ type: Object })
    theme!: Object

    // @ProvideReactive()
    // $theme = this.theme

    render () {
        return <div { ...this.$listeners }>{ this.$slots.default }</div>
    }
}
