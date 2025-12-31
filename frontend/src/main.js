import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'   
import Header from './components/Header.vue'

// import './style.css'
// import './assets/main.css'

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.component('Header', Header);
app.mount('#app');
