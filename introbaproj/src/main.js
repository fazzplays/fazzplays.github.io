import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'

const app = createApp(App).use(vuetify).use(router)
app.mount('#app')
