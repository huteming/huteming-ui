import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'sushi-ui'
import 'highlight.js/styles/github-gist.css'
import './assets/style/markdown.scss'
import './registerServiceWorker'
import './assets/iconfont/iconfont.css'
import './assets/style/main.scss'
import ui from 'web/ui/index.js'
// import * as util from 'web/util/index.js'

import 'normalize.css'

Vue.use(ElementUI)
Vue.use(ui)
Vue.config.productionTip = false

// console.log(util)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
