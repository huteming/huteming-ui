// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue'

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
    // 3. 声明为 Vue 补充的东西
    interface VueConstructor {
        install (vue: typeof Vue): void
        item: VueConstructor
        styledDoms: any
    }
}
declare module 'vue/types/options' {
    // 3. 声明为 Vue 补充的东西
    interface DirectiveOptions {
        install?: (vue: typeof Vue) => void
        registName: string
    }
}
declare module 'vue/types/vue' {
    // 3. 声明为 Vue 补充的东西
    interface Vue {
        styledDoms: any
    }
}
