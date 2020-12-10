import Vue from "vue"

// styles
import "./styles"

import App from "./App.vue"
import router from "./router"
import store from "./store"

// plugins
import "./plugins"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
