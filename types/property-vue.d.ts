// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue'

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
    // 3. 声明为 Vue 补充的东西
    interface VueConstructor {
        registName: string
        install (vue: typeof Vue): void
        item: VueConstructor
        PosterBar: VueConstructor
    }
    interface Vue {
        styledDoms: any
        styledComponents: any
    }
}
declare module 'vue/types/options' {
    interface DirectiveOptions {
        // install?: (vue: typeof Vue) => void
        // registName: string
    }
}
