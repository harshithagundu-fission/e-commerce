import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'   
import Header from './components/Header.vue'
import { createPinia } from 'pinia'
// import './style.css'
// import './assets/main.css'


//createApp(App).mount('#app')

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.component('Header', Header);
app.mount('#app');
