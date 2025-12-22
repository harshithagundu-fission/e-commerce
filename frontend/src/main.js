import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'   
import Header from './components/Header.vue'
import './style.css'

//createApp(App).mount('#app')

const app = createApp(App);
app.use(router);
app.component('Header', Header);
app.mount('#app');
