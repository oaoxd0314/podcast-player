import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
// import store from './store'

import FontAwesomeIcon from "./assets/fontawesome-icons"
import './assets/tailwind.css'


createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    // .use(store)
    .mount('#app')
