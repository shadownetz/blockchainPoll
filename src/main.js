import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./config/firebase";
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

let app;
onAuthStateChanged(auth, function(){
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
