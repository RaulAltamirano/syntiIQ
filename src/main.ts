import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './assets/tailwind.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import App from './modules/core/pages/App.vue'
import router from './router';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion'


const pinia = createPinia()
library.add(fas)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(pinia)
    .use(router)
    .use(MotionPlugin)
    .mount('#app')
