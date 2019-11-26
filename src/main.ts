import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import DemoDivider from './components/Divider.vue'
import AppDemoBlock from './components/DemoBlock.vue'
import DemoPlaceholder from './components/Placeholder.vue'
import AppCell from './components/Cell.vue'
import './registerServiceWorker'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/github-gist.css'
import './assets/style/index.scss'
import ui from 'ui/main'

Vue.component(DemoDivider.name, DemoDivider)
Vue.component(AppDemoBlock.name, AppDemoBlock)
Vue.component(DemoPlaceholder.name, DemoPlaceholder)
Vue.component(AppCell.name, AppCell)
Vue.use(ui)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
