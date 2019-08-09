import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import AppDivider from './components/Divider'
import AppDemoBlock from './components/DemoBlock'
import DemoPlaceholder from './components/Placeholder'
import './registerServiceWorker'
import 'sushi-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/github-gist.css'
import './assets/style/index.scss'
import 'web-ui/theme/index' // huteming-ui 样式文件入口
import ui from 'web/ui/index'
import * as util from 'web/util/index'

console.log(ui)
console.log(util)

Vue.component(AppDivider.name, AppDivider)
Vue.component(AppDemoBlock.name, AppDemoBlock)
Vue.component(DemoPlaceholder.name, DemoPlaceholder)
Vue.use(ui)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
