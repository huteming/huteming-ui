import { PluginFunction, DirectiveOptions } from 'vue'

export interface SmartScroll extends DirectiveOptions {
    registName: string
    install: PluginFunction<object>
}
