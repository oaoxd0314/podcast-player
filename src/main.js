import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import KProgress from 'k-progress-v3';
// import store from './store'

import FontAwesomeIcon from "./assets/fontawesome-icons"
import './assets/tailwind.css'


createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .component('k-progress', KProgress)
    .use(router)
    // .use(store)
    .mount('#app')
