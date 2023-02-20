import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/global.css"
import request from "@/api/request"
import filter from "@/common/filter"

Vue.config.productionTip = false
Vue.use(ElementUI, {size: "small"})
Vue.prototype.request = request
for (const key in filter){
    Vue.filter(key,filter[key])
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
